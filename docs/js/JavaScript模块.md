### 模块化设计
模块化设计（Modular design），是一种将系统分解为更小的“模块”的生产方式。  
代码的模块化设计一般可抽象为三个部分： 输入（import）、计算（业务代码）、输出（export）
### 为什么使用模块化
1. 把复杂问题分解成多个子问题 
  关注点分离
2. 大型软件开发的技术基础 
  可扩展
  可替换
3. 代码重用 
  使多人并行开发成为可能
  面向接口开发（而不是面向实现开发）
### JS中的模块化方案
主流的方案： esm、cjs
* cjs: CommonJS, 支援 Node.js
* esm: 作为 ES module 文件，现代浏览器中用 `<script type=module>` 标签可直接支持
* iife: 立即执行函数，可直接使用 script 标签。
（如果你想打包你的前端应用，也可以用这种方式）
* umd: Universal Module Definition，通用模块定义，
直接封装 amd、cjs、iife 三种方式并根据环境自动切换
* amd: Asynchronous Module Definition，异步模块定义，以 RequireJS 为代表
* system: SystemJS 的方式
### 语法区别
#### esm
* `import a from 'b'`
* `export default c`
#### cjs
* `const a = require('b')`
* `module.exports = c`
#### iife
```js
const result = (
  (形参, ...) => {
    // ...
    return result
  }
)(实参, ...);
```
#### umd
输出：
```js
(function(global, factory) {
  typeof exports === 'object' &&
  typeof module !== 'undefined'
    ? (module.exports = factory(require('lodash')))
    : typeof define === 'function' && define.amd
    ? define(['lodash'], factory)
    : ((global = global || self),
      (global.result = factory(global.lodash)));
})(this, function(lodash) {
  'use strict';

  const result = lodash.every(
    [true, 1, null, 'yes'],
    Boolean,
  );
  return result;
});
```
由于 esm、cjs、iife 具有不同的用途，以及都有一定的使用量，
那么对于通用代码功能来说，最好能够一次编译到处使用。这是 UMD 的初衷。   
典型的 UMD 分为两个部分:
1. 模块化封装：检索当前存在的变量，判断并自动采用多种模块化方案的其中一种   
  * 用 typeof 做判断
  * 三元 或 if else 做切换
  * 这个部分一般位于文件的头部或尾部
2. 业务封装：将剩余的业务逻辑代码以类似 IIFE 的方式封装调用
#### amd 
不说了 老东西
#### systemjs
老东西

### 模块化方案
对于浏览器原生，预编译工具和node，不同环境中的模块化方案也不同；由于浏览器环境不能够解析第三方依赖，所以浏览器环境需要把依赖也进行打包处理；不同环境下引用的文件也不相同，下面通过一个表格对比下

|            | 浏览器（script,AMD,CMD） | 预编译工具（webpack,rollup,fis） | Node     |      |
| ---------- | ------------------------ | -------------------------------- | -------- | ---- |
| 引用文件   | index.aio.js             | index.esm.js                     | index.js |      |
| 模块化方案 | UMD                      | ES Module                        | commonjs |      |
| 自身依赖   | 打包                     | 打包                             | 打包     |      |
| 第三方依赖 | 打包                     | 不打包                           | 不打包   |      |

### 参考链接
* [知乎-JavaScript 模块现状](https://zhuanlan.zhihu.com/p/26567790) 
* [一个好博客！---让我搞懂了这些模式的区别](https://fe.rualc.com/note/js-modular.html)
* [颜海镜-如何写一个现代的JavaScript库](https://yanhaijing.com/javascript/2018/08/17/2020-js-lib/)
