# Visual Studio Code

## 【配置 task】打开文件夹时，自动 git pull

在 `.vscode/tasks.json` 中添加：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "shell",
            "problemMatcher": [],
            "label": "git pull",
            "command": "git pull",
            "runOptions": {
                "runOn": "folderOpen"
            }
        }
    ]
}
```
