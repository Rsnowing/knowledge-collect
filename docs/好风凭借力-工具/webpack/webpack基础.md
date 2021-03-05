# webpack 基础

## 资源模块
资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

在webpack5之前通常使用：
* raw-loader 将文件导入为字符串
* url-loader 将文件作为 data URI 内联到 bundle 中
* file-loader 将文件发送到输出目录

webpack5中资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
* asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
* asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
* asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
* asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

### 资源内联（inlining resouce）
> 资源内联（inline resource），就是将一个资源以内联的方式嵌入进另一个资源里面.
#### 资源内联的意义



## loader
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件.

### 使用loader
3种方式
* 配置(推荐): 在 webpack.config.js 文件中指定 loader。
* 内联：在每个 import 语句中显式指定 loader。
* CLI：在 shell 命令中指定它们。
#### 1. 配置方式
module.rules 允许你在 webpack 配置中指定多个 loader。 这是展示 loader 的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 loader 有个全局概览：
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    }
  ]
}
```
#### 2. 内联
可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 `!` 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析
```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```
> 尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

#### 3. CLI
也可以通过 CLI 使用 loader：
```js
// 这会对 .jade 文件使用 jade-loader，对 .css 文件使用 style-loader 和 css-loader。
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```
### loader特性
* loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 
loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
* loader 可以是同步的，也可以是异步的。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于对 loader 传递配置。
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

## Hot Module Replacement 热更新 HMR


## 参考链接
* [loader | webpack 中文网](https://www.webpackjs.com/concepts/loaders/#configuration)
* [loaders | 常用loader](https://www.webpackjs.com/loaders/#%E6%A0%B7%E5%BC%8F)