# Git

## git config

```bash
git config --global core.editor vim

git config --global user.name  John Doe
git config --global user.email johndoe@example.com

git config --global pull.rebase true

git config --global init.defaultBranch main

git config --global http.proxy  'http://127.0.0.1:7890'
git config --global https.proxy 'http://127.0.0.1:7890'
```

检查配置：

```bash
git config --list
```

## git commit

```bash
git commit --amend --no-edit  # --amend 不修改 commit message
```

## git log

```bash
git log --oneline  # 一行显示一个 commit 信息
```

## git rev-parse

```bash
git rev-parse         HEAD  #         commit id
git rev-parse --short HEAD  # shorter commit id

git rev-parse --abbrev-ref HEAD  # 当前 branch

git rev-parse --show-toplevel  # 当前 git 根目录
```

## 示例：.gitignore

```text
.idea/
.fleat/
.vscode/
.settings/

.DS_Store
.AppleDouble
.LSOverride
Icon
.Spotlight-V100
.Trashes

Thumbs.db
ehthumbs.db
Desktop.ini

*.log

*.sqlite
*.db

*.war
*.jar
*.class
*.exe
*.exe~
*.out
*.o
*.so
*.ddl
*.dylib

*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

target/
out/
build/

go.work
*.test
*.prof
vendor/
*.out
```

添加后，gitignore 可能不会生效，此时运行以下命令：

```bash
git rm -rf --cached .
git add -A
```
