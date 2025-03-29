# 配置反向代理

面板当前并未自带反向代理功能，你可以通过下述伪静态规则配置一个全站反向代理：

```nginx
location ^~ /
{
    set $empty ""; # 通过变量解决Nginx不会自动更新域名解析的问题
    proxy_pass http://xxx.xxx$empty;
    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $http_connection;
    proxy_set_header Early-Data $ssl_early_data;
    proxy_set_header Accept-Encoding "";
    proxy_ssl_session_reuse off;
    proxy_ssl_server_name on;
    proxy_ssl_protocols TLSv1.2 TLSv1.3;
    proxy_http_version 1.1;
    # 可选，自定义 DNS 服务器
    resolver 8.8.8.8 ipv6=off;
    resolver_timeout 10s;

    # 下方两个可选配置项只能保留其中一个

    # 可选，无缓冲区（AI等SSE应用需要）
    proxy_buffering off;
    proxy_max_temp_file_size 0;

    # 可选，缓存响应（类似CDN）
    # proxy_ignore_headers Set-Cookie Cache-Control Expires; # 如果需要缓存动态请求，请取消注释此行
    proxy_cache cache_one;
    proxy_cache_key $host$uri$is_args$args;
    proxy_cache_valid 200 304 301 302 1d; # 设置缓存时间 1d 表示一天，单位可选 m-分钟 h-小时 d-天
    add_header X-Cache $upstream_cache_status;
}
```

以上规则亦可通过选择 proxy 伪静态预设直接使用，无需来回复制。

注意：如果设置反向代理后出现 CSS/JS 无法正常加载的问题，请移除站点主配置文件中的**静态资源**缓存部分。
