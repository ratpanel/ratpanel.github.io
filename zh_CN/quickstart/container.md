# 管理容器

开始前需安装 Docker / Podman 容器引擎。

容器引擎安装完毕后，即可前往面板容器管理处创建容器（此处以 pgadmin4 为例）。

First, navigate to the Images tab to pull the required images. This may take several minutes to tens of minutes depending on your network environment.

![拉取镜像](/container1.png)

镜像拉取完成后，导航到容器选项卡开始创建容器。

![创建容器](/container2.png)

Fill in the form according to the container's instructions. The pgadmin4 image used here needs to map port 80 and configure 2 default environment variables, with no need to map directories.

容器创建完成后可点击右上角刷新按钮和容器右侧的日志按钮检查是否正常启动。

![容器启动](/container3.png)

If the container fails to start, please make corrections according to the logs.

If you have mapped external ports, you need to go to the firewall menu to allow the corresponding ports.

![创建成功](/container4.png)
