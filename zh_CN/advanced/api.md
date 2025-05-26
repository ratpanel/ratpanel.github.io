# API 参考文档

## 概述

RatPanel provides a secure RESTful interface for interacting with the panel system. All API requests require HMAC-SHA256 signature authentication to ensure the security and integrity of communications.

## Basic Information

- **基础 URL**: `http(s)://your-panel-domain/{entry}/api/`
- **内容类型**: 所有请求和响应均使用 `application/json`
- **字符编码**: UTF-8

## 认证机制

API 使用 HMAC-SHA256 签名算法进行认证。每个请求必须包含以下 HTTP 头： Each request must include the following HTTP headers:

| 头部名称            | 描述                                                              |
| --------------- | --------------------------------------------------------------- |
| `Content-Type`  | 设置为 `application/json`                                          |
| `X-Timestamp`   | 当前 UNIX 时间戳（秒）                                                  |
| `Authorization` | 身份验证信息，格式为 `HMAC-SHA256 Credential={id}, Signature={signature}` |

## 签名算法

签名过程包含四个主要步骤：

### 1. 构造规范化请求

规范化请求字符串由以下部分组成，各部分之间使用换行符（\n）分隔：

```
HTTP方法
规范化路径
规范化查询字符串
请求体的SHA256哈希值
```

**注意**：规范化路径应始终使用 `/api/` 开头的路径部分，忽略入口前缀。

### 2. 构造待签名字符串

待签名字符串包含以下部分，各部分使用换行符（\n）分隔：

```
"HMAC-SHA256"
时间戳
规范化请求的SHA256哈希值
```

### 3. 计算签名

使用您的令牌（token）对待签名字符串进行 HMAC-SHA256 计算，然后将结果转换为十六进制字符串。

### 4. 构造授权头

将计算得到的签名添加到 `Authorization` 头：

```
Authorization: HMAC-SHA256 Credential={id}, Signature={signature}
```

## Go 示例

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
    // 创建一个获取用户信息的请求
    req, err := http.NewRequest("GET", "http://example.com/entrance/api/user/info", nil)
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    // 设置内容类型
    req.Header.Set("Content-Type", "application/json")
    
    // 签名请求 - 传入您的用户ID和API令牌
    if err = SignReq(req, uint(16), "YourSecretToken"); err != nil {
        fmt.Println("Error signing request:", err)
        return
    }

    // 发送请求
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    // 处理响应
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response:", err)
        return
    }

    fmt.Println("Response Status:", resp.Status)
    fmt.Println("Response Body:", string(body))
}

// SignReq 对HTTP请求进行签名
func SignReq(req *http.Request, id uint, token string) error {
    // 步骤一：构造规范化请求
    var body []byte
    var err error

    if req.Body != nil {
        // 读取并保存请求体
        body, err = io.ReadAll(req.Body)
        if err != nil {
            return err
        }
        // 恢复请求体以便后续使用
        req.Body = io.NopCloser(bytes.NewReader(body))
    }

    // 规范化路径
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

    // 步骤二：设置时间戳和构造待签名字符串
    timestamp := time.Now().Unix()
    req.Header.Set("X-Timestamp", fmt.Sprintf("%d", timestamp))

    stringToSign := fmt.Sprintf("%s\n%d\n%s",
        "HMAC-SHA256",
        timestamp,
        SHA256(canonicalRequest))

    // 步骤三：计算签名
    signature := HMACSHA256(stringToSign, token)

    // 步骤四：设置Authorization头
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

## PHP 示例

```php
<?php
/**
 * 耗子面板 API 请求示例 (PHP)
 */

function signRequest($method, $url, $body, $id, $token) {
    // 解析URL并获取路径
    $parsedUrl = parse_url($url);
    $path = $parsedUrl['path'];
    $query = isset($parsedUrl['query']) ? $parsedUrl['query'] : '';
    
    // 规范化路径
    $canonicalPath = $path;
    if (strpos($path, '/api') !== 0) {
        $apiPos = strpos($path, '/api');
        if ($apiPos !== false) {
            $canonicalPath = substr($path, $apiPos);
        }
    }
    
    // 计算请求体的SHA256哈希值
    $bodySha256 = hash('sha256', $body ?: '');
    
    // 构造规范化请求
    $canonicalRequest = implode("\n", [
        $method,
        $canonicalPath,
        $query,
        $bodySha256
    ]);
    
    // 获取当前时间戳
    $timestamp = time();
    
    // 构造待签名字符串
    $stringToSign = implode("\n", [
        'HMAC-SHA256',
        $timestamp,
        hash('sha256', $canonicalRequest)
    ]);
    
    // 计算签名
    $signature = hash_hmac('sha256', $stringToSign, $token);
    
    // 返回签名和时间戳
    return [
        'timestamp' => $timestamp,
        'signature' => $signature,
        'id' => $id
    ];
}

// 示例请求
$apiUrl = 'http://example.com/entrance/api/user/info';
$method = 'GET';
$body = ''; // 对于GET请求，通常没有请求体
$id = 16;
$token = 'YourSecretToken';

// 生成签名信息
$signingData = signRequest($method, $apiUrl, $body, $id, $token);

// 准备HTTP请求头
$headers = [
    'Content-Type: application/json',
    'X-Timestamp: ' . $signingData['timestamp'],
    'Authorization: HMAC-SHA256 Credential=' . $signingData['id'] . ', Signature=' . $signingData['signature']
];

// 使用cURL发送请求
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

if (!empty($body)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// 执行请求并获取响应
$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 输出结果
echo "响应状态码: " . $statusCode . PHP_EOL;
echo "响应内容: " . $response . PHP_EOL;
```

## Python 示例

```python
import hashlib
import hmac
import json
import requests
import time
from urllib.parse import urlparse, parse_qs

def sha256_hash(text):
    """计算字符串的SHA256哈希值"""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def hmac_sha256(key, message):
    """使用HMAC-SHA256算法计算签名"""
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

def sign_request(method, url, body, user_id, token):
    """为API请求生成签名"""
    # 解析URL
    parsed_url = urlparse(url)
    path = parsed_url.path
    query = parsed_url.query
    
    # 规范化路径
    canonical_path = path
    if not path.startswith('/api'):
        api_pos = path.find('/api')
        if api_pos != -1:
            canonical_path = path[api_pos:]
    
    # 构造规范化请求
    body_str = body if body else ""
    canonical_request = "\n".join([
        method,
        canonical_path,
        query,
        sha256_hash(body_str)
    ])
    
    # 获取当前时间戳
    timestamp = int(time.time())
    
    # 构造待签名字符串
    string_to_sign = "\n".join([
        "HMAC-SHA256",
        str(timestamp),
        sha256_hash(canonical_request)
    ])
    
    # 计算签名
    signature = hmac_sha256(token, string_to_sign)
    
    return {
        "timestamp": timestamp,
        "signature": signature,
        "id": user_id
    }

# 示例请求
api_url = "http://example.com/entrance/api/user/info"
method = "GET"
body = ""  # GET请求通常没有请求体
user_id = 16
token = "YourSecretToken"

# 生成签名信息
signing_data = sign_request(method, api_url, body, user_id, token)

# 准备HTTP请求头
headers = {
    "Content-Type": "application/json",
    "X-Timestamp": str(signing_data["timestamp"]),
    "Authorization": f"HMAC-SHA256 Credential={signing_data['id']}, Signature={signing_data['signature']}"
}

# 发送请求
response = requests.request(
    method=method,
    url=api_url,
    headers=headers,
    data=body
)

# 输出结果
print(f"响应状态码: {response.status_code}")
print(f"响应内容: {response.text}")
```

## Java 示例

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
 * 耗子面板 API 请求示例 (Java)
 */
public class RatPanelApiExample {

    public static void main(String[] args) {
        try {
            // 示例请求
            String apiUrl = "http://example.com/entrance/api/user/info";
            String method = "GET";
            String body = ""; // 对于GET请求，通常没有请求体
            int id = 16;
            String token = "YourSecretToken";

            // 生成签名信息
            SigningData signingData = signRequest(method, apiUrl, body, id, token);

            // 准备HTTP请求
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .header("X-Timestamp", String.valueOf(signingData.timestamp))
                    .header("Authorization", "HMAC-SHA256 Credential=" + signingData.id + 
                            ", Signature=" + signingData.signature);

            // 设置请求方法和请求体
            if (method.equals("GET")) {
                requestBuilder.GET();
            } else {
                requestBuilder.method(method, HttpRequest.BodyPublishers.ofString(body));
            }

            HttpRequest request = requestBuilder.build();

            // 发送请求
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // 输出结果
            System.out.println("响应状态码: " + response.statusCode());
            System.out.println("响应内容: " + response.body());

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
        // 解析URL
        URI uri = new URI(url);
        String path = uri.getPath();
        String query = uri.getQuery() != null ? uri.getQuery() : "";
        
        // 规范化路径
        String canonicalPath = path;
        if (!path.startsWith("/api")) {
            int apiPos = path.indexOf("/api");
            if (apiPos != -1) {
                canonicalPath = path.substring(apiPos);
            }
        }
        
        // 计算请求体的SHA256哈希值
        String bodySha256 = sha256Hash(body != null ? body : "");
        
        // 构造规范化请求
        String canonicalRequest = String.join("\n", 
                method,
                canonicalPath,
                query,
                bodySha256);
        
        // 获取当前时间戳
        long timestamp = Instant.now().getEpochSecond();
        
        // 构造待签名字符串
        String stringToSign = String.join("\n",
                "HMAC-SHA256",
                String.valueOf(timestamp),
                sha256Hash(canonicalRequest));
        
        // 计算签名
        String signature = hmacSha256(token, stringToSign);
        
        // 返回签名和时间戳
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

## Node.js 示例

```javascript
const crypto = require('crypto');
const axios = require('axios');
const url = require('url');

/**
 * 计算字符串的SHA256哈希值
 * @param {string} text 待哈希的字符串
 * @returns {string} 哈希结果（十六进制）
 */
function sha256Hash(text) {
    return crypto.createHash('sha256').update(text || '').digest('hex');
}

/**
 * 使用HMAC-SHA256算法计算签名
 * @param {string} key 密钥
 * @param {string} message 待签名的消息
 * @returns {string} 签名结果（十六进制）
 */
function hmacSha256(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

/**
 * 为API请求生成签名
 * @param {string} method HTTP方法
 * @param {string} apiUrl API地址
 * @param {string} body 请求体
 * @param {number} id 用户ID
 * @param {string} token 密钥
 * @returns {object} 包含签名、时间戳和ID的对象
 */
function signRequest(method, apiUrl, body, id, token) {
    // 解析URL
    const parsedUrl = new url.URL(apiUrl);
    const path = parsedUrl.pathname;
    const query = parsedUrl.search.slice(1); // 移除开头的'?'

    // 规范化路径
    let canonicalPath = path;
    if (!path.startsWith('/api')) {
        const apiPos = path.indexOf('/api');
        if (apiPos !== -1) {
            canonicalPath = path.slice(apiPos);
        }
    }

    // 构造规范化请求
    const canonicalRequest = [
        method,
        canonicalPath,
        query,
        sha256Hash(body || '')
    ].join('\n');

    // 获取当前时间戳
    const timestamp = Math.floor(Date.now() / 1000);

    // 构造待签名字符串
    const stringToSign = [
        'HMAC-SHA256',
        timestamp,
        sha256Hash(canonicalRequest)
    ].join('\n');

    // 计算签名
    const signature = hmacSha256(token, stringToSign);

    return {
        timestamp,
        signature,
        id
    };
}

/**
 * 发送API请求
 */
async function sendApiRequest() {
    // 示例请求参数
    const apiUrl = 'http://example.com/entrance/api/user/info';
    const method = 'GET';
    const body = ''; // GET请求通常没有请求体
    const id = 16;
    const token = 'YourSecretToken';

    try {
        // 生成签名信息
        const signingData = signRequest(method, apiUrl, body, id, token);

        // 准备HTTP请求头
        const headers = {
            'Content-Type': 'application/json',
            'X-Timestamp': signingData.timestamp,
            'Authorization': `HMAC-SHA256 Credential=${signingData.id}, Signature=${signingData.signature}`
        };

        // 发送请求
        const response = await axios({
            method,
            url: apiUrl,
            headers,
            data: body || undefined
        });

        // 输出结果
        console.log(`响应状态码: ${response.status}`);
        console.log(`响应内容: ${JSON.stringify(response.data)}`);

    } catch (error) {
        console.error('请求出错:', error.message);
        if (error.response) {
            console.error(`响应状态码: ${error.response.status}`);
            console.error(`响应内容: ${JSON.stringify(error.response.data)}`);
        }
    }
}

// 执行请求
sendApiRequest();
```

## 常见响应码

| HTTP 状态码 | 描述      |
| -------- | ------- |
| 200      | 请求成功    |
| 401      | 身份验证失败  |
| 403      | 权限不足    |
| 404      | 资源不存在   |
| 422      | 请求参数错误  |
| 500      | 服务器内部错误 |

## 安全建议

1. **保护您的 API 令牌**：不要在客户端代码中硬编码或公开您的 API 令牌
2. **定期轮换令牌**：定期更改您的 API 令牌以提高安全性
3. **配置 IP 白名单**：在生产环境中使用 IP 白名单限制访问

## 常见问题解答

### 签名验证失败

如果遇到签名验证失败，请检查：

- 确保使用了正确的 API 令牌和 ID
- 检查客户端与服务器的时间是否准确，时间戳偏差大于 300 秒会导致验证失败
- 确保请求体在计算签名前后没有被修改
- 确保 URL 路径处理正确，注意规范化路径时需要移除入口前缀

### 请求超时

- 检查网络连接
- 确认服务器状态
- 考虑增加客户端的超时设置
