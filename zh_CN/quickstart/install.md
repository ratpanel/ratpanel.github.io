# 安装面板

面板支持 `amd64` | `arm64` 架构下的主流系统，下表中的系统均已测试 LNMP 环境安装。 LNMP environment installation has been tested on all systems listed in the table below.

优先建议使用标注**推荐**的系统，无特殊情况不建议使用标注**不推荐**的系统。 Unless there are special circumstances, it is not recommended to use systems marked as **not recommended**.

不在下表中的其他系统，可自行尝试安装，但不提供无偿技术支持。

| 系统                  | 版本                  | 备注  |
| ------------------- | ------------------- | --- |
| AlmaLinux           | 9                   | 推荐  |
| AlmaLinux           | 8                   | 不推荐 |
| RockyLinux          | 9                   | 支持  |
| RockyLinux          | 8                   | 不推荐 |
| CentOS Stream       | 9                   | 不推荐 |
| CentOS Stream       | 8                   | 不推荐 |
| Ubuntu              | 24                  | 推荐  |
| Ubuntu              | 22                  | 支持  |
| Debian              | 12                  | 推荐  |
| Debian              | 11                  | 支持  |
| OpenCloudOS         | 9                   | 支持  |
| TencentOS Server    | 4                   | 支持  |
| TencentOS Server    | 3.1 | 不推荐 |
| Alibaba Cloud Linux | 3.2 | 不推荐 |
| Anolis              | 8                   | 不推荐 |
| openEuler           | 22                  | 不推荐 |

随着系统版本的不断更新，我们亦可能会终止部分过于老旧的系统的支持，以保证面板的健壮性。

## 开始安装

> If you need to mount partitions, please complete before installing the Panel. 如需挂载分区，请在安装面板前完成，面板安装后不支持跨目录迁移。

以 `root` 用户登录服务器，运行以下命令安装面板：

```shell
curl -fsLm 10 -o install.sh https://dl.cdn.haozi.net/panel/install.sh && bash install.sh
```

一般 2 分钟内即可完成安装，安装过程中请勿关闭终端。 Do not close the terminal during the installation process.
