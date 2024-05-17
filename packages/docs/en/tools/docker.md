---
outline: deep
---

# Docker Installation{#docker-install}

## Install Docker on Linux{#linux-install}

Install related dependencies

```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

Add domestic source to improve network transmission efficiency

```shell
sudo yum-config-manager --add-repo https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

Update yum software source cache and install docker-ce

```shell
sudo yum makecache fast
sudo yum install -y docker-ce
```

Start docker and set it to start automatically

```shell
sudo systemctl enable docker
sudo systemctl start docker
```

Check if docker is installed successfully

```shell
docker run hello-world
```

View docker version information

```shell
docker -v
```

## Common Docker Commands{#docker-command}

### Service-related commands{#service-command}

<br />

#### Start service{#service-start}

```shell
sudo systemctl start docker
```

#### Stop service{#service-stop}

```shell
sudo systemctl stop docker
```

#### Restart service{#service-restart}

```shell
sudo systemctl restart docker
```

#### View service status{#service-status}

```shell
sudo systemctl status docker
```

#### Enable service to start automatically{#service-enable}

```shell
sudo systemctl enable docker
```

### Image-related commands{#image-command}

<br />

#### Image search{#image-search}

```shell
docker search [image-name]
```

#### Pull image{#image-pull}

```shell
docker pull [image-name]
```

::: tip
The `docker pull` command defaults to pulling the latest version of the image. If you need to pull a specific version of the image, you can use the `docker pull [image-name]:[tag]` command.
<br />
If you don't know what version numbers are available, you can check [Docker Hub](https://hub.docker.com/).
:::

#### View image list{#image-list}

```shell
docker images
```

#### Delete image{#image-delete}

```shell
docker rmi [image-id]
#or
docker rmi [image-name]:[tag]
```

::: tip
To accurately delete your target image, it is recommended to use the `docker rmi [image-name]:[tag]` command when deleting images with multiple versions. If the two image `ID`s are different, you can also use the image `ID` for deletion to prevent accidental deletion.
<br />
When deleting an image, if the image is being used by a container, you need to stop the container first and then delete the image.
<br />
If you want to delete multiple images, you can use the `docker rmi [image-id1] [image-id2] ...` command.
:::

<!-- ### 容器相关命令 -->

### Container-related commands{#container-command}

<br />

#### Create container{#container-create}

```shell
# For example, onlyoffice/documentserver
docker run -i -t -d -p 8000:80 \
  --restart=always \
  -v /docker/onlyOffice/DocumentServer/logs:/var/log/onlyoffice \
  -v /docker/onlyOffice/DocumentServer/data:/var/www/onlyoffice/Data \
  -v /docker/onlyOffice/DocumentServer/lib:/var/lib/onlyoffice \
  -v /docker/onlyOffice/DocumentServer/db:/var/lib/postgresql \
  -e JWT_ENABLED=false \
  onlyoffice/documentserver
```

Here are some common parameters:

- `docker run`: Create and start a new container
- `-i`: Run the container in interactive mode, usually used with `-t`
- `-t`: Allocate a pseudo-terminal for the container, usually used with `-i`
- `-d`: Run the container in the background and return the container ID
- `-p`: Map the container port to the host port, in the format of `hostPort:containerPort`
- `--restart=always`: Set the container to restart automatically
- `-v`: Mount the host directory to the container directory, in the format of `hostDir:containerDir`
- `-e`: Set environment variables for the container

#### View container list{#container-list}

```shell
# View the list of running containers
docker ps

# View the most recently created container
docker ps -l

# View the list of running container IDs
docker ps -q

# View all containers (including stopped containers)
docker ps -a

# View the list of all container IDs
docker ps -aq
```

#### Stop running container{#container-stop}

```shell
# Stop using the container name
docker stop [container-name]

# Stop using the container ID
docker stop [container-id]

# Stop multiple running containers using the container ID
docker stop [container-id1] [container-id2] ...
```

#### Start a stopped container{#container-start}

```shell
# Start using the container name
docker start [container-name]

# Start using the container ID
docker start [container-id]

# Start multiple stopped containers using the container ID
docker start [container-id1] [container-id2] ...
```

#### Delete container{#container-delete}

```shell
# Delete using the container name
docker rm [container-name]

# Delete using the container ID
docker rm [container-id]

# Delete multiple containers using the container ID
docker rm [container-id1] [container-id2] ...
```

::: tip
When deleting a container, if the container is running, you need to stop the container first and then delete the container.
:::

#### Restart container{#container-restart}

```shell
# Restart using the container name
docker restart [container-name]

# Restart using the container ID
docker restart [container-id]

# Restart multiple containers using the container ID
docker restart [container-id1] [container-id2] ...
```

#### Enter the container{#container-enter}

```shell
# Enter using the container name
docker exec -it [container-name] /bin/bash

# Enter using the container ID
docker exec -it [container-id] /bin/bash
```
