---
outline: deep
---

# PostgreSQL

PostgreSQL 是一个开源的关系型数据库管理系统，以其强大的功能和灵活性而闻名。它支持多种数据类型、复杂查询、事务处理和并发控制，广泛应用于各种规模的应用程序。

## 安装

### 添加 APT 源

```shell
# 参考 https://www.postgresql.org/download/linux/ubuntu
# 导入存储库签名密钥：
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc

. /etc/os-release
sudo sh -c "echo 'deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $VERSION_CODENAME-pgdg main' > /etc/apt/sources.list.d/pgdg.list"

sudo apt update
```

### 安装 PostgreSQL

```shell
sudo apt -y install postgresql
```

### 配置 PostgreSQL

#### 启动 PostgreSQL

```shell
sudo systemctl start postgresql
```

#### 重启 PostgreSQL

```shell
sudo systemctl restart postgresql
```

#### 停止 PostgreSQL

```shell
sudo systemctl stop postgresql
```

#### 设置 PostgreSQL 开机自启

```shell
sudo systemctl enable postgresql
```

#### 查看 PostgreSQL 状态

```shell
sudo systemctl status postgresql
```

#### 登录 PostgreSQL

```shell
sudo -u postgres psql
```

#### 修改 PostgreSQL 端口

```shell
# 编辑 PostgreSQL 配置文件
sudo vim /etc/postgresql/你安装的版本号/main/postgresql.conf
```

在配置文件中找到 `port` 选项，修改为你需要的端口号，例如：

```txt
port = 5432
```

保存并退出，然后重启 PostgreSQL 服务使更改生效

#### 修改 PostgreSQL 认证方式

```shell
# 编辑 PostgreSQL 认证配置文件
sudo vim /etc/postgresql/你安装的版本号/main/pg_hba.conf
```

在文件中找到以下行：

```txt
# "local" is for Unix domain socket connections only
local   all             postgres                                peer
```

将 `peer` 修改为 `scram-sha-256`，使其看起来像这样：

```txt
# "local" is for Unix domain socket connections only
local   all             postgres                                scram-sha-256
```

保存并退出，然后重启 PostgreSQL 服务使更改生效。

#### 修改 PostgreSQL 密码

```shell
# 登录 PostgreSQL
sudo -u postgres psql

# 修改密码
ALTER USER postgres WITH PASSWORD '密码';
```

#### 创建新用户

```shell
# 登录 PostgreSQL
sudo -u postgres psql
# 创建新用户
CREATE USER 用户名 WITH PASSWORD '密码';
# 授予新用户基本读写权限
GRANT CONNECT ON DATABASE 数据库名 TO 用户名;
GRANT USAGE ON SCHEMA public TO 用户名;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO 用户名;
# 授予新用户完整数据库所有权（谨慎使用）
ALTER DATABASE 数据库名 OWNER TO 用户名;
# 授予新用户特定表权限
GRANT SELECT ON TABLE 表名 TO 用户名;
# 授予新用户创建库权限
GRANT CREATE ON DATABASE 数据库名 TO 用户名;
# 验证用户
\du # 查看用户列表
\l # 查看数据库列表及其所有者

# 退出 PostgreSQL
\q

# 使用新用户连接测试
psql -U 用户名 -d 数据库名 -h localhost -p 你配置的端口号(默认5432)
```

#### 配置 PostgreSQL 远程访问

```shell
# 编辑 PostgreSQL 配置文件
sudo vim /etc/postgresql/你安装的版本号/main/postgresql.conf
```

在配置文件中找到 `listen_addresses` 选项，修改为：

```txt
listen_addresses = '*' # 或者指定特定的IP地址
```

```shell
# 编辑 PostgreSQL 认证配置文件
sudo vim /etc/postgresql/你安装的版本号/main/pg_hba.conf
```

在文件中添加以下行以允许远程访问：

```txt
# 允许所有IP地址的用户使用密码认证
host all all 0.0.0.0/0 password
# 或者指定特定的IP地址
host all all 192.168.1.100/32 password
```

保存并退出，然后重启 PostgreSQL 服务使更改生效。

```shell
sudo systemctl restart postgresql
```
