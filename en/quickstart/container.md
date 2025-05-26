# Manage Containers

Before starting, you need to install the Docker / Podman container engine.

After the container engine is installed, you can go to the Panel's container management section to create containers (pgadmin4 is used as an example here).

First, navigate to the Images tab to pull the required images. This may take several minutes to tens of minutes depending on your network environment.

![Pull Image](/container1.png)

After the image is pulled, navigate to the Containers tab to start creating a container.

![Create Container](/container2.png)

Fill in the form according to the container's instructions. The pgadmin4 image used here needs to map port 80 and configure 2 default environment variables, with no need to map directories.

After the container is created, you can click the refresh button in the upper right corner and the log button on the right side of the container to check if it has started properly.

![Container Start](/container3.png)

If the container fails to start, please make corrections according to the logs.

If you have mapped external ports, you need to go to the firewall menu to allow the corresponding ports.

![Creation Successful](/container4.png)
