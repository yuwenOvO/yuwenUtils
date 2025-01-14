---
outline: deep
---

# Minio

MinIO 是一款热门、轻量、开源的对象存储方案，完美兼容 AWS S3 协议，友好支持 K8s。MinIO 是专为 AI 等云原生工作负载而设计的，可以为高性能的云原生数据机器学习、大数据分析、海量存储的基础架构等提供数据工作负载。

## Docker 部署 MinIO

### 拉取 MinIO 镜像

```shell
sudo docker pull minio/minio
```

### 创建 MinIO 目录

```shell
# 创建 MinIO 数据目录
sudo mkdir -p /docker/minio/data

# 创建 MinIO 配置目录
sudo mkdir -p /docker/minio/config
```

### 启动 MinIO 服务

```shell
sudo docker run -d \
  --name minio \
  --restart always \
  -p 9000:9000 \
  -p 9090:9090 \
  -e "MINIO_ACCESS_KEY=xxxx" \
  -e "MINIO_SECRET_KEY=xxxx" \
  -v /docker/minio/data:/data \
  -v /docker/minio/config:/root/.minio \
  minio/minio server /data \
  --console-address ":9090"
```

::: tip

- `--name minio`：容器名称为 minio
- `--restart always`：容器退出时，总是重启容器
- `-p 9000:9000`：将容器的 9000 端口映射到宿主机的 9000 端口
- `-p 9090:9090`：将容器的 9090 端口映射到宿主机的 9090 端口
- `-e "MINIO_ACCESS_KEY=xxxx"`：设置 MinIO 的Username
- `-e "MINIO_SECRET_KEY=xxxx"`：设置 MinIO 的Password
- `-v /docker/minio/data:/data`：将宿主机的 `/docker/minio/data` 目录挂载到容器的 `/data` 目录
- `-v /docker/minio/config:/root/.minio`：将宿主机的 `/docker/minio/config` 目录挂载到容器的 `/root/.minio` 目录
- `minio/minio server /data`：启动 MinIO 服务并指定数据目录为 `/data`
- `--console-address ":9090"`：启动 MinIO 管理控制台并指定端口为 9090

:::

### 访问 MinIO 管理控制台

> 在浏览器中访问 `http://你的云服务器公网:9090`，使用上面设置的 `MINIO_ACCESS_KEY` 和 `MINIO_SECRET_KEY` 登录 MinIO 管理控制台。

::: tip

- 如果你访问不了 MinIO 管理控制台，请检查云服务器的安全组规则是否开放了 9090 端口。
- 记得同时放开 9000 端口，以便客户端可以通过 9000 端口访问 MinIO 的资源

:::
