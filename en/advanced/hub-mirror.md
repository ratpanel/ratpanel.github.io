# 配置容器镜像加速

由于一些原因国内可能无法连接到 Docker Hub 拉取容器镜像，因此需要配置镜像加速。

## 对于 Podman

在面板打开 Podman 设置页面，导航到注册表配置选项卡。

滚动到配置文件底部，添加如下配置并保存：

```
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

其中 docker.1ms.run 为配置的镜像加速地址，可自行参考其他教程搭建使用。

## 对于 Docker

在面板打开 Docker 设置页面，导航到配置选项卡。

添加如下配置并保存：

```
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

其中 https://docker.1ms.run 为配置的镜像加速地址，可自行参考其他教程搭建使用。