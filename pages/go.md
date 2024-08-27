# Go

```bash
# 若不强制指定 CGO_ENABLED=0 ，那么当遇到类似 net.LookupHost 的函数时，Go 编译器可能会选择 CGO 的实现，最终编译出来的产物就是 dynamically linked 了
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build main.go
```

## Install

```bash
if [ "$(uname -m)" = "x86_64" ]; then
    ARCH="amd64"
else
    ARCH="arm64"
fi

VERSION=1.22.5

URL="http://mirror.nju.edu.cn/golang/go$VERSION.linux-$ARCH.tar.gz"  # http://mirror.nju.edu.cn/golang/

GOROOT=/opt/go$VERSION

sudo mkdir -p "$GOROOT"

wget "$URL"

tar xf "$(basename "$URL")" -C "$GOROOT" --strip-components=1

tee -a "$HOME/.profile" <<EOF
export GOROOT="$GOROOT"
export GOPATH="\$HOME/go"

export PATH=\$GOROOT/bin:\$GOPATH/bin:\$PATH

EOF

source "$HOME/.profile"

go version

go env -w GO111MODULE=on
go env -w GOPROXY="https://repo.nju.edu.cn/repository/go/,direct"  # 设置代理

go env | grep -E "GO111MODULE|GOPROXY"
```

## Data Race Detector

[go.dev/doc/articles/race_detector](https://go.dev/doc/articles/race_detector)

```bash
go test -race mypkg     # to test the package
go run -race mysrc.go   # to run the source file
go build -race mycmd    # to build the command
go install -race mypkg  # to install the package
```

## Library

* [google/safetext](https://github.com/google/safetext) 防止 yaml 注入和 shell 注入，用于替代 `text/template`
* [google/safeopen](https://github.com/google/safeopen) 防止路径遍历攻击（例如：指定一个受信任的根目录后，文件操作不能超过该目录）
* [google/safearchive](https://github.com/google/safearchive) 防止路径遍历攻击和处理归档文件相关的攻击（例如 `./././././etc/cron.daily/cronjob`），支持跳过特殊文件、净化文件名、防止通过符号链接进行遍历等
* [uber-go/automaxprocs](https://github.com/uber-go/automaxprocs) 读取 CGroup 值，以识别容器的 CPU quota，计算得到实际核心数，并自动设置 `GOMAXPROCS` 的值
