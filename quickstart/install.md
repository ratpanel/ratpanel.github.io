# 安装面板

## 运行环境

耗子面板支持 `amd64` | `arm64` 架构下的主流系统，下表中的系统均已测试 LNMP 环境安装。

优先建议使用标注**推荐**的系统，无特殊情况不建议使用标注**不推荐**的系统。

不在下表中的其他系统，可自行尝试安装，但不提供技术支持（接受相关 PR 提交）。

| 系统                  | 版本  | 备注  |
|---------------------|-----|-----|
| AlmaLinux           | 9   | 推荐  |
| AlmaLinux           | 8   | 不推荐 |
| RockyLinux          | 9   | 支持  |
| RockyLinux          | 8   | 不推荐 |
| CentOS Stream       | 9   | 不推荐 |
| CentOS Stream       | 8   | 不推荐 |
| Ubuntu              | 24  | 推荐  |
| Ubuntu              | 22  | 支持  |
| Debian              | 12  | 推荐  |
| Debian              | 11  | 支持  |
| OpenCloudOS         | 9   | 支持  |
| TencentOS Server    | 4   | 支持  |
| TencentOS Server    | 3.1 | 不推荐 |
| Alibaba Cloud Linux | 3.2 | 不推荐 |
| Anolis              | 8   | 不推荐 |
| openEuler           | 22  | 不推荐 |

随着系统版本的不断更新，我们亦可能会终止部分过于老旧的系统的支持，以保证面板的健壮性。

## 挂载硬盘

如果您的服务器有未挂载的数据盘，可在安装前以`root`用户登录服务器运行以下命令自动挂载，面板安装后不支持跨目录迁移。

```shell
curl -fsLm 10 -o auto_mount.sh https://dl.cdn.haozi.net/panel/auto_mount.sh && bash auto_mount.sh
```

## 安装面板

> **Warning**
> 安装面板前，您需要了解 LNMP 环境的基本知识，以及如何处理常见的 LNMP 环境问题，我们不建议 0 基础的用户安装和使用耗子面板。

以`root`用户登录服务器，运行以下命令安装面板：

```shell
curl -fsLm 10 -o install.sh https://dl.cdn.haozi.net/panel/install.sh && bash install.sh
```

## 卸载面板

优先建议备份数据重装系统，这样可以保证系统纯净。

如果您无法重装系统，请以`root`用户登录服务器，执行以下命令卸载面板：

```shell
curl -fsLm 10 -o uninstall.sh https://dl.cdn.haozi.net/panel/uninstall.sh && bash uninstall.sh
```

卸载面板前请务必备份好所有数据，提前卸载面板全部应用。卸载后数据将**无法恢复**！