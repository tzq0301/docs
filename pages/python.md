# Python

## 配置 pip 镜像源

[PyPI 软件仓库镜像使用帮助](https://help.mirrorz.org/pypi/URL_ADDRESS)

```bash
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

## Python 虚拟环境

```bash
sudo apt install -y python3-venv
```

```bash
python3 -m venv "$PWD/.venv"
source "$PWD/.venv/bin/activate"
```

## Python 离线部署

收集依赖信息：

```bash
pip3 freeze > requirements.txt
```

将 requirements.txt 中的依赖下载到 packages 文件夹中：

```bash
pip3 download -r requirements.txt -d $PWD/packages
```

离线部署时，安装 packages 中的包：

```bash
pip3 install --no-index --find-links=$PWD/packages -r requirements.txt
```

## 编译 Python 3 源码，安装 Python 3，并配置为默认 Python Interpreter


安装编译 Python 源码所需要的组件：

```bash
apt-get install wget build-essential libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev liblzma-dev -y
```

在 [Python 官方下载页面](https://www.python.org/downloads/source/)中，找一个 Gzipped source tarball 的 Python 发行版，并“复制链接地址”（或者在[华为云镜像站](https://link.zhihu.com/?target=https%3A//mirrors.huaweicloud.com/python/)找一个），进行下载并安装：

```bash
# 下载 Python 源码（找 .tgz 后缀的）
URL=你的链接  # URL=https://mirrors.huaweicloud.com/python/3.12.3/Python-3.12.3.tgz
wget $URL

# 解压下载的压缩包
tar zxvf $(basename "$URL")

# 进入目录
cd $(basename "$URL" .tgz)

# 编译源码，并进行安装
./configure --enable-optimizations
sudo make altinstall  # 默认安装在 /usr/bin；如果不想覆盖默认的 Python，可以使用 altinstall 将 Python 安装在 /usr/local/bin
```

查看 /usr/local/bin 目录下的 Python 解释器，选择一个，将其设置为默认的 Python 解释器

```bash
ls /usr/local/bin/python*  # 查看可选的 Python 解释器
PY=                        # 从上一步显示的若干个 Python 解释器中，选择一个，设置为 PY 临时环境变量，例如 PY=/usr/local/bin/python3.12

sudo update-alternatives --install /usr/bin/python  python  $PY 1  # 设置为默认的 Python 解释器
sudo update-alternatives --install /usr/bin/python3 python3 $PY 1  # 设置为默认的 Python 3 解释器

# 校验是否配置成功
python -V
python3 -V
python3 -m pip -V  # pip3 -V
```
