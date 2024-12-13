# 管理面板

请勿在面板仍有任务运行时操作停止 / 重启面板，否则可能会造成问题。

* 启动面板：`systemctl start panel`
* 停止面板：`systemctl stop panel`
* 重启面板：`systemctl restart panel`

## 面板命令行

```bash
panel-cli
```

可根据提示补全需要的命令进行操作。

## 卸载面板

优先建议备份数据重装系统，这样可以保证系统纯净。

如果您无法重装系统，请以`root`用户登录服务器，执行以下命令卸载面板：

```shell
curl -fsLm 10 -o uninstall.sh https://dl.cdn.haozi.net/panel/uninstall.sh && bash uninstall.sh
```

卸载面板前请务必备份好所有数据，提前卸载面板全部应用。卸载后数据将**无法恢复**！
