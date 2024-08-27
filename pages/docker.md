# Docker

* [alpine](https://hub.docker.com/_/alpine): 一个轻量级的 Linux 发行版，只包含了最基本的工具和库
* [alpinelinux/build-base](https://hub.docker.com/r/alpinelinux/build-base): 包含构建和编译所需的工具和库的镜像，例如 GCC、G++、Make、libc-dev 等
* distroless: 不包含任何包管理工具或 shell，提高容器安全性
* busybox: 一个精简的 Linux 工具箱，包含了数百个常用的 Linux 命令，例如 ls、cp、cat、rm 等
* scratch: 一个空镜像，它不包含任何文件，因此无法运行任何应用程序，常用于作为基础镜像来构建产物

```bash
docker run --rm $(docker build . -q)

docker save -o helloworld.tar hello-world:1.0.0
docker load -i helloworld.tar

docker save hello-world:1.0.0 | gzip > helloworld.tar.gz  # gzip 压缩
docker load < helloworld.tar.gz

docker buildx build \
  --platform linux/amd64,linux/arm64 \  # 参考 https://github.com/docker-library/official-images#architectures-other-than-amd64
  -t YOUR_IMAGENAME:YOUT_IMAGE_TAG \
  --push \                              # 构建完就 push（如果只想 build、不想 push，就去掉 --push）
  $PWD                                  # Dockerfile 所在的文件夹
```

## 安装 Docker (Linux)

Docker 需要前置安装 iptables

```bash
yq -V > /dev/null 2>&1 || (echo "yq 未安装，请先安装 yq" && exit 1)

# VERSION=27.0.3  # 在 https://download.docker.com/linux/static/stable/x86_64/ 中，选择一个 Docker 的版本
# wget https://download.docker.com/linux/static/stable/$(uname -m)/docker-$VERSION.tgz
# tar xf docker-$VERSION.tgz

TAR="$(curl https://download.docker.com/linux/static/stable/x86_64/ 2&>1 | grep docker | grep -v rootless | tail -n 1 | awk -F'"' '{print $2}')"
wget "https://download.docker.com/linux/static/stable/$(uname -m)/$TAR"
tar xf "$TAR"

sudo cp docker/* /usr/bin/

sudo tee /etc/systemd/system/docker.service <<EOF
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target

[Service]
Type=notify
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP \$MAINPID
LimitNOFILE=infinity
LimitNPROC=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target

EOF

sudo groupadd docker || true
sudo usermod -aG docker $USER

sudo systemctl enable docker.service

[[ -d /etc/docker ]] || sudo mkdir /etc/docker
[[ -f /etc/docker/daemon.json ]] || sudo touch /etc/docker/daemon.json

# 设置镜像源 https://github.com/DaoCloud/public-image-mirror
# 通过 cloudflare 搭建镜像教程：https://blog.csdn.net/QQ727338622/article/details/139903363、https://www.wanpeng.life/2953.html
sudo yq -i '.registry-mirrors += ["https://tzq.asia"]' /etc/docker/daemon.json

sudo systemctl daemon-reload
sudo systemctl restart docker
```

logout 再 login 即可

## 安装 Docker Buildx (Linux)

```bash
# https://github.com/docker/buildx/releases/latest
URL=https://github.com/docker/buildx/releases/download/v0.16.1/buildx-v0.16.1.linux-amd64

wget "$URL"

PLUGIN_DIR="$HOME/.docker/cli-plugins"

mkdir -p "$PLUGIN_DIR"

mv "$(basename "$URL")" "$PLUGIN_DIR"/docker-buildx

chmod +x "$PLUGIN_DIR"/docker-buildx

docker buildx install

docker buildx use "$(docker buildx create)"

docker buildx version
docker buildx ls
```
