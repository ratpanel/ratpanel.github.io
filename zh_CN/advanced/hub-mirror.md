# 配置容器镜像加速

由于一些原因国内可能无法连接到 Docker Hub 拉取容器镜像，因此需要配置镜像加速。

## 对于 Podman

Open the Podman settings page in the Panel, and navigate to the Registry Configuration tab.

滚动到配置文件底部，添加如下配置并保存：

```
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

Where docker.1ms.run is the configured image acceleration address. You can refer to other tutorials to set up and use it.

## 对于 Docker

Open the Docker settings page in the Panel, and navigate to the Configuration tab.

添加如下配置并保存：

```
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

其中 docker.1ms.run 为配置的镜像加速地址，可自行参考其他教程搭建使用。 You can refer to other tutorials to set up and use it.
