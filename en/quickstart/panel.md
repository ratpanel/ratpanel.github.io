# Manage Panel

Do not stop or restart the Panel while tasks are still running, as this may cause issues.

* Start Panel: `systemctl start panel`
* Stop Panel: `systemctl stop panel`
* Restart Panel: `systemctl restart panel`

## Panel Command Line

```bash
panel-cli
```

Follow the prompts to complete the necessary commands for operation.

## Uninstall Panel

It is primarily recommended to back up data and reinstall the system, as this ensures a clean system.

If you are unable to reinstall the system, please log in to the server as `root` user and execute the following command
to uninstall the Panel:

```shell
curl -fsLm 10 -o uninstall.sh https://dl.cdn.haozi.net/panel/uninstall.sh && bash uninstall.sh
```

Before uninstalling the Panel, be sure to back up all data and uninstall all Panel applications in advance. Data will be
**unrecoverable** after uninstallation!
