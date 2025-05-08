# zsh

安装 [zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

```bash
sudo apt install zsh -y  # Debian
brew install zsh         # macOS
```

安装 [Oh My Zsh](https://ohmyz.sh/#install)

```bash
sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"
# sh -c "$(wget -O- https://gitee.com/pocmon/mirrors/raw/master/tools/install.sh)"
# sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

配置 oh-my-zsh 的[主题](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)，默认为 robbyrussell，可以配置为 bira（双行）

[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md) 语法高亮

[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md) 根据历史记录和完成情况进行提示
