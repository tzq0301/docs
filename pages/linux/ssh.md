# ssh

## ssh 远程执行脚本

```bash
ssh $UserName@$IP 'bash' < $SHELL_FILEPATH

# -s 后面可以跟 Shell 文件所需要的参数
ssh $UserName@$IP 'bash -s 1 2 abc' < $SHELL_FILEPATH

ssh $UserName@$IP 'bash' <<EOF
echo 1
echo 2
EOF
```

## 生成 ssh 密钥

默认会生成（1）公钥文件 ~/.ssh/id_rsa.pub（2）私钥文件 ~/.ssh/id_rsa

```bash
ssh-keygen -t ed25519 -a 100 -N "" -C "$USER@"$(hostname)"" -f "$HOME/.ssh/id_rsa" -q
```

生成密钥以后，建议修改它们的权限，防止其他人读取：

```bash
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa.pub
```

可以 copy 公钥，放到 GitHub / GitLab 等代码仓库上：

```bash
cat "$HOME/.ssh/id_rsa.pub" | pbcopy
```

或者直接 copy 到远程主机：

```bash
ssh-copy-id $RemoteUserName@$RemoteIP
```

## ssh 连接远程服务器

```bash
UserName=
UserPwd=
Host=
sshpass -p $UserPwd ssh $UserName@$Host
```

## ssh 免密登录

将本机的 `~/.ssh/id_rsa.pub` 公钥追加到远程服务器的 `~/.ssh/authorized_keys`

```bash
UserName=
UserPwd=
IP=
sshpass -p $UserPwd ssh-copy-id $UserName@$IP
```

## 测试是否能 ssh 到服务器

```bash
host=
username=
(ssh "$username@$host" -o StrictHostKeyChecking=accept-new true &> /dev/null && echo "ssh connection ok for host: $host") || (echo "fail for host: $host" && exit 1)
```

## WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!

如果服务器的密钥发生变更（比如重装了 SSH 服务器、有人恶意冒充远程主机），客户端再次连接时，就会发生公钥指纹不吻合的情况，这时，客户端就会中断连接，并显示警告信息

如果新的公钥确认可以信任，需要继续执行连接，你可以执行下面的命令，将原来的公钥指纹从 `~/.ssh/known_hosts` 文件删除

```bash
HOSTNAME=发生公钥变更的主机名
ssh-keygen -R $HOSTNAME
```
