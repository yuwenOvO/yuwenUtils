---
outline: deep
---

# Docker安装{#docker-install}

## Linux系统安装Docker{#linux-install}

### 设置Docker的仓库{#docker-repo}

```shell
# 添加官方GPG密钥
sudo apt update # 更新软件源
sudo apt install ca-certificates curl # 安装证书和curl工具
sudo install -m 0755 -d /etc/apt/keyrings # 创建密钥目录
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc # 下载密钥
sudo chmod a+r /etc/apt/keyrings/docker.asc # 设置密钥权限

# 将docker的仓库添加到apt软件源中
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
```

### 安装 docker-ce{#install-docker-ce}

```shell
sudo apt install docker-ce
```

### 设置国内镜像源{#docker-mirror}

```shell
# 创建或修改/etc/docker/daemon.json文件
sudo vim /etc/docker/daemon.json

# 添加如下内容
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://ccr.ccs.tencentyun.com"
  ]
}
```

### 重启docker{#restart-docker}

```shell
# 重启docker，注意由于走的是守护程序daemon，所以daemon进程也需要重启。
sudo systemctl daemon-reload  #重启daemon进程
sudo systemctl restart docker  #重启docker
```

### 验证国内镜像源是否生效{#verify-docker-mirror}

```shell
sudo docker info
```

> 如果`Registry Mirrors`中有你设置的镜像源地址，则说明设置成功。

### 设置开机自启{#auto-start}

```shell
sudo systemctl enable docker
```

### 检查docker是否安装成功{#check-docker}

```shell
sudo docker ps
```

### 查看docker版本信息{#docker-version}

```shell
sudo docker -v
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
sudo docker search [image-name]
```

#### 拉取镜像{#image-pull}

```shell
sudo docker pull [image-name]
```

::: tip
`sudo docker pull`命令默认拉取最新版本的镜像，如果需要拉取指定版本的镜像，可以使用`sudo docker pull [image-name]:[tag]`命令。
<br />
如果不知道版本号有哪些，可以去[Docker Hub](https://hub.docker.com/)查看。
:::

#### 查看本地镜像{#image-list}

```shell
sudo docker images
```

#### 删除本地镜像{#image-delete}

```shell
sudo docker rmi [image-id]
#or
sudo docker rmi [image-name]:[tag]
```

::: tip
为了准确删除你的目标镜像, 建议删除有多个版本存在的镜像时, 使用`sudo docker rmi [image-name]:[tag]`命令。 如果二者镜像`ID`不同也可以使用镜像`ID`进行删除, 防止误删。
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
sudo docker run -i -t -d -p 8000:80 \
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
sudo docker ps

# 查看最近一次创建的容器
sudo docker ps -l

# 查看正在运行的容器ID列表
sudo docker ps -q

# 查看全部容器(包括已经停止的容器)
sudo docker ps -a

# 查看全部容器ID列表
sudo docker ps -aq
```

#### 停止运行的容器{#container-stop}

```shell
# 使用容器名停止
sudo docker stop [container-name]

# 使用容器ID停止
sudo docker stop [container-id]

# 使用容器ID停止多个正在运行的容器
sudo docker stop [container-id1] [container-id2] ...
```

#### 启动已停止的容器{#container-start}

```shell
# 使用容器名启动
sudo docker start [container-name]

# 使用容器ID启动
sudo docker start [container-id]

# 使用容器ID启动多个已停止的容器
sudo docker start [container-id1] [container-id2] ...
```

#### 删除容器{#container-delete}

```shell
# 使用容器名删除
sudo docker rm [container-name]

# 使用容器ID删除
sudo docker rm [container-id]

# 使用容器ID删除多个容器
sudo docker rm [container-id1] [container-id2] ...
```

::: tip
删除容器时，如果容器正在运行，需要先停止容器，然后再删除容器。
:::

#### 重启容器{#container-restart}

```shell
# 使用容器名重启
sudo docker restart [container-name]

# 使用容器ID重启
sudo docker restart [container-id]

# 使用容器ID重启多个容器
sudo docker restart [container-id1] [container-id2] ...
```

#### 进入容器{#container-enter}

```shell
# 使用容器名进入
sudo docker exec -it [container-name] /bin/bash

# 使用容器ID进入
sudo docker exec -it [container-id] /bin/bash
```
