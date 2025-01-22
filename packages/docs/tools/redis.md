---
outline: deep
---

# Redis

Redis 是一个开源的内存数据库，支持多种数据结构，如字符串、哈希、列表、集合、有序集合等。Redis 以其高性能、高可用、高扩展性等特点，被广泛应用于缓存、消息队列、会话管理、实时排行榜、数据分析等场景。

## 安装

### 查看系统版本

```shell
lsb_release -a
```

### 更新 APT 软件包列表

```shell
sudo apt update

sudo apt upgrade -y
```

### 将 Redis APT 源添加到系统

```shell
# 安装必要的工具
sudo apt install lsb-release curl gpg

# 下载 Redis 的 GPG 密钥
sudo curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

# 更新权限
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg

# 添加 Redis APT 源
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
```

### 安装 Redis

```shell
sudo apt update
sudo apt install redis
```

## 配置

### 启动 Redis

```shell
sudo systemctl start redis-server
```

### 重启 Redis

```shell
sudo systemctl restart redis-server
```

### 停止 Redis

```shell
sudo systemctl stop redis-server
```

### 设置 Redis 开机自启

```shell
sudo systemctl enable redis-server
```

### 查看 Redis 状态

```shell
sudo systemctl status redis-server
```

### 登录 Redis

```shell
redis-cli
```

### 修改 Redis 端口

```shell
# 编辑 Redis 配置文件
sudo vim /etc/redis/redis.conf
```

在配置文件中找到 `port` 配置项，修改为指定的端口号，保存并退出。重启 Redis 服务。

### 修改 Redis 密码

```shell
# 编辑 Redis 配置文件
sudo vim /etc/redis/redis.conf
```

在配置文件中找到 `requirepass` 配置项，取消注释并设置密码，保存并退出。重启 Redis 服务。

### 开启 Redis 远程访问

```shell
# 编辑 Redis 配置文件
sudo vim /etc/redis/redis.conf
```

找到 `bind 127.0.0.1` 配置项，将这一行注释掉，保存并退出。重启 Redis 服务。
