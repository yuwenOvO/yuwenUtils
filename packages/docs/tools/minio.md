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

### 将证书文件拷贝到 MinIO 目录

```shell
# 创建 MinIO 证书目录
sudo mkdir -p /docker/minio/certs

# 拷贝证书文件到 MinIO 证书目录
sudo cp '你的证书公钥' /docker/minio/certs/public.crt
sudo cp '你的证书私钥' /docker/minio/certs/private.key
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
  -v /docker/minio/certs:/root/.minio/certs \
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
- `-v /docker/minio/certs:/root/.minio/certs`：将宿主机的 `/docker/minio/certs` 目录挂载到容器的 `/root/.minio/certs` 目录
- `minio/minio server /data`：启动 MinIO 服务并指定数据目录为 `/data`
- `--console-address ":9090"`：启动 MinIO 管理控制台并指定端口为 9090

:::

### 访问 MinIO 管理控制台

> 在浏览器中访问 `http://你的云服务器公网:9090`，使用上面设置的 `MINIO_ACCESS_KEY` 和 `MINIO_SECRET_KEY` 登录 MinIO 管理控制台。

::: tip

- 如果你访问不了 MinIO 管理控制台，请检查云服务器的安全组规则是否开放了 9090 端口。
- 记得同时放开 9000 端口，以便客户端可以通过 9000 端口访问 MinIO 的资源

:::

### 配置 Nginx 反向代理

```conf
# 在 Nginx 配置文件中添加以下配置
server {
  listen 443 ssl http2;
  server_name img.moshangl.cn;

  ssl_certificate '你的证书公钥'; # 证书公钥路径
  ssl_certificate_key '你的证书私钥'; # 证书私钥路径
  ssl_session_timeout 5m; # 会话超时时间
  ssl_protocols TLSv1.2 TLSv1.3; # 使用的协议
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; # 使用的加密套件
  ssl_prefer_server_ciphers on; # 优先使用服务器端加密套件

  location / {
    # 代理到minio服务
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass https://xxxx:9090;
  }

  location /api/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # 反向代理到后端的服务地址
    proxy_pass https://xxxx:9090;
  }

  location /ws/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass https://xxxx:9090;
  }

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root   html;
  }
}
```
