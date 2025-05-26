# Configure Container Image Acceleration

Due to certain reasons, domestic users in China may be unable to connect to Docker Hub to pull container images, thus requiring image acceleration configuration.

## For Podman

Open the Podman settings page in the Panel, and navigate to the Registry Configuration tab.

Scroll to the bottom of the configuration file, add the following configuration and save:

```
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

Where docker.1ms.run is the configured image acceleration address. You can refer to other tutorials to set up and use it.

## For Docker

Open the Docker settings page in the Panel, and navigate to the Configuration tab.

Add the following configuration and save:

```
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

Where https://docker.1ms.run is the configured image acceleration address. You can refer to other tutorials to set up and use it.
