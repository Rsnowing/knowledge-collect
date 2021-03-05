## 前情提要

y1s1,每次遇到babel配置我都头大，为什么要一下下载那么多插件！！
但是好像没得办法，只能接收，今天我想弄清这些儿个配置，插件到底是什么意思！！

### 什么是Babel

下一代的JavaScript语法的编译器。
为什么需要它？因为JavaScript时常会出新的版本，出一些新语法，但是浏览器并不能第一时间兼容这些方法。Babel应运而生，它可以让你放心大胆地区使用大部分的JavaScript新的标准的方法，然后编译成兼容绝大多数的主流浏览器的代码

### plugins 插件

babel仅仅是一个编译器，虽然开箱即用，但也就是将代码解析再输出同样的代码。所以，要使其工作，还得需要插件的辅助。

但是，很多时候，我们搭建一个开发环境可能需要的不仅仅是一个插件，可能需要好多插件的组合，这就很麻烦了。所以，presets配置就可以派上用场。

### presets预设

主要通过npm安装babel-preset-xx插件来配合使用

```js
{
    "presets": [
          "@babel/preset-env",
          "@babel/preset-react"
     ]
}
```

那么，这段配置即配置babel可以编辑es6和react的语法。**值得注意的是，presets的顺序是从后往前的。**

### .babelrc

> 主要以presets和plugins组成

### preset-env

preset虽然已经大大方便了我们的使用，但是如果我们还想使用更新一些的语法，比如es2016的**（相当于pow()）,es2017的async/await等等，我们就要引入@babel/preset-es2016，@babel/preset-es2017之类的，而且随着js语法的更新，这些preset会越来越多。于是babel推出了babel-env预设，这是一个智能预设，只要安装这一个preset，就会根据你设置的目标浏览器，自动将代码中的新特性转换成目标浏览器支持的代码

```js
npm i @babel/preset-env -D
```

```js
// babel.config.js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '58'
                }
            }
        ]
    ]
};
```

### exclude | include 排除 | 包含

```js
// 如果我们是这样配置的话，那么babel在编译的时候，配置的预设是对除test目录下的js生效的
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "exclude": ["./test"]
}
```



[JavaScript 版本](https://www.w3school.com.cn/js/js_versions.asp)
[babel之配置文件.babelrc入门详解](https://juejin.im/post/5a79adeef265da4e93116430#heading-1)
[Babel快速上手使用指南](https://juejin.im/post/5cf45f9f5188254032204df1)

