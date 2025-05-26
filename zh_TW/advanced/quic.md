# Configure QUIC (HTTP3)

RatPanel currently supports automatic QUIC configuration, but for compatibility reasons, the `Alt-Svc` header is not added by default. Browsers will not attempt to use QUIC connections without detecting the `Alt-Svc` header.

If you are not using a CDN, you can add the configuration below to your website's rewrite rules to let browsers know that the website supports and uses QUIC connections.

```
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

If you are using a CDN or there are proxy servers in front, then QUIC needs to be enabled on the CDN / frontend.

If the configuration still doesn't work, please check your browser version and the availability of UDP port 443.

- According to Nginx's git commit history, all QUIC draft versions have been removed in version 1.25, so there's no need to add draft version numbers to `Alt-Svc`.
