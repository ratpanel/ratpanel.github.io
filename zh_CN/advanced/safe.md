# 安全性建议

With the following security measures, almost all hacking/malware issues can be prevented.

### 网站方面

Based on experience, most hacking and malware incidents are caused by program vulnerabilities, unrelated to the Panel or environment. For website security, you should:

1. 不要使用盗版程序、软件，特别是在你无法确定有没有被人加过料的情况下。
2. 定期更新网站程序和软件环境，不要怕麻烦使用过时的软件程序，它们的安全性无法保证。
3. Never use weak passwords for website admin areas. Passwords are strongly recommended to be generated using a random generator with more than 20 mixed characters and stored in a secure location. If possible, enable 2FA for your programs.
4. 设置定时备份全站数据，不要裸奔。
5. PHP 默认禁用了部分高危函数，非必要请勿删除。

### 系统方面

现代系统出现严重安全漏洞的概率是很低的，但是你仍应该做到：

1. Regularly update system software. 定期更新系统软件。（使用 `yum update` 或 `apt upgrade`）。
2. SSH 禁止使用弱密码和默认 22 端口，密码强烈建议使用随机生成器生成大于 20 位的混合密码并保存在安全位置，如果可以建议安装
  Fail2ban 针对性保护。 Passwords are strongly recommended to be generated using a random generator with more than 20 mixed characters and stored in a secure location. If possible, consider installing Fail2ban for targeted protection.
3. 不要随意给 777 权限和 www 用户的执行权限，可能造成极大安全隐患。
4. 如果运营商提供 VNC 管理服务器，也可以考虑关闭 SSH，从源头上解决问题。

### 面板方面

面板拥有和 root 一样的权限，管理不当亦会造成严重安全问题，你应该做到： You should:

1. Regularly update the Panel and applications installed through it. We recommend following our channel or group to receive various update messages promptly.
2. 面板禁止使用弱密码和默认 8888 端口，密码强烈建议使用随机生成器生成大于 20 位的混合密码并保存在安全位置。 Passwords are strongly recommended to be generated using a random generator with more than 20 mixed characters and stored in a secure location.
3. 建议修改添加面板入口和开启面板 HTTPS，防止被扫描器扫描和中间人攻击。
4. 防火墙无必要请不要放行内部服务的端口（Redis 6379、MySQL 3306、PostgreSQL 5432等），可能造成严重安全隐患。（网站本地连接不需要放行，连不上是程序的问题）。 (Local website connections don't require firewall access; connection issues are program problems).
5. 对安全性要求较高的情况下，可以考虑日常停止面板的运行，按需启动（面板停止运行不会影响网站、计划任务等的运行）。
