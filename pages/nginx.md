# Nginx

## 校验 Nginx 配置文件正确性

```bash
nginx -t
```

## 重新加载 Nginx 配置文件

```bash
nginx -s reload
```

## 示例：配置文件 nginx.conf

```nginx
# 帮助限制 Nginx 进程的权限，从而减少系统遭受恶意攻击的风险
# 通常，出于安全考虑，推荐不使用 root 用户运行网络服务
# user <username> [groupname];

# 设置 Nginx 将启动的工作进程数目（默认为 1）
# worker_processes 7;     # 可以填数字
# worker_processes auto;  # auto 代表设置为 CPU 核数

events {
    # 根据系统的文件描述符限制来配置
    # 每个工作进程的最大连接数不应超过系统允许单个进程打开的文件描述符数量，可以通过 ulimit -n 命令查看或设置这个限制
    # worker_connections 1024;
}

http {
    # include /etc/nginx/mime.types; # 能根据文件的扩展名来设置 HTTP 的 Content-Type

    # 引入所有 .conf 文件
    # .conf 文件包含 server 块，可以用于文件的分离
    # include /etc/nginx/conf.d/*.conf;

    # upstream 用于配制服务器集群
    # backend-servers 可以替换为别的名字，该配置将在 server 块的 proxy_pass 中被使用
    upstream backend-servers {
        # ip-hash

        server localhost:3000;
        server localhost:3001;

        # 可以为不同性能的服务器设置不同的权重
        # server localhost:3000 weight=3;
        # server localhost:3001 weight=7;
    }

    server {
        listen 80;
        server_name localhost;

        # 静态文件的根目录
        # root /var/www/localhost; 

        # 设置默认的 index 页
        # index index.html;

        # 配置 HTTPS 的默认访问端口为 443
        # 如果未在此处配置HTTPS的默认访问端口，可能会造成 Nginx 无法启动
        # listen 443 ssl;
        # ssl_certificate cert/cert-file-name.pem;      # 修改为自己的 pem 的路径
        # ssl_certificate_key cert/cert-file-name.key;  # 修改为自己的 key 的路径
        # ssl_session_timeout 5m;
        # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  # 表示使用的加密套件的类型
        # ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;                                                    # 表示使用的TLS协议的类型，您需要自行评估是否配置 TLSv1.1 协议
        # ssl_prefer_server_ciphers on;

        location / {
            proxy_pass http://backend-servers; # backend-servers 为上面配置的一个 upstream 服务器集群的名字
        }

        # DNS 解析
        # resolver 8.8.8.8;          # Google 公司的 DNS
        # resolver 114.114.114.114;  # 中国移动用的 DNS
    }
}
```

## 示例：docker-compose.yaml

```yaml
version: "3"

services:
  gateway:
    image: nginx:latest
    entrypoint:
      - sh
      - -euc
      - |
        cat <<EOF > /etc/nginx/nginx.conf
        user  nginx;
        worker_processes  5;  ## Default: 1

        events {
          worker_connections   1000;
        }

        http {
          resolver 127.0.0.11;

          server {
            listen             3100;

            location = / {
              return 200 'OK';
              auth_basic off;
            }

            location = /api/prom/push {
              proxy_pass       http://write:3100\$$request_uri;
            }

            location = /api/prom/tail {
              proxy_pass       http://read:3100\$$request_uri;
              proxy_set_header Upgrade \$$http_upgrade;
              proxy_set_header Connection "upgrade";
            }

            location ~ /api/prom/.* {
              proxy_pass       http://read:3100\$$request_uri;
            }

            location = /loki/api/v1/push {
              proxy_pass       http://write:3100\$$request_uri;
            }

            location = /loki/api/v1/tail {
              proxy_pass       http://read:3100\$$request_uri;
              proxy_set_header Upgrade \$$http_upgrade;
              proxy_set_header Connection "upgrade";
            }

            location ~ /loki/api/.* {
              proxy_pass       http://read:3100\$$request_uri;
            }
          }
        }
        EOF
        /docker-entrypoint.sh nginx -g "daemon off;"
    ports:
      - "3100:3100"
    healthcheck:
      test: ["CMD", "service", "nginx", "status"]
      interval: 10s
      timeout: 5s
      retries: 5
```