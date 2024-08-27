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
