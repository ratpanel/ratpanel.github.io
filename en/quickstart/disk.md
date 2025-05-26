# Mount Partitions

If your server has unmounted data disks, you can log in as `root` user before installation and run the following command
to automatically mount them. Cross-directory migration is not supported after Panel installation.

```shell
curl -fsLm 10 -o auto_mount.sh https://dl.cdn.haozi.net/panel/auto_mount.sh && bash auto_mount.sh
```

You can also contact your server provider via ticket to request assistance with mounting partitions, or mount the
partitions yourself before installing the Panel.
