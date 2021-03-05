### chalk

chalk包的左右时修改控制台中字符串的样式,包括:
字体样式（加粗，隐藏等）、字体颜色、背景颜色

```
const chalk = require('chalk')
console.log(chalk.blue('Hello world!'))
console.log(chalk.bold.red('Hello world!'))
```

### 获取当前执行路径

```js
__dirname     获得当前执行文件所在目录的完整目录名
__filename    获得当前执行文件的带有完整绝对路径的文件名
process.cwd() 获得当前执行node命令时候的文件夹目录名 
./            文件所在目录
// process.cwd()是程序的执行路径，__filename和_dirname是js文件有的属性
// demo
console.log(process.execPath)
console.log(__dirname)
console.log(process.cwd())
```

### 命令行参数获取

```js
1. process.argv
node .\src\tiny.js -f hhh
console.log(process.argv)
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\code\\my\\anxin-tiny\\src\\tiny.js',
  '-f',
  'hhh'
] -f
```

```js
2. commander
npm i -S commander
// 使用
const { program } = require('commander')
program
  .version(tinyPackage.version, '-v, --version', '获取版本')
  .option('-f, --force', '是否覆盖')
  .option('-i, --imgs [imgs...]', '自定义想要压缩的图片img')
  // .requiredOption('-f, --force', 'force must have cheese')
  .parse(process.argv)、

console.log(program.opts())
// 执行 node .\src\tiny.js --imgs a b c
console.log(program.opts()) // { version: '1.0.0', force: undefined, imgs: [ 'a', 'b', 'c' ] }
```

### 用户交互 -inquirer

```js
// 交互式命令行工具
npm install inquirer

```

### 杂七杂八

```js
1. 获取文件大小
buffer.length
fs.statSync(filePath).size
2. 获取父级目录 path.resolve(process.execPath, '..')

// zl9LZpmhHsvYzTSTWBNFLrst9N4Lt0SZ

3. package.json 中 bin: 可以让执行自定义的快捷命令，全局安装后可直接使用
file: 当你的包作为依赖被安装时所包含的文件(需要上传到npm的源代码)
types: 编译的JavaScript文件对应的类型声明文件
4.  src/tiny.ts --resolveJsonModule --outDir dist 
5. path.join()将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径
path.join('/目录1', '目录2', '目录3/目录4', '目录5', '..');
// 返回: '/目录1/目录2/目录3/目录4'
```

### 使用ts改造代码

```js
1. ts中引入json文件： 在tsconfig.json中配置 
"compilerOptions": {
      "resolveJsonModule": true,
  }
 2. node内置模块使用import导入 npm i @types/node -D
 3. 编译typescript
```

### 进度条

```js
如何进度条固定： https://www.coder.work/article/1386315
progress
```



### 提交规范

> feat: 表示新增了一个功能
>
> fix: 表示修复了一个 bug
>
> docs: 表示只修改了文档
>
> style: 表示修改格式、书写错误、空格等不影响代码逻辑的操作
>
> refactor: 表示修改的代码不是新增功能也不是修改 bug，比如代码重构
>
> perf: 表示修改了提升性能的代码
>
> test: 表示修改了测试代码
>
> build: 表示修改了编译配置文件
>
> chore: 无 src 或 test 的操作
>
> revert: 回滚操作

### npm 发布相关

> 包名格式 XXX-XXX
> npm login
> 删除包之后24小时之后才能重新发布相同包名的包

### 参考资料

> [手把手教你用node撸一个图片压缩工具](https://juejin.im/post/5bd350a76fb9a05d2d02697c)
> [require() 源码解读-阮一峰](http://www.ruanyifeng.com/blog/2015/05/require.html)
> [segmentfault-https请求tinypng](https://segmentfault.com/a/1190000015467084)
> [commanderjs-tj大神](https://github.com/tj/commander.js)
> [从零实现Node.js命令行工具](https://zhuanlan.zhihu.com/p/91338826)
>
> [让 babel 帮你编译 typescript](https://github.com/frontend9/fe9-library/issues/23)
> [ts命令](https://www.typescriptlang.org/docs/handbook/compiler-options.html)





```js


```

