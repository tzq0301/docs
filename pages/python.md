# Python

[PyPI 软件仓库镜像使用帮助](https://help.mirrorz.org/pypi/URL_ADDRESS)

```bash
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

## uv 包/项目管理器

[uv](https://github.com/astral-sh/uv): An extremely fast Python package and project manager, written in Rust.

* 基于 pyproject.toml + uv.lock 进行依赖管理，并行安装依赖（远快于 pip 和 conda）
* 删除 .venv 文件夹即可等于删掉环境
*  不污染系统，不自动写配置，不乱改 .bashrc

```bash
uv init             # 初始化项目（生成 pyproject.toml）
uv add numpy        # 安装依赖并自动写入配置文件
uv run main.py      # 自动激活环境 + 运行代码

uv sync # 手动下载依赖

source .venv/bin/activate # 激活 uv 创建的环境，兼容传统 python 开发方式
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

## Python 3 源码编译、安装与配置

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
