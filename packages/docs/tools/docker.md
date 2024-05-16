---
outline: deep
---

# Docker安装{#docker-install}

## Linux系统安装Docker{#linux-install}

安装相关依赖

```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

添加国内源，提高网络传输效率

```shell
sudo yum-config-manager --add-repo https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

更新 yum 软件源缓存，并安装 docker-ce

```shell
sudo yum makecache fast
sudo yum install -y docker-ce
```

启动docker，且设置开机自启
  
```shell
sudo systemctl enable docker
sudo systemctl start docker
```

检查docker是否安装成功

```shell
docker run hello-world
```

查看docker版本信息

```shell
docker -v
```

## Docker常用命令{#docker-command}

### 服务相关命令{#service-command}

<br />

#### 启动服务{#service-start}

```shell
sudo systemctl start docker
```

#### 停止服务{#service-stop}

```shell
sudo systemctl stop docker
```

#### 重启服务{#service-restart}

```shell
sudo systemctl restart docker
```

#### 查看服务状态{#service-status}

```shell
sudo systemctl status docker
```

#### 设置服务开机自启{#service-enable}

```shell
sudo systemctl enable docker
```

### 镜像相关命令{#image-command}

<br />

#### 搜索镜像{#image-search}

```shell
docker search [image-name]
```

#### 拉取镜像{#image-pull}

```shell
docker pull [image-name]
```

::: tip
`docker pull`命令默认拉取最新版本的镜像，如果需要拉取指定版本的镜像，可以使用`docker pull [image-name]:[tag]`命令。
<br />
如果不知道版本号有哪些，可以去[Docker Hub](https://hub.docker.com/)查看。
:::

#### 查看本地镜像{#image-list}

```shell
docker images
```

#### 删除本地镜像{#image-delete}

```shell
docker rmi [image-id]
#or
docker rmi [image-name]:[tag]
```

::: tip
为了准确删除你的目标镜像, 建议删除有多个版本存在的镜像时, 使用`docker rmi [image-name]:[tag]`命令。 如果二者镜像`ID`不同也可以使用镜像`ID`进行删除, 防止误删。
<br />
删除镜像时，如果该镜像正在被容器使用，需要先停止容器，然后再删除镜像。
<br />
如果要删除多个镜像，可以使用`docker rmi [image-id1] [image-id2] ...`命令。
:::

### 容器相关命令{#container-command}

<br />

#### 创建容器{#container-create}

```shell
# 以onlyoffice/documentserver为例
docker run -i -t -d -p 8000:80 \
  --restart=always \
  -v /docker/onlyOffice/DocumentServer/logs:/var/log/onlyoffice \
  -v /docker/onlyOffice/DocumentServer/data:/var/www/onlyoffice/Data \
  -v /docker/onlyOffice/DocumentServer/lib:/var/lib/onlyoffice \
  -v /docker/onlyOffice/DocumentServer/db:/var/lib/postgresql \
  -e JWT_ENABLED=false \
  onlyoffice/documentserver
```

以下是一些常用的参数：

- `docker run`：创建并启动一个新容器
- `-i`：以交互模式运行容器，通常与`-t`同时使用
- `-t`：为容器分配一个伪终端，通常与`-i`同时使用
- `-d`：后台运行容器，并返回容器ID
- `-p`：指定端口映射，格式为`主机端口:容器端口`
- `--restart=always`：容器退出时，总是重启容器
- `-v`：挂载宿主机目录到容器目录，格式为`宿主机目录:容器目录`
- `-e`：设置环境变量

#### 查看容器列表{#container-list}

```shell
# 查看正在运行的容器列表
docker ps

# 查看最近一次创建的容器
docker ps -l

# 查看正在运行的容器ID列表
docker ps -q

# 查看全部容器(包括已经停止的容器)
docker ps -a

# 查看全部容器ID列表
docker ps -aq
```

#### 停止运行的容器{#container-stop}

```shell
# 使用容器名停止
docker stop [container-name]

# 使用容器ID停止
docker stop [container-id]

# 使用容器ID停止多个正在运行的容器
docker stop [container-id1] [container-id2] ...
```

#### 启动已停止的容器{#container-start}

```shell
# 使用容器名启动
docker start [container-name]

# 使用容器ID启动
docker start [container-id]

# 使用容器ID启动多个已停止的容器
docker start [container-id1] [container-id2] ...
```

#### 删除容器{#container-delete}

```shell
# 使用容器名删除
docker rm [container-name]

# 使用容器ID删除
docker rm [container-id]

# 使用容器ID删除多个容器
docker rm [container-id1] [container-id2] ...
```

::: tip
删除容器时，如果容器正在运行，需要先停止容器，然后再删除容器。
:::

#### 重启容器{#container-restart}

```shell
# 使用容器名重启
docker restart [container-name]

# 使用容器ID重启
docker restart [container-id]

# 使用容器ID重启多个容器
docker restart [container-id1] [container-id2] ...
```

#### 进入容器{#container-enter}

```shell
# 使用容器名进入
docker exec -it [container-name] /bin/bash

# 使用容器ID进入
docker exec -it [container-id] /bin/bash
```
