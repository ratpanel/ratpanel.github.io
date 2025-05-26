## 配置 QUIC（HTTP3）

面板目前已支持自动 QUIC 配置，但是出于兼容性考虑，默认未添加 `Alt-Svc` 标头。 浏览器在未检测到 `Alt-Svc` 标头时不会尝试使用 QUIC 连接。

如果你不使用 CDN，可添加下述配置到网站伪静态中即可让浏览器知晓网站支持并使用 QUIC 连接。

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

如果你使用 CDN 或者前端还存在代理服务器，则 QUIC 需要在 CDN / 前端开启。

如果配置后仍不生效，请检查浏览器版本和 UDP 443 端口的可用性。

- 根据 Nginx 的 git 提交记录，1.25 版本下所有 QUIC 草案版本已经移除，因此 `Alt-Svc` 无需添加草案版本号。

## 配置 TLSv1.1 TLSv1

当前面板 OpenResty 使用 OpenSSL 3.5 版本编译，默认禁用已弃用的 TLSv1.1 TLSv1 协议。

当然，如果你的业务必须要使用这两个协议的话，可以使用下述 SSL 配置启用。

```nginx
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
ssl_prefer_server_ciphers on;
```

## 配置反向代理

面板 v2.4.10+ 自带反向代理配置生成器，你可以通过站点伪静态配置页面的右上角打开使用。

注意：如果设置反向代理后出现 CSS/JS 等静态资源无法正常加载的问题，请移除站点主配置文件中的**不记录静态文件日志**部分。

## 配置进程守护

1. 安装 Supervisor 管理器并打开。
2. Supervisor 管理器中创建需要守护的进程（运行用户不建议使用 root）。
3. 常见问题：[https://tom.moe/t/supervisor/3112](https://tom.moe/t/supervisor/3112)

## 配置 IPv6

如果您想要启用 IPv6 支持，您需要将 `[::]:80` 和 `[:]:443` 添加到网站的监听地址配置。

## 配置容器镜像加速

由于一些原因国内可能无法连接到 Docker Hub 拉取容器镜像，因此需要配置镜像加速。

### 对于 Podman

在面板打开 Podman 设置页面，导航到注册表配置选项卡。

滚动到配置文件底部，添加如下配置并保存：

```
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

其中 docker.1ms.run 为配置的镜像加速地址。 可自行参考其他教程搭建使用。

### 对于 Docker

在面板打开 Docker 设置页面，导航到配置选项卡。

添加如下配置并保存：

```json
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

其中 docker.1ms.run 为配置的镜像加速地址。 可自行参考其他教程搭建使用。
