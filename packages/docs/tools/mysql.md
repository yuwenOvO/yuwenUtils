---
outline: deep
---

# MySQL

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，其开发语言是 C 和 C++，支持多种编程语言。

## 安装

### 添加 APT 源

```shell
# 下载 MySQL APT 源安装包
wget https://dev.mysql.com/get/mysql-apt-config_0.8.33-1_all.deb

# 安装 MySQL APT 源
sudo dpkg -i mysql-apt-config_0.8.33-1_all.deb

# 更新 APT 软件包列表
sudo apt update
```

### 安装 MySQL

```shell
# 安装 MySQL
sudo apt install mysql-server
```

### 配置 MySQL

#### 启动 MySQL

```shell
sudo systemctl start mysql
```

#### 重启 MySQL

```shell
sudo systemctl restart mysql
```

#### 停止 MySQL

```shell
sudo systemctl stop mysql
```

#### 设置 MySQL 开机自启

```shell
sudo systemctl enable mysql
```

#### 查看 MySQL 状态

```shell
sudo systemctl status mysql
```

#### 登录 MySQL

```shell
sudo mysql -u root -p
```

#### 修改 MySQL 端口

```shell
# 编辑 MySQL 配置文件
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

在配置文件中找到 [mysqld] 部分，添加以下内容：

```txt
port = 3306
```

保存并退出，然后重启 MySQL 服务。

#### 修改 MySQL 密码

```shell
# 登录 MySQL
sudo mysql -u root -p

# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';

# 刷新权限
FLUSH PRIVILEGES;
```

#### 配置 MySQL 远程访问

```shell
# 登录 MySQL
sudo mysql -u root -p

# 选择 mysql 数据库
use mysql;

# 修改 root 用户的 Host
update user set host='%' where user='root';

# 刷新权限
FLUSH PRIVILEGES;
```

## 使用 navicat 配置数据库备份

1. 打开navicat客户端选择【自动运行】菜单，打开【新建批处理作业】，选择要备份的数据库

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_1.png)

2. 新建自动备份

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_2.png)

3. 保存自动备份工作并命名

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_3.png)

4. 设置任务计划

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_4.png)

5. 点击开始，可以测试设置好的自动备份

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_5.png)

6. 点击备份，可以查看刚才测试好的备份

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_6.png)

7. 选中后点击还原备份就能备份刚才的数据了

   ![Navicat 配置数据库备份](https://img.moshangl.cn/vitepress/mysql_7.png)
