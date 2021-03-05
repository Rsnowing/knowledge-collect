```js
1. npm init -y
```

### 什么是rollup

JavaScript模块打包器。专注于JacaScript类库打包。

### 安装

```js
npm install rollup @babel/core @babel/preset-env rollup-plugin-babel rollup-plugin-serve cross-env -D
// rollup 打包工具
// @babel/core 用babel核心模块
// @babel/preset-env  abel将高级语发转成低级语法
// rollup-plugin-babel rollup与babel的桥梁
// rollup-plugin-serve 实现静态服务
// cross-env 设置环境变量
```

| 名称                                             | 作用                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| @babel/core                                      | Babel核心                                                    |
| @babel/preset-env                                | JS新语法转换                                                 |
| @babel/polyfill                                  | 为所有 API 增加兼容方法                                      |
| @babel/plugin-transform-runtime & @babel/runtime | 把帮助类方法从每次使用前定义改为统一 require，精简代码       |
| rollup-plugin-babel                              | Rollup的Babel插件                                            |
| rollup-plugin-node-resolve                       | Rollup解析外部依赖模块插件                                   |
| rollup-plugin-commonjs                           | Rollup仅支持ES6模块，此插件是将外部依赖CommonJS模块转换为ES6模块的插件 |
| rollup-plugin-liveload                           | 热更新 |

### rollup vs webpack

### rollup 打包文件格式
输出的文件类型 (amd, cjs, esm, iife, umd)   
[参考链接](https://juejin.im/post/5db2fa6ee51d4529ec55aeed)

### 参考链接
[掘金-搭建工具库](https://juejin.im/post/5c7c7f9851882540c8245054)
[掘金-颜海镜-8102年如何写一个现代的JavaScript库](https://juejin.im/post/5bbafd78f265da0ad947e6ba)   
[用 JSDOC 编写 JavaScript 文档](https://scarletsky.github.io/2017/12/23/write-javascript-document-by-jsdoc/)
[jsdoc 实时编译](https://github.com/jsdoc/jsdoc/issues/1608)    
[Rollup打包工具的使用（超详细，超基础，附代码截图超简单](https://juejin.im/post/5e3d0b5ae51d4526f76ea8e2)