# 从0到1搭建webpack项目
## 目标
* 了解什么是webpack 为什么要使用webpack
* 配置开发模式
* 配置生产模式

## webpack4 与 webpack5 差别
1. webpack-dev-server 命令变为 webpack-serve
2. file-loader, raw-loader ， url-loader不是必须的了, 可以使用内置的assets module
...

## 什么是webpack
一个现代化的web应用，已经不是单纯地由html、css、javascript组成的，它还需要对应用进行打包、压缩和编译成浏览器能够理解的代码，于是webpack就开始流行起来了。

webpack是一个模块打包器，它可以打包任何东西。你可以在开发时使用最新的Javascript特性或Typescirpt，webpack会将它编译成浏览器支持的代码并压缩它；你还可以在Javascript中导入需要用到的静态资源。

在开发过程中，webpack提供了开发服务器并支持HMR。

...等等等等

## 开始搭建

### 安装
创建项目：
```shell
mkdir webpack-tutorial
cd webpack-tutorial
npm init -y
```

安装webpack

```shell
npm i -D webpack webpack-cli
```
* webpack 模块资源打包器
* webpack-cli webpack命令行工具

创建src/index.js
```js
// src/index.js
console.log('Interesting!')
```

### 基础配置
在根目录下新建 webpack.config.js

entry: 入口文件，webpack会首先从这里开始编译

output: 定义了打包后输出的位置，以及对应的文件名。[name]是一个占位符，这里是根据我们在entry中定义的key值, 本例中等价于'main'
```js
// webpack.config.js
const path = require('path')
module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
}
```
在package.json中配置：
```json
"scripts": {
  "build": "webpack"
}
```
运行 ` npm run build `. 可以在命令行中看到打包的结果，并且在根目录下生成了一个dist目录，说明打包成功。

### webpack plugin
插件使webpack具备可扩展性，可以让我们支持更多的功能。

#### 模板文件
当我们构建一个web app的时候，我们需要一个HTML页，然后再HTML中引入Javascript，当我们配置了打包输出的bundle文件是随机字符串时，每次手动更新就特别麻烦，所以最好的方法是可以自动将bundle打包进HTML中。

* html-webpack-plugin 从模板生成一个HTML文件

安装
```shell
npm i -D html-webpack-plugin
```
在src目录下创建 template.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```
引入插件
```js
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /* ... */

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // template file
      filename: 'index.html', // output file
    }),
  ],
}
```

#### 打包前清除dist
clean-webpack-plugin - 打包前移除/清理 打包目录

安装
```shell
yarn add clean-webpack-plugin -D
```

```js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  /* ... */

  plugins: [
    /* ... */
    new CleanWebpackPlugin(),
  ],
}
```

### webpack loader
webpack使用loaders去解析模块，webpack想要去如何理解Javascript、静态资源（图片、字体、css）、转移Typescript和Babel，都需要配置相应的loader规则。

接下来还需要做的事情：
* 将最新的Javascript特性编译成浏览器理解的
* 模块化CSS，将编译SCSS、cssnext编译成CSS
* 导入图片、字体等静态资源
* 使用Vue or React

#### Babel
Babel 是一个 JavaScript 编译器，能将 ES6 代码转为 ES5 代码，让你使用最新的语言特性而不用担心兼容性问题，并且可以通过插件机制根据需求灵活的扩展

* babel-loader - 使用Babel和webpack转译文件
* @babel/core - 转译ES2015+的代码
* @babel/preset-env babel预设class
* @babel/plugin-proposal-class-properties 编译class

```shell
npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties
```

创建.babelrc
```js
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

#### 解析图片
```js
// webpack.config.js
module.exports = {
  /* ... */
  module: {
    rules: [
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
```

#### 字体 
```js
module.exports = {
  /* ... */
  module: {
    rules: [
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
}
```

#### style
* style-loader 将模块的导出作为样式添加到 DOM 中
* css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
* less-loader 加载和转译 LESS 文件
* sass-loader 加载和转译 SASS/SCSS 文件
* postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件
* stylus-loader 加载和转译 Stylus 文件

```shell
npm i -D sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass
```
新建postcss.config.js
```js
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
  },
}
```
注意，开发环境用style-loader，但是在生产环境需要用MiniCssExtractPlugin
```js
// webpack.config.js
module.exports = {
  /* ... */
  module: {
    rules: [
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
}
```

### HMR
热更新

```shell
npm i -D webpack-dev-server
```
配置webpack.config.js
```js
// webpack.config.js
const webpack = require('webpack')

module.exports =  {
  /* ... */
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    /* ... */
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
```
配置scripts
```js
// package.json
"scripts": {
  "start": "webpack serve"
}
```
运行 npm run start 修改代码时浏览器会自动刷新


## 关于webpack你应该要了解的问题

### webpack 是什么 
webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。

### webpack与rollup有什么区别
* webpack对于`代码分割`和`静态资源`导入有着先天优势，并且支持热模块替换(HMR)，而rollup并不支持。 当项目中需要代码分割与静态资源时，首选webpack。
* rollup对于代码的Tree-shaking和ES6模块有着算法优势上的支持，若你项目只需要打包出一个简单的bundle包，并是基于ES6模块开发的，可以考虑使用rollup。(webpack从2.0开始支持Tree-shaking，并在使用babel-loader的情况下支持了es6 module的打包了)
* rollup API精简，上手简单， 目前许多库都是使用rollup来构建的，如React, Vue， Three.js, moment...

一句话总结： 开发应用使用webpack，开发js库使用rollup

### 有哪些常用的loader与plugin 有什么用处
以上搭建应用时使用的。

在脑子里想想他们的作用哈~

loader: 
* style-loader, css-loader, sass-loader, babel-loader, vue-loader...

plugin:
* clean-webpack-plugin, html-webpack-plugin, mini-css-extract-plugin...

### webpack loader与plugin有什么区别
* 相对于loader转换指定类型的模块功能，plugins能够被用于执行更广泛的任务比如打包优化、文件管理、环境注入等……
* loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
* plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

### 如何开发loader和plugin
* [Writing a Loader | webpack](https://webpack.docschina.org/contribute/writing-a-loader/)
* [Writing a Plugin | webpack](https://webpack.docschina.org/contribute/writing-a-plugin/)


### bundle chunk module
* [webpack 中那些最易混淆的 5 个知识点](https://juejin.cn/post/6844904007362674701)

### 如何进行webpack打包优化
* 使用webpack-bundle-analyzer分析哪些模块体积较大
* 按需加载组件库
* 使用mini-css-extract-plugin将css从打包后的js中分离出来
* @babel/polyfill 按需加载
* 将静态资源放在CDN上
* splitChunks
  将第三方库从主要的包中分离出来
* 混淆代码
  通过UglifyJS等工具来对js代码进行压缩，同时可以去掉不必要的空格、注释、console信息等，也可以有效的减小代码体积。

其他优化：
* 开启gzip压缩
  开启gzip压缩可以减少HTTP传输的数据量和时间，从而减少客户端请求的响应时间，由于降低了请求时间，页面的加载速度也会得到提升，会有更快的渲染速度，极大地改善了用户体验


## 参考链接
* [webpack Tutorial: How to Set Up webpack 5 From Scratch | Tania Rascia](https://www.taniarascia.com/how-to-use-webpack/)
* [[译] 同中有异的 Webpack 与 Rollup](https://juejin.cn/post/6844903473700405261)
* [第 148 题： webpack 中 loader 和 plugin 的区别是什么 · Issue #308 · Advanced-Frontend/Daily-Interview-Question · GitHub](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/308)
* [重构之路：webpack打包体积优化（超详细）](https://juejin.cn/post/6844903781377785863#heading-8)
* [Webpack打包优化](https://juejin.cn/post/6844903619158867982#heading-9)