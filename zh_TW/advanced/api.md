# API Reference Documentation

## Overview

RatPanel provides a secure RESTful interface for interacting with the panel system. All API requests require HMAC-SHA256 signature authentication to ensure the security and integrity of communications.

## Basic Information

- **Base URL**: `http(s)://your-panel-domain/{entry}/api/`
- **Content Type**: All requests and responses use `application/json`
- **Character Encoding**: UTF-8

## Authentication Mechanism

The API uses the HMAC-SHA256 signature algorithm for authentication. Each request must include the following HTTP headers:

| Header Name     | 描述                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `Content-Type`  | Set to `application/json`                                                                                |
| `X-Timestamp`   | Current UNIX timestamp (seconds)                                                      |
| `Authorization` | Authentication information, format: `HMAC-SHA256 Credential={id}, Signature={signature}` |

## Signature Algorithm

The signature process consists of four main steps:

### 1. Construct Canonical Request

The canonical request string consists of the following parts, separated by newline characters (\n):

```
HTTP Method
Canonical Path
Canonical Query String
SHA256 Hash of Request Body
```

**Note**: The canonical path should always use the path part starting with `/api/`, ignoring the entry prefix.

### 2. Construct String to Sign

The string to sign consists of the following parts, separated by newline characters (\n):

```
"HMAC-SHA256"
Timestamp
SHA256 Hash of Canonical Request
```

### 3. Calculate Signature

Calculate HMAC-SHA256 on the string to sign using your token, then convert the result to a hexadecimal string.

### 4. Construct Authorization Header

Add the calculated signature to the `Authorization` header:

```
Authorization: HMAC-SHA256 Credential={id}, Signature={signature}
```

## Go Example

```go
package main

import (
    "bytes"
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "io"
    "net/http"
    "strings"
    "time"
)

func main() {
    // Create a request to get user information
    req, err := http.NewRequest("GET", "http://example.com/entrance/api/user/info", nil)
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    // Set content type
    req.Header.Set("Content-Type", "application/json")
    
    // Sign request - pass your user ID and API token
    if err = SignReq(req, uint(16), "YourSecretToken"); err != nil {
        fmt.Println("Error signing request:", err)
        return
    }

    // Send request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    // Handle response
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response:", err)
        return
    }

    fmt.Println("Response Status:", resp.Status)
    fmt.Println("Response Body:", string(body))
}

// SignReq signs an HTTP request
func SignReq(req *http.Request, id uint, token string) error {
    // Step 1: Construct canonical request
    var body []byte
    var err error

    if req.Body != nil {
        // Read and save request body
        body, err = io.ReadAll(req.Body)
        if err != nil {
            return err
        }
        // Restore request body for subsequent use
        req.Body = io.NopCloser(bytes.NewReader(body))
    }

    // Canonical path
    canonicalPath := req.URL.Path
    if !strings.HasPrefix(canonicalPath, "/api") {
        index := strings.Index(canonicalPath, "/api")
        if index != -1 {
            canonicalPath = canonicalPath[index:]
        }
    }

    canonicalRequest := fmt.Sprintf("%s\n%s\n%s\n%s",
        req.Method,
        canonicalPath,
        req.URL.Query().Encode(),
        SHA256(string(body)))

    // Step 2: Set timestamp and construct string to sign
    timestamp := time.Now().Unix()
    req.Header.Set("X-Timestamp", fmt.Sprintf("%d", timestamp))

    stringToSign := fmt.Sprintf("%s\n%d\n%s",
        "HMAC-SHA256",
        timestamp,
        SHA256(canonicalRequest))

    // Step 3: Calculate signature
    signature := HMACSHA256(stringToSign, token)

    // Step 4: Set Authorization header
    authHeader := fmt.Sprintf("HMAC-SHA256 Credential=%d, Signature=%s", id, signature)
    req.Header.Set("Authorization", authHeader)

    return nil
}

func SHA256(str string) string {
    sum := sha256.Sum256([]byte(str))
    dst := make([]byte, hex.EncodedLen(len(sum)))
    hex.Encode(dst, sum[:])
    return string(dst)
}

func HMACSHA256(data string, secret string) string {
    h := hmac.New(sha256.New, []byte(secret))
    h.Write([]byte(data))
    return hex.EncodeToString(h.Sum(nil))
}
```

## PHP Example

```php
<?php
/**
 * RatPanel API Request Example (PHP)
 */

function signRequest($method, $url, $body, $id, $token) {
    // Parse URL and get path
    $parsedUrl = parse_url($url);
    $path = $parsedUrl['path'];
    $query = isset($parsedUrl['query']) ? $parsedUrl['query'] : '';
    
    // Canonical path
    $canonicalPath = $path;
    if (strpos($path, '/api') !== 0) {
        $apiPos = strpos($path, '/api');
        if ($apiPos !== false) {
            $canonicalPath = substr($path, $apiPos);
        }
    }
    
    // Calculate SHA256 hash of request body
    $bodySha256 = hash('sha256', $body ?: '');
    
    // Construct canonical request
    $canonicalRequest = implode("\n", [
        $method,
        $canonicalPath,
        $query,
        $bodySha256
    ]);
    
    // Get current timestamp
    $timestamp = time();
    
    // Construct string to sign
    $stringToSign = implode("\n", [
        'HMAC-SHA256',
        $timestamp,
        hash('sha256', $canonicalRequest)
    ]);
    
    // Calculate signature
    $signature = hash_hmac('sha256', $stringToSign, $token);
    
    // Return signature and timestamp
    return [
        'timestamp' => $timestamp,
        'signature' => $signature,
        'id' => $id
    ];
}

// Example request
$apiUrl = 'http://example.com/entrance/api/user/info';
$method = 'GET';
$body = ''; // For GET requests, usually no request body
$id = 16;
$token = 'YourSecretToken';

// Generate signature information
$signingData = signRequest($method, $apiUrl, $body, $id, $token);

// Prepare HTTP headers
$headers = [
    'Content-Type: application/json',
    'X-Timestamp: ' . $signingData['timestamp'],
    'Authorization: HMAC-SHA256 Credential=' . $signingData['id'] . ', Signature=' . $signingData['signature']
];

// Use cURL to send request
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

if (!empty($body)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Execute request and get response
$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Output results
echo "Response Status Code: " . $statusCode . PHP_EOL;
echo "Response Content: " . $response . PHP_EOL;
```

## Python Example

```python
import hashlib
import hmac
import json
import requests
import time
from urllib.parse import urlparse, parse_qs

def sha256_hash(text):
    """Calculate SHA256 hash of a string"""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def hmac_sha256(key, message):
    """Calculate signature using HMAC-SHA256 algorithm"""
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

def sign_request(method, url, body, user_id, token):
    """Generate signature for API request"""
    # Parse URL
    parsed_url = urlparse(url)
    path = parsed_url.path
    query = parsed_url.query
    
    # Canonical path
    canonical_path = path
    if not path.startswith('/api'):
        api_pos = path.find('/api')
        if api_pos != -1:
            canonical_path = path[api_pos:]
    
    # Construct canonical request
    body_str = body if body else ""
    canonical_request = "\n".join([
        method,
        canonical_path,
        query,
        sha256_hash(body_str)
    ])
    
    # Get current timestamp
    timestamp = int(time.time())
    
    # Construct string to sign
    string_to_sign = "\n".join([
        "HMAC-SHA256",
        str(timestamp),
        sha256_hash(canonical_request)
    ])
    
    # Calculate signature
    signature = hmac_sha256(token, string_to_sign)
    
    return {
        "timestamp": timestamp,
        "signature": signature,
        "id": user_id
    }

# Example request
api_url = "http://example.com/entrance/api/user/info"
method = "GET"
body = ""  # GET requests typically have no body
user_id = 16
token = "YourSecretToken"

# Generate signature information
signing_data = sign_request(method, api_url, body, user_id, token)

# Prepare HTTP headers
headers = {
    "Content-Type": "application/json",
    "X-Timestamp": str(signing_data["timestamp"]),
    "Authorization": f"HMAC-SHA256 Credential={signing_data['id']}, Signature={signing_data['signature']}"
}

# Send request
response = requests.request(
    method=method,
    url=api_url,
    headers=headers,
    data=body
)

# Output results
print(f"Response Status Code: {response.status_code}")
print(f"Response Content: {response.text}")
```

## Java Example

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 * RatPanel API Request Example (Java)
 */
public class RatPanelApiExample {

    public static void main(String[] args) {
        try {
            // Example request
            String apiUrl = "http://example.com/entrance/api/user/info";
            String method = "GET";
            String body = ""; // For GET requests, usually no request body
            int id = 16;
            String token = "YourSecretToken";

            // Generate signature information
            SigningData signingData = signRequest(method, apiUrl, body, id, token);

            // Prepare HTTP request
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .header("X-Timestamp", String.valueOf(signingData.timestamp))
                    .header("Authorization", "HMAC-SHA256 Credential=" + signingData.id + 
                            ", Signature=" + signingData.signature);

            // Set request method and body
            if (method.equals("GET")) {
                requestBuilder.GET();
            } else {
                requestBuilder.method(method, HttpRequest.BodyPublishers.ofString(body));
            }

            HttpRequest request = requestBuilder.build();

            // Send request
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Output results
            System.out.println("Response Status Code: " + response.statusCode());
            System.out.println("Response Content: " + response.body());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static class SigningData {
        long timestamp;
        String signature;
        int id;

        SigningData(long timestamp, String signature, int id) {
            this.timestamp = timestamp;
            this.signature = signature;
            this.id = id;
        }
    }

    public static SigningData signRequest(String method, String url, String body, int id, String token) throws Exception {
        // Parse URL
        URI uri = new URI(url);
        String path = uri.getPath();
        String query = uri.getQuery() != null ? uri.getQuery() : "";
        
        // Canonical path
        String canonicalPath = path;
        if (!path.startsWith("/api")) {
            int apiPos = path.indexOf("/api");
            if (apiPos != -1) {
                canonicalPath = path.substring(apiPos);
            }
        }
        
        // Calculate SHA256 hash of request body
        String bodySha256 = sha256Hash(body != null ? body : "");
        
        // Construct canonical request
        String canonicalRequest = String.join("\n", 
                method,
                canonicalPath,
                query,
                bodySha256);
        
        // Get current timestamp
        long timestamp = Instant.now().getEpochSecond();
        
        // Construct string to sign
        String stringToSign = String.join("\n",
                "HMAC-SHA256",
                String.valueOf(timestamp),
                sha256Hash(canonicalRequest));
        
        // Calculate signature
        String signature = hmacSha256(token, stringToSign);
        
        // Return signature and timestamp
        return new SigningData(timestamp, signature, id);
    }
    
    private static String sha256Hash(String text) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
        return bytesToHex(hash);
    }
    
    private static String hmacSha256(String key, String message) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        return bytesToHex(hash);
    }
    
    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
```

## Node.js Example

```javascript
const crypto = require('crypto');
const axios = require('axios');
const url = require('url');

/**
 * Calculate SHA256 hash of a string
 * @param {string} text The string to hash
 * @returns {string} Hash result (hexadecimal)
 */
function sha256Hash(text) {
    return crypto.createHash('sha256').update(text || '').digest('hex');
}

/**
 * Calculate signature using HMAC-SHA256 algorithm
 * @param {string} key The key
 * @param {string} message The message to sign
 * @returns {string} Signature result (hexadecimal)
 */
function hmacSha256(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

/**
 * Generate signature for API request
 * @param {string} method HTTP method
 * @param {string} apiUrl API URL
 * @param {string} body Request body
 * @param {number} id User ID
 * @param {string} token Secret key
 * @returns {object} Object containing signature, timestamp and ID
 */
function signRequest(method, apiUrl, body, id, token) {
    // Parse URL
    const parsedUrl = new url.URL(apiUrl);
    const path = parsedUrl.pathname;
    const query = parsedUrl.search.slice(1); // Remove leading '?'

    // Canonical path
    let canonicalPath = path;
    if (!path.startsWith('/api')) {
        const apiPos = path.indexOf('/api');
        if (apiPos !== -1) {
            canonicalPath = path.slice(apiPos);
        }
    }

    // Construct canonical request
    const canonicalRequest = [
        method,
        canonicalPath,
        query,
        sha256Hash(body || '')
    ].join('\n');

    // Get current timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Construct string to sign
    const stringToSign = [
        'HMAC-SHA256',
        timestamp,
        sha256Hash(canonicalRequest)
    ].join('\n');

    // Calculate signature
    const signature = hmacSha256(token, stringToSign);

    return {
        timestamp,
        signature,
        id
    };
}

/**
 * Send API request
 */
async function sendApiRequest() {
    // Example request parameters
    const apiUrl = 'http://example.com/entrance/api/user/info';
    const method = 'GET';
    const body = ''; // GET requests typically have no body
    const id = 16;
    const token = 'YourSecretToken';

    try {
        // Generate signature information
        const signingData = signRequest(method, apiUrl, body, id, token);

        // Prepare HTTP headers
        const headers = {
            'Content-Type': 'application/json',
            'X-Timestamp': signingData.timestamp,
            'Authorization': `HMAC-SHA256 Credential=${signingData.id}, Signature=${signingData.signature}`
        };

        // Send request
        const response = await axios({
            method,
            url: apiUrl,
            headers,
            data: body || undefined
        });

        // Output results
        console.log(`Response Status Code: ${response.status}`);
        console.log(`Response Content: ${JSON.stringify(response.data)}`);

    } catch (error) {
        console.error('Request Error:', error.message);
        if (error.response) {
            console.error(`Response Status Code: ${error.response.status}`);
            console.error(`Response Content: ${JSON.stringify(error.response.data)}`);
        }
    }
}

// Execute request
sendApiRequest();
```

## Common Response Codes

| HTTP Status Code | 描述                      |
| ---------------- | ----------------------- |
| 200              | Request successful      |
| 401              | Authentication failed   |
| 403              | Permission denied       |
| 404              | Resource not found      |
| 422              | Request parameter error |
| 500              | Internal server error   |

## Security Recommendations

1. **Protect Your API Token**: Do not hardcode or expose your API token in client-side code
2. **Rotate Tokens Regularly**: Change your API token regularly to enhance security
3. **Configure IP Whitelisting**: Use IP whitelisting to restrict access in production environments

## Frequently Asked Questions

### Signature Verification Failed

If you encounter signature verification failures, check:

- Ensure you are using the correct API token and ID
- Check that the client and server times are accurate; timestamp differences greater than 300 seconds will cause verification to fail
- Ensure the request body hasn't been modified before or after signature calculation
- Ensure the URL path is handled correctly; remember to remove the entry prefix when normalizing the path

### Request Timeout

- Check network connection
- Confirm server status
- Consider increasing the client timeout settings
