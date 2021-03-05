# UI自动化测试

## 测试用例编写原则
一个测试用例只写一个功能点,且测试的代码要尽量简单，最小颗粒度， 不要贪多(考虑到后期维护)
## 测试工具

### 测试管理工具
测试管理工具是用来组织和运行整个测试的工具，它能够将测试框架、断言库、测试浏览器、测试代码和被测试代码组织起来，并运行被测试代码进行测试。

常见测试管理工具： Selenium、WebDriver/Selenium 2、Mocha、JsTestDriver、HTML Runners、Karma、Jest

### 测试框架
测试框架是单元测试的核心，它提供了单元测试所需的各种API，你可以使用它们来对你的代码进行单元测试。

常见测试框架: Jest、Mocha、Jasmine

### 断言库
断言库提供了用于描述具体测试的API，有了它们测试代码便能简单直接，也更为语义化

常见断言库: should.js、expect.js、chai.js等等。

## elementui单元测试工具清单
```js
"karma": "^4.0.1",
"karma-chrome-launcher": "^2.2.0",
"karma-coverage": "^1.1.2",
"karma-mocha": "^1.3.0",
"karma-sinon-chai": "^2.0.2",
"karma-sourcemap-loader": "^0.3.7",
"karma-spec-reporter": "^0.0.32",
"karma-webpack": "^3.0.5",

"mocha": "^6.0.2",

"chai": "^4.2.0",
"sinon": "^7.2.7",
"sinon-chai": "^3.3.0",
```


## 参考链接
* [基于 Jasmine 和 Karma 的单元测试基础教程 - Joe’s Blog](https://hijiangtao.github.io/2020/07/06/Basic-Unit-Test-Tutorial/)
* [编写测试 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1101756368943712)
* [测试框架 Mocha 实例教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)