# vue2 源码目录设计
src下的源码
```
src
├─compiler
│  ├─codegen
│  ├─directives
│  └─parser
├─core
│  ├─components
│  ├─global-api
│  ├─instance
│  │  └─render-helpers
│  ├─observer
│  ├─util
│  └─vdom
│      ├─helpers
│      └─modules
├─platforms
│  ├─web
│  │  ├─compiler
│  │  │  ├─directives
│  │  │  └─modules
│  │  ├─runtime
│  │  │  ├─components
│  │  │  ├─directives
│  │  │  └─modules
│  │  ├─server
│  │  │  ├─directives
│  │  │  └─modules
│  │  └─util
│  └─weex
│      ├─compiler
│      │  ├─directives
│      │  └─modules
│      │      └─recycle-list
│      ├─runtime
│      │  ├─components
│      │  ├─directives
│      │  ├─modules
│      │  └─recycle-list
│      └─util
├─server
│  ├─bundle-renderer
│  ├─optimizing-compiler
│  ├─template-renderer
│  └─webpack-plugin
├─sfc
└─shared
```
## compiler
编译，把模板改成ast语法树、ast语法树优化，代码生成等。
## core
核心代码，包含内置组件、全局API封装、Vue实例化、观察者、虚拟DOM、工具函数等
## platforms
区分平台，web、weex。<br/>
Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 native 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。
## server
Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下。注意：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。<br/>
服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。

## sfc
通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件来编写组件。<br/>
这个目录下的代码逻辑会把 .vue 文件内容解析成一个 JavaScript 的对象。

## shared
Vue.js的工具方法，可以在client和server的Vue.js共享。
## 总结
从 Vue.js 的目录设计可以看到，作者把功能模块拆分的非常清楚，相关的逻辑放在一个独立的目录下维护，并且把复用的代码也抽成一个独立目录。

这样的目录设计让代码的阅读性和可维护性都变强，是非常值得学习和推敲的。

## 参考链接
