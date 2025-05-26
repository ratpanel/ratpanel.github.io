# Frequently Asked Questions

Here are some common questions and answers about RatPanel. If you have any other questions, please feel free to ask in the [RatPanel Community](https://tom.moe/c/technical/ratpanel). If you find any bugs, please submit a [GitHub Issue](https://github.com/tnb-labs/panel/issues).

## Configure QUIC (HTTP3)

RatPanel currently supports automatic QUIC configuration, but for compatibility reasons, the `Alt-Svc` header is not added by default. Browsers will not attempt to use QUIC connections without detecting the `Alt-Svc` header.

If you are not using a CDN, you can add the configuration below to your website's rewrite rules to let browsers know that the website supports and uses QUIC connections.

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

If you are using a CDN or there are proxy servers in front, then QUIC needs to be enabled on the CDN / frontend.

If the configuration still doesn't work, please check your browser version and the availability of UDP port 443.

* According to Nginx's git commit history, all QUIC draft versions have been removed in version 1.25, so there's no need to add draft version numbers to `Alt-Svc`.

## Configure TLSv1.1 TLSv1

The current Panel OpenResty is compiled with OpenSSL 3.5, which by default disables the deprecated TLSv1.1 and TLSv1 protocols.

Of course, if your business must use these two protocols, you can enable them using the SSL configuration below.

```nginx
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
ssl_prefer_server_ciphers on;
```

## Configure Reverse Proxy

RatPanel v2.4.10+ comes with a built-in reverse proxy configuration generator, which you can access through the top right corner of the site rewrite configuration page.

Note: If you encounter issues with static resources like CSS/JS not loading properly after setting up a reverse proxy, please remove the **Do not log static files** section from the site's main configuration file.

## Configure Process Monitoring

1. Install Supervisor manager and open it.
2. Create processes that need to be monitored in the Supervisor manager (it's not recommended to use root as the running user).
3. Common issues: [https://tom.moe/t/supervisor/3112](https://tom.moe/t/supervisor/3112)

## Configure IPv6

If you want to enable IPv6 support, you need to add `[::]:80` and `[::]:443` to the website's listening address configuration.

## Configure Container Image Acceleration

Due to certain reasons, domestic users in China may be unable to connect to Docker Hub to pull container images, thus requiring image acceleration configuration.

### For Podman

Open the Podman settings page in the Panel, and navigate to the Registry Configuration tab.

Scroll to the bottom of the configuration file, add the following configuration and save:

```
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

Where docker.1ms.run is the configured image acceleration address. You can refer to other tutorials to set up and use it.

### For Docker

Open the Docker settings page in the Panel, and navigate to the Configuration tab.

Add the following configuration and save:

```json
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

Where https://docker.1ms.run is the configured image acceleration address. You can refer to other tutorials to set up and use it.
