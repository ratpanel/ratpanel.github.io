# Install Panel

The Panel supports mainstream systems under `amd64` | `arm64` architectures. LNMP environment installation has been tested on all systems listed in the table below.

It is recommended to use systems marked as **recommended**. Unless there are special circumstances, it is not recommended to use systems marked as **not recommended**.

For systems not listed in the table below, you can try installing on your own, but no free technical support will be provided.

| System              | Version | Note            |
|---------------------|---------|-----------------|
| AlmaLinux           | 9       | Recommended     |
| AlmaLinux           | 8       | Not Recommended |
| RockyLinux          | 9       | Supported       |
| RockyLinux          | 8       | Not Recommended |
| CentOS Stream       | 9       | Not Recommended |
| CentOS Stream       | 8       | Not Recommended |
| Ubuntu              | 24      | Recommended     |
| Ubuntu              | 22      | Supported       |
| Debian              | 12      | Recommended     |
| Debian              | 11      | Supported       |
| OpenCloudOS         | 9       | Supported       |
| TencentOS Server    | 4       | Supported       |
| TencentOS Server    | 3.1     | Not Recommended |
| Alibaba Cloud Linux | 3.2     | Not Recommended |
| Anolis              | 8       | Not Recommended |
| openEuler           | 22      | Not Recommended |

As system versions continue to update, we may also terminate support for some overly outdated systems to ensure the robustness of the Panel.

## Start Installation

> If you need to mount partitions, please complete before installing the Panel. Cross-directory migration is not
> supported after Panel installation.

Log in to the server as `root` user and run the following command to install the Panel:

```shell
curl -fsLm 10 -o install.sh https://dl.cdn.haozi.net/panel/install.sh && bash install.sh
```

Installation is usually completed within 2 minutes. Do not close the terminal during the installation process.
