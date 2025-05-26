# Security Recommendations

With the following security measures, almost all hacking/malware issues can be prevented.

### Website Aspects

Based on experience, most hacking and malware incidents are caused by program vulnerabilities, unrelated to the Panel or environment. For website security, you should:

1. Avoid using pirated programs or software, especially when you cannot determine if they have been tampered with.
2. Regularly update website programs and software environments; don't use outdated software due to inconvenience, as their security cannot be guaranteed.
3. Never use weak passwords for website admin areas. Passwords are strongly recommended to be generated using a random generator with more than 20 mixed characters and stored in a secure location. If possible, enable 2FA for your programs.
4. Set up scheduled backups of all site data; don't operate without backups.
5. PHP has disabled some high-risk functions by default; don't remove these restrictions unless absolutely necessary.

### System Aspects

The probability of serious security vulnerabilities in modern systems is low, but you should still:

1. Regularly update system software. (Use `yum update` or `apt upgrade`).
2. Prohibit weak passwords and the default port 22 for SSH. Passwords are strongly recommended to be generated using a random generator with more than 20 mixed characters and stored in a secure location. If possible, consider installing Fail2ban for targeted protection.
3. Don't arbitrarily assign 777 permissions or execution permissions to the www user, as this may cause major security risks.
4. If your service provider offers VNC server management, consider disabling SSH to solve the problem at the source.

### Panel Aspects

RatPanel has the same privileges as root, and improper management can cause serious security problems. You should:

1. Regularly update the Panel and applications installed through it. We recommend following our channel or group to receive various update messages promptly.
2. Prohibit weak passwords and the default 8888 port for the Panel. Passwords are strongly recommended to be generated using a random generator with more than 20 mixed characters and stored in a secure location.
3. Consider modifying the Panel entry point and enabling HTTPS for the Panel to prevent scanner detection and man-in-the-middle attacks.
4. Unless necessary, do not allow firewall access to internal service ports (Redis 6379, MySQL 3306, PostgreSQL 5432, etc.), as this may cause serious security risks. (Local website connections don't require firewall access; connection issues are program problems).
5. For high-security requirements, consider stopping the Panel operation routinely and starting it only when needed (stopping the Panel will not affect websites, scheduled tasks, etc.).
