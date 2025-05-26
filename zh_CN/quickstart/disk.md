# Mount Partitions

If your server has unmounted data disks, you can log in as `root` user before installation and run the following command to automatically mount them. Cross-directory migration is not supported after Panel installation.

```shell
curl -fsLm 10 -o auto_mount.sh https://dl.cdn.haozi.net/panel/auto_mount.sh && bash auto_mount.sh
```

也可工单联系服务器提供商要求协助挂载分区，或者自行挂载分区后再安装面板。
