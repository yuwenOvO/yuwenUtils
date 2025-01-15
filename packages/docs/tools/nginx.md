---
outline: deep
---

# Nginx

Nginx（发音为"engine x"）是一个高性能的开源 Web 服务器和反向代理服务器。它被设计用于处理高并发的网络流量，特别适用于解决 C10K 问题（即无法同时处理大量客户端连接的问题）。Nginx 在性能和轻量级设计上表现出色，广泛用于构建高性能、可靠性强的 Web 服务器和反向代理。

Nginx 的主要特点包括：

- 高性能：Nginx 采用事件驱动的异步架构，能够高效处理大量并发连接。
- 轻量级：Nginx 的代码量小，资源消耗低，启动速度快。
- 可扩展性：Nginx 支持模块化设计，可以通过插件扩展功能。
- 反向代理：Nginx 可以作为反向代理服务器，用于负载均衡、缓存、SSL 终结等。
- 负载均衡：Nginx 支持多种负载均衡算法，可以实现负载均衡和故障转移。
- 事件驱动：Nginx 使用事件驱动的异步架构，能够高效处理大量并发连接。
- 高可靠性：Nginx 采用多进程模型，支持热部署，能够提供高可靠性的服务。

## 安装 Nginx

### 安装前置依赖

#### gcc安装

```shell
sudo apt install build-essential libpcre3-dev libssl-dev
```

::: info
`build-essential` 是一个包，包含了编译 C/C++ 程序所需的工具链，包括 gcc、g++、make 等。

`libpcre3-dev` 是 PCRE（Perl Compatible Regular Expressions）库的开发包，Nginx 使用 PCRE 库来支持正则表达式。

`libssl-dev` 是 OpenSSL 库的开发包，Nginx 使用 OpenSSL 库来支持 SSL/TLS 加密。
:::

检测是否安装成功

```shell
gcc -v
```

#### pcre安装

```shell
wget https://github.com/PCRE2Project/pcre2/releases/download/pcre2-10.44/pcre2-10.44.tar.gz

sudo tar -zxvf pcre2-10.44.tar.gz

cd pcre2-10.44

sudo ./configure --prefix=/usr/local/pcre2
sudo make
sudo make install
```

::: info
`--prefix` 指定安装目录，`/usr/local/pcre2` 是一个常用的安装目录。
:::

#### zlib安装

```shell
wget https://github.com/madler/zlib/releases/download/v1.3.1/zlib-1.3.1.tar.gz

sudo tar -zxvf zlib-1.3.1.tar.gz

cd zlib-1.3.1/

sudo ./configure --prefix=/usr/local/zlib
sudo make
sudo make install
```

#### openssl安装

```shell
wget https://github.com/openssl/openssl/releases/download/openssl-3.3.1/openssl-3.3.1.tar.gz

sudo tar -zxvf openssl-3.3.1.tar.gz

cd openssl-3.3.1/

sudo ./config --prefix=/usr/local/openssl
sudo make
sudo make install
```

### Nginx安装

```shell
wget https://nginx.org/download/nginx-1.26.2.tar.gz

sudo tar -zxvf nginx-1.26.2.tar.gz

cd nginx-1.26.2/

sudo ./configure \
--prefix=/usr/local/nginx \
--with-pcre=/usr/local/pcre2-10.44 \
--with-zlib=/usr/local/zlib-1.3.1 \
--with-openssl=/usr/local/openssl-3.3.1 \
--with-stream \
--with-stream_ssl_preread_module \
--with-http_ssl_module \
--with-http_v2_module \
--with-http_realip_module

sudo make
sudo make install
```

::: info
`--prefix` 指定安装目录，`/usr/local/nginx` 是一个常用的安装目录。

`--with-pcre` 指定 PCRE 库的安装目录。

`--with-zlib` 指定 zlib 库的安装目录。

`--with-openssl` 指定 OpenSSL 库的安装目录。

`--with-stream` 启用 stream 模块，支持 TCP/UDP 代理。

`--with-stream_ssl_preread_module` 启用 stream_ssl_preread 模块，支持 SSL/TLS 握手。

`--with-http_ssl_module` 启用 http_ssl 模块，支持 SSL/TLS 加密。

`--with-http_v2_module` 启用 http_v2 模块，支持 HTTP/2 协议。

`--with-http_realip_module` 启用 http_realip 模块，支持获取真实 IP 地址。
:::

## Nginx 使用

### 启动 Nginx

```shell
cd /usr/local/nginx/sbin

sudo ./nginx
```

> Nginx 默认监听 80 端口，可以通过浏览器访问 `http://本机IP` 来验证 Nginx 是否启动成功。

### 停止 Nginx

```shell
cd /usr/local/nginx/sbin

sudo ./nginx -s stop
```

### 重启 Nginx

```shell
cd /usr/local/nginx/sbin

sudo ./nginx -s reload
```

### 创建软连接

```shell
sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/nginx
```

::: info
通过创建软连接，可以在任意目录下使用 `nginx` 命令来启动 Nginx。
:::

## 配置 Nginx 系统服务

### 创建 Nginx 系统服务文件

```shell
sudo vim /etc/systemd/system/nginx.service
```

在文件中添加以下内容：

```shell
[Unit]
Description = nginx daemon

[Service]
ExecStart = /usr/local/nginx/sbin/nginx
ExecStop = /usr/local/nginx/sbin/nginx -s stop
ExecReload = /usr/local/nginx/sbin/nginx -s reload
Restart = always
Type = forking

[Install]
WantedBy = multi-user.target
```

::: info
`ExecStart` 指定启动 Nginx 的命令。

`ExecStop` 指定停止 Nginx 的命令。

`ExecReload` 指定重启 Nginx 的命令。

`Restart` 指定服务异常退出时自动重启。

`Type` 指定服务的类型，`forking` 表示服务是一个后台进程。

`WantedBy` 指定服务的启动级别。
:::

### nginx 系统服务操作命令

#### 启动 Nginx 服务

```shell
sudo systemctl start nginx
```

#### 停止 Nginx 服务

```shell
sudo systemctl stop nginx
```

#### 重启 Nginx 服务

```shell
sudo systemctl restart nginx
```

#### 查看 Nginx 服务状态

```shell
sudo systemctl status nginx
```

#### 设置 Nginx 开机自启动

```shell
sudo systemctl enable nginx
```

#### 取消 Nginx 开机自启动

```shell
sudo systemctl disable nginx
```

#### 重新加载 Nginx 服务

```shell
sudo systemctl daemon-reload
```

### 配置nginx.conf

```shell
sudo vim /usr/local/nginx/conf/nginx.conf
```

在文件中添加以下内容：

```txt
#user  nobody;
# 定义工作进程的数量
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
  # 设置每个 worker 进程可以处理的最大连接数
  worker_connections  1024;
}


http {
  include       mime.types; # 包含 mime.types 文件
  default_type  application/octet-stream; # 默认 MIME 类型

  sendfile        on; # 开启 sendfile

  keepalive_timeout  65; # 客户端连接超时时间

  gzip  on; # 开启 gzip 压缩
  gzip_min_length 1k; # 设置最小压缩文件大小
  gzip_buffers 32 4k; # 设置压缩缓冲区大小
  gzip_http_version 1.1; # 设置压缩版本
  gzip_comp_level 6; # 设置压缩等级
  gzip_types       text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json; # 设置压缩类型
  gzip_disable "MSIE [1-6]\."; # 禁用 IE6 的 gzip
  gzip_vary on; # 开启 gzip vary

  server {
    listen       80; # 监听 80 端口
    listen       [::]:80; # 监听 IPv6 80 端口
    server_name  xxx.xx www.xxx.xx; # 设置域名
    # 将所有http请求重定向到https
    return 301 https://$server_name$request_uri;
  }

  server {
    listen 443 ssl http2; # 监听 443 端口，启用 SSL 和 HTTP/2
    server_name xxx.xx www.xxx.xx; # 设置域名

    ssl_certificate '你的证书路径'; # 设置证书路径
    ssl_certificate_key '你的证书密钥路径'; # 设置证书密钥路径
    ssl_session_timeout 5m; # 设置 SSL 会话超时时间
    ssl_protocols TLSv1.2 TLSv1.3; # 设置 SSL 协议版本
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; # 设置 SSL 加密算法
    ssl_prefer_server_ciphers on; # 设置优先使用服务器端加密算法

    location / {
      try_files $uri $uri/ @router; # 尝试查找文件，如果找不到则重定向到 @router
      root   '你的前端路径'; # 设置根目录
      index  index.html index.htm; # 设置默认首页
    }

    location @router {
      rewrite ^.*$ /index.html last; # 重定向到 index.html
    }

    location /api {
      rewrite ^/api/(.*)$ /$1 break; # 重写 /api/ 为 /
      proxy_set_header Host $host; # 设置请求头
      proxy_set_header X-Real-IP $remote_addr; # 设置请求头
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 设置请求头
      # 反向代理到后端的服务地址
      proxy_pass http://xxxxx:xx; # 设置代理地址
    }

    error_page 500 502 503 504 /50x.html; # 设置错误页面
    location = /50x.html {
      root   html; # 设置根目录
    }
  }
}
```
