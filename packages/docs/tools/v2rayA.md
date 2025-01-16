---
outline: deep
---

# V2RayA

V2RayA 是一个基于 V2Ray 内核的图形化客户端，支持 Windows、macOS 和 Linux。

> 参考：[V2RayA 官方网站](https://v2raya.org/)

## 安装 V2RayA

```shell
sudo docker pull mzz2017/v2raya
```

## 启动 V2RayA

```shell
sudo docker run -d \
  --restart=always \
  --privileged \
  --network=host \
  --name v2raya \
  -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
  -e V2RAYA_V2RAY_BIN=/usr/local/bin/v2ray \
  -e V2RAYA_NFTABLES_SUPPORT=off \
  -e IPTABLES_MODE=legacy \
  -v /lib/modules:/lib/modules:ro \
  -v /etc/resolv.conf:/etc/resolv.conf \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2raya
```

::: tip

- `--privileged`：提供容器内核模块访问权限
- `--network=host`：使用主机网络
- `-e V2RAYA_LOG_FILE=/tmp/v2raya.log`：设置日志文件路径
- `-e V2RAYA_V2RAY_BIN=/usr/local/bin/v2ray`：设置 V2Ray 可执行文件路径
- `-e V2RAYA_NFTABLES_SUPPORT=off`：关闭 nftables 支持
- `-e IPTABLES_MODE=legacy`：设置 iptables 模式为 legacy
- `-v /lib/modules:/lib/modules:ro`：挂载内核模块
- `-v /etc/resolv.conf:/etc/resolv.conf`：挂载 DNS 配置文件
- `-v /etc/v2raya:/etc/v2raya`：挂载 V2RayA 配置文件
- `mzz2017/v2raya`：V2RayA 镜像名称

:::
