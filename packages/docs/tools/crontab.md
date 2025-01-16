---
outline: deep
---

# Crontab

Crontab 是一个用于周期性执行任务的工具，可以在固定的时间、日期、间隔等条件下执行指定的命令或脚本。Crontab 是 Linux 系统中的一个重要工具，可以用于定时备份、定时清理、定时监控等任务。

## Crontab 语法

Crontab 的语法格式如下：

```shell
# ┌───────────── 分钟（0 - 59）
# │ ┌───────────── 小时（0 - 23）
# │ │ ┌───────────── 日期（1 - 31）
# │ │ │ ┌───────────── 月份（1 - 12）
# │ │ │ │ ┌───────────── 星期（0 - 7，0 和 7 都代表星期天）
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command
```

- `*`：代表任意值，比如 `*` 代表每分钟、每小时、每天、每月、每周
- `,`：代表分隔符，比如 `1,3,5` 代表 1、3、5
- `-`：代表范围，比如 `1-5` 代表 1 到 5
- `/`：代表步长，比如 `*/2` 代表每 2
- `0` 代表星期天，`7` 也代表星期天
- `command`：代表要执行的命令或脚本

## Crontab 命令

### 查看 Crontab 任务

```shell
sudo crontab -l
```

### 编辑 Crontab 任务

```shell
sudo crontab -e
```

### 删除所有 Crontab 任务

```shell
sudo crontab -r
```

::: tip

如果仅要删除一个任务，可以使用 `sudo crontab -e` 命令编辑 Crontab 任务，然后删除对应的任务即可。

:::

### 为其他用户添加 Crontab 任务

```shell
sudo crontab -u username -e
```

::: tip

`username` 为要添加任务的用户名。

:::

### 启动 Crontab 服务

```shell
sudo service cron start
```

### 停止 Crontab 服务

```shell
sudo service cron stop
```

### 重启 Crontab 服务

```shell
sudo service cron restart
```

### 查看 Crontab 服务状态

```shell
sudo service cron status
```

### 查看 Crontab 日志

```shell
sudo grep CRON /var/log/syslog
```

## Crontab 示例

### 每天凌晨 2 点执行备份脚本

```shell
0 2 * * * /bin/bash /path/to/backup.sh
```

### 每周一凌晨 3 点执行清理脚本

```shell
0 3 * * 1 /bin/bash /path/to/clean.sh
```

### 定时拉取 Git 仓库

```shell
* */6 * * * '你的脚本地址' > '日志文件地址' 2>&1
```
