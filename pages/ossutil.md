# ossutil

[ossutil](https://help.aliyun.com/zh/oss/developer-reference/overview-59) 支持通过 Windows、Linux 和 macOS 系统以命令行方式管理 OSS 数据

```bash
export OSS_BUCKET=

upload() {
  ossutil cp "$1" "oss://$OSS_BUCKET/$(basename $1)"
}

download() {
  ossutil cp "oss://$OSS_BUCKET/$(basename $1)" "$1"
}
```

## 安装 ossutil

```bash
if [ "$(uname -m)" = "x86_64" ]; then
    ARCH="amd64"
else
    ARCH="arm64"
fi

# https://help.aliyun.com/zh/oss/developer-reference/install-ossutil
URL="https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-linux-$ARCH.zip"

OSSUTIL_DIR=/opt/ossutil

wget "$URL"

unzip "$(basename $URL)"

sudo mv "$(basename -s .zip $URL)" "$OSSUTIL_DIR"

sudo tee -a "$HOME/.profile" <<EOF
# ossutil
export PATH=$OSSUTIL_DIR:\$PATH

EOF

source "$HOME/.profile"

ossutil --version
```

## 配置 ossutil

```bash
OSSUTIL_CONFIG="$HOME/.ossutilconfig"

if [[ -f "$OSSUTIL_CONFIG" ]]; then
  echo "$OSSUTIL_CONFIG already exists"
  exit 1
fi

ENDPOINT=
AK_ID=
AK_SECRET=

tee "$OSSUTIL_CONFIG" <<EOF
[Credentials]
language=EN
endpoint=$ENDPOINT
accessKeyID=$AK_ID
accessKeySecret=$AK_SECRET

EOF
```
