# JavaScript

```bash
npm  config set registry https://registry.npmmirror.com
yarn config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com
```

## TypeScript

* [Download TypeScript](https://www.typescriptlang.org/download/)
* [ts-node](https://nodejs.org/en/learn/typescript/run)

```bash
# 安装 TypeScript
npm install typescript --save-dev

# 验证安装成功
npx tsc --version

# 安装 TypeScript Runner
npm i -D ts-node

# 运行 index.ts 文件
npx ts-node index.ts
```

## 破解网页不可粘贴内容等限制

```js
var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
```
