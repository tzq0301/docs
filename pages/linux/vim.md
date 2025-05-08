# Vim

## 执行 Unix 命令

按下 `Esc` 返回命令模式，`:!unix_command` 即可

## 处理中文乱码

```bash
tee -a ~/.vimrc <<EOF
set encoding=utf-8
EOF
```
