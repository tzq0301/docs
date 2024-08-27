# Redis

## 编译 Redis 源码

```bash
URL=https://download.redis.io/redis-stable.tar.gz

wget "$URL"

tar xf "$(basename "$URL")"

cd "$(basename -s .tar.gz "$URL")"

make
# make CFLAGS="-static" LDFLAGS="-static"

sudo make install
```

## 运行 Redis

```bash
redis-server redis.cnf
```

redis.cnf:

```
# 端口
port 7000

# 后台进程（默认为 no）
daemonize yes

# 工作目录（例如 dump.rdb 保存的位置）
dir /home/hello/redis-server/redis-7000
```
