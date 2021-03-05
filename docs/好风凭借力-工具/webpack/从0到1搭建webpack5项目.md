# 从0到1搭建webpack项目
## 目标
* 了解什么是webpack 为什么要使用webpack
* 配置开发模式
* 配置生产模式
## webpack4 与 webpack5 差别
1. webpack-dev-server 命令变为 webpack-serve
2. file-loader, raw-loader ， url-loader不是必须的了, 可以使用内置的assets module
3. Node polyfills 不可用了, so if you get an error for stream, for example, you would add the stream-browserify package as a dependency and add { stream: 'stream-browserify' } to the alias property in your webpack config.

## 什么是webpack
一个现代化的web应用，已经不是单纯地优html、css、javascript组成的，它还需要对应用进行打包、压缩和编译成浏览器能够理解的代码，于是webpack就开始流行起来了。

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

### plugins
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

### Loader
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
hot module replacement

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

## 测试环境与生产环境配置分开



## 参考链接
* [webpack Tutorial: How to Set Up webpack 5 From Scratch | Tania Rascia](https://www.taniarascia.com/how-to-use-webpack/)