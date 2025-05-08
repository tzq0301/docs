# Debian

## Debian 12 配置 static IP

通过以下命令，找到一个网卡名称（例如 `enp0s1`，`inet 192.168.64.3 ... dynamic ...`）

```bash
ip addr
```

然后，编辑 `/etc/network/interfaces` 文件：

```bash
sudo vim /etc/network/interfaces
```

加入以下内容：

```bash
auto enp0s1               # enp0s1 从 ip addr 查出来
iface enp0s1 inet static  # enp0s1 从 ip addr 查出来
address 192.168.64.100    # 自己选的静态 IP
netmask 255.255.255.0
gateway 192.168.64.1
dns-nameservers 8.8.8.8   # 一定要配这个，不要忽略
```

重启 networking 服务即可：

```bash
sudo systemctl restart networking.server
```

再次 `ip addr` 查看是否配置生效
