# require.context 创建模块上下文

1. require.context 创建模块上下文 【入参不能使用变量， 必须是字面量(】

参数： 要搜索的文件夹目录 是否还应该搜索它的子目录 以及一个匹配文件的正则表达式。
```js
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

```js
require.context("./test", false, /\.test\.js$/);
//（创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以 `.test.js` 结尾的、能被 require 请求到的文件的上下文。

require.context("../", true, /\.stories\.js$/);
//（创建了）一个包含了父级文件夹（包含子目录）下面，所有文件名以 `.stories.js` 结尾的文件的上下文
```