# Jest 
## 基本知识

> - **行覆盖率**（line coverage）：是否每一行都执行了？
> - **函数覆盖率**（function coverage）：是否每个函数都调用了？
> - **分支覆盖率**（branch coverage）：是否每个if代码块都执行了？
> - **语句覆盖率**（statement coverage）：是否每个语句都执行了？

***
## 语法
### 测试用例描述
describe、it、test....
### 断言
toBe, toMatch, toEqual....
### 预设和清理
beforeEach,afterEach,beforeAll,afterAll

## 异步测试

## 行话记录
* stmts: 语句覆盖
* lines 行数覆盖
* branch 分支 （if else）
* funcs 函数覆盖率
行覆盖率（line coverage）：是否每一行都执行了
函数覆盖率（function coverage）：是否每个函数都调用了
分支覆盖率（branch coverage）：是否每个if代码块都执行了
语句覆盖率（statement coverage）：是否每个语句都执行了

## jest cli 参数
* jest -t someName 指定测试用例名称去跑单元测试（模糊匹配）， 名称来自于测试用例（it函数第一个参数）
* --watch
* --watchAll

## 参考链接
* [Jest 入门指南](http://iceiceice.top/2018/12/29/introduce-jest/#GlobalsAPI)
* [基本语法](http://iceiceice.top/2018/12/29/introduce-jest/)
* [Jest官方文档](https://jestjs.io/docs/en/api)
* [jest cli参数](https://jestjs.io/docs/en/cli)