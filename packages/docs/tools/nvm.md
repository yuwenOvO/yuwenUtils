---
outline: deep
---

# NVM

nvm（Node Version Manager）是一个用于管理多个 Node.js 版本的工具。它可以让您在同一台计算机上安装和使用多个 Node.js 版本，并轻松地在这些版本之间切换。nvm 还支持在不同的项目中使用不同的 Node.js 版本，以满足不同项目的需求。

## 安装 nvm

```shell
# 使用 cURL 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 使用 Wget 安装 nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

::: tip

安装完成后，需要运行 `source ~/.bashrc` 以使 nvm 命令生效。

:::

## 使用 nvm

### 查看 Node.js 版本列表

```shell
nvm ls-remote
```

### 安装指定 Node.js 版本

```shell
nvm install 'xx.xx.xx'
```

### 查看已安装的 Node.js 版本

```shell
nvm ls
```

### 切换指定 Node.js 版本

```shell
nvm use 'xx.xx.xx'
```

### 设置默认 Node.js 版本

```shell
nvm alias default 'xx.xx.xx'
```

### 卸载指定 Node.js 版本

```shell
nvm uninstall 'xx.xx.xx'
```
