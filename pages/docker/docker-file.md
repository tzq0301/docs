# Dockerfile

## Go 语言

```dockerfile
# syntax=docker/dockerfile:1

# Build the application from source
FROM golang:1.22 AS build-stage
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /main

# Run the tests in the container
FROM build-stage AS run-test-stage
RUN go test -v ./...

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage
WORKDIR /
COPY --from=build-stage /main /main
# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/reference/dockerfile/#expose
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/main"]
```

## 多阶段构建：编译、导出产物

```dockerfile
# build-stage

FROM alpinelinux/build-base AS build-stage

USER root

WORKDIR /build

VOLUME /build/chrony/build/bin

VOLUME /build/chrony/build/sbin

COPY . .

# 使用国内的镜像源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

RUN apk add --no-cache bash bison asciidoctor

RUN bash build.sh

# export-stage

FROM scratch AS export-stage

COPY --from=build-stage /build/chrony/build/bin/chronyc  /

COPY --from=build-stage /build/chrony/build/sbin/chronyd /

```

运行以下命令可将产物（上述 Dockerfile 的最后两行）导出到 out 目录：

```bash
docker build -o out .
```

运行以下命令可进行多架构的构建，最终将产物（上述 Dockerfile 的最后两行）分别导出到 out 目录下的、以架构命名的目录：

```bash
docker build -o out --platform linux/amd64,linux/arm64 .

tree out
# out
# ├── linux_amd64
# │   ├── chronyc
# │   └── chronyd
# └── linux_arm64
#     ├── chronyc
#     └── chronyd
```

## Alpine 镜像源

```dockerfile
FROM alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

RUN apk update && \
    apk add --no-cache bash

ENTRYPOINT [ "bash", "-c", "ls" ]
```

## Ubuntu 镜像源

```dockerfile
FROM ubuntu

RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g  /etc/apt/sources.list && \
    sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list && \
    sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g  /etc/apt/sources.list.d/ubuntu.sources && \
    sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list.d/ubuntu.sources

# RUN apt update  -q -y && \
#     apt install -q -y --no-install-recommends make

# RUN apt update  -q -y && \
#     apt install -q -y --no-install-recommends make && \
#     rm -rf /var/lib/apt/lists/*  # remove cached data that might endup in your image

RUN apt-get update && apt-get install --no-install-recommends -y \
  bzr \
  cvs \
  git \
  make \
  mercurial \
  subversion \
  && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "make", "--version" ]
```
