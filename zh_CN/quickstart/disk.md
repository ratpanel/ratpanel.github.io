# 挂载分区

如果您的服务器有未挂载的数据盘，可在安装前以 root 用户登录服务器运行以下命令自动挂载。 面板安装后不支持跨目录迁移。

```shell
curl -sSLOm 10 https://dl.cdn.haozi.net/panel/auto_mount.sh && bash auto_mount.sh
```

也可工单联系服务器提供商要求协助挂载分区，或者自行挂载分区后再安装面板。
