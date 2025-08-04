# Manage Panel

Do not stop or restart the Panel while tasks are still running, as this may cause issues.

- Start Panel: `systemctl start panel`
- Stop Panel: `systemctl stop panel`
- Restart Panel: `systemctl restart panel`

## Panel Command Line

```bash
panel-cli
```

Follow the prompts to complete the necessary commands for operation.

For example, to change a user's password, you can use:

```bash
panel-cli user password haozi 123456
```

This will change the password for the user `haozi` to `123456`.

## Uninstall Panel

It is primarily recommended to back up data and reinstall the system, as this ensures a clean system.

If you are unable to reinstall the system, please log in to the server as `root` user and execute the following command to uninstall the Panel:

```shell
curl -sSLOm 10 https://dl.cdn.haozi.net/panel/uninstall.sh && bash uninstall.sh
```

Before uninstalling the Panel, be sure to back up all data and uninstall all Panel applications in advance. Data will be **unrecoverable** after uninstallation!
