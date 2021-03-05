# 如何写一个ts版的工具库

## 编译打包
**使用工具：Rollup + Babel + TypeScript**

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码。号称webpack下一代的打包工具。比较适用于库的打包，vue,babel都是使用Rollup打包的。[Rollup中文文档](https://www.rollupjs.com/)<br />
Babel一个JavaScript编译器。 [Babel中文文档](https://www.babeljs.cn/)<br />
TypeScript 是JavaScript类型的超集，可以被编译成纯JavaScript。 [TypeScript中文文档](https://www.tslang.cn/index.html)
### 编译配置
#### 1. 安装Rollup
```javascript
npm install rollup -D
```
#### 2. Babel编译
```javascript
npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
npm install @babel/polyfill @babel/runtime -S
npm install rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs -D
```



| 名称 | 作用 |
| --- | --- |
| @babel/core | Babel核心 |
| @babel/preset-env | JS新语法转换 |
| @babel/polyfill | 为所有 API 增加兼容方法 |
| @babel/plugin-transform-runtime & @babel/runtime | 把帮助类方法从每次使用前定义改为统一 require，<br />精简代码 |
| rollup-plugin-babel | Rollup的Babel插件 |
| rollup-plugin-node-resolve | Rollup解析外部依赖模块插件 |
| rollup-plugin-commonjs | Rollup仅支持ES6模块，此插件将外部依赖CommonJS模块转换为ES6模块的插件 |



由于JS新语法特性支持需要Babel编译，创建并编写Babel配置文件`.babelrc`:
```javascript
{
  "presets": ["@babel/preset-env"]
}
```
#### 3. 支持TS
```javascript
npm install typescript rollup-plugin-typescript2 -D
```
| 名称 | 作用 |
| --- | --- |
| typescript | typescript核心 |
| rollup-plugin-typescript2 | rollup编译typeScript的插件 |

在项目根目录下创建TS编译配置文件tsconfig.json：
```javascript
{
    "compilerOptions": {
        "target": "ES5",
        "module": "ES6",
        "lib": ["esnext", "dom"],
        "esModuleInterop": true
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules",
        "**.d.ts"
    ]
}
```
#### 4. 压缩打包文件
```javascript
npm i rollup-plugin-uglify -D
```
#### 5. 配置rollup.config.js文件
```javascript
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')
const typescript = require('rollup-plugin-typescript2') 
const prod = process.env.ENV === 'production'

module.exports = {
  input: 'src/index.ts', // 入口文件
  output: {
    file: prod ? 'dist/anxinUtils.aio.min.js' : 'dist/anxinUtils.aio.js', // 构建文件
    format: 'umd', // 输出格式，umd格式支持浏览器直接引入、AMD、CMD、Node
    name: 'anxinUtils' // umd模块名，在浏览器环境用作全局变量名
  },
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: true, module: 'ES2015' } },
      useTsconfigDeclarationDir: true
    }),
    prod && uglify()
  ]
}
```
#### 6.  配置打包命令
在package.json中加入以下命令<br />`-c ` 默认使用rollip.config.js配置文件进行构建<br />也可以自定义配置文件，例如  `rollup -c config/rollup.config.js` 表示使用config下的rollup.config.js进行构建
```javascript
scripts: {
  build: rollup -c 
}
```
#### 7. 为什么选择rollup

- Tree-shaking

Rollup仅支持ES6模块，在构建代码时，在使用ES6模块化的代码中，会对你的代码进行静态分析，只打包使用到的代码。

- 构建体积

Webpack构建后除了业务逻辑代码，还包括代码执行引导及模块关系记录的代码，Rollup构建后则只有业务逻辑代码，构建体积占优，总结就是开发库或框架使用Rollup，其他场景Webpack。
##### 打包演示：
源码：
```javascript
// src/index.ts
export function add(a:number, b: number): number {
  return a + b
}

export function reduce(a:number, b: number):number {
  return a - b
}
const a = 3, b = 4, c = 5
console.log(add(a, b))
```
执行 npm run build之后生成的代码
```javascript
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.anxinUtils = {}));
}(this, (function (exports) { 'use strict';

  function add(a, b) {
      return a + b;
  }
  function reduce(a, b) {
      return a - b;
  }
  var a = 3, b = 4;
  console.log(add(a, b));

  exports.add = add;
  exports.reduce = reduce;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
```
可以看出，没有使用到的变量c没有被打包进去。<br />rollup是天然支持tree shaking，tree shaking可以提出依赖模块中没有被使用的部分，这对于第三方依赖非常有帮助，可以极大的降低包的体积。
## 自动化测试
**jest： **单元测试框架, Facebook出品~  [Jest中文文档](https://jestjs.io/docs/zh-Hans/getting-started)<br />**ts-jest **TypeScript支持插件<br />**@type/jest**: TypeScript的Jest声明插件
#### 1. 安装依赖
```javascript
npm i jest ts-jest @types/jest -D
```
#### 2. 添加配置文件 jest.config.js
```javascript
module.exports = {
  // ts文件使用ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // 查找测试文件
  testPathIgnorePatterns: ['/node_modules/', '/_book'], // 用正则来匹配不用测试的文件
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // 支持加载的文件名
  collectCoverage: true // 是否生成测试覆盖报告，如果开启，会增加测试的时间
}

```
#### 3. 编写测试用例
创建/test/index.test.ts
```javascript
import * as testDemo from '../src/index'

describe('测试', () => {
  test('add方法', () => {
    expect(testDemo.add(1, 2)).toBe(3)
    expect(testDemo.add(999, 2)).toBe(1001)
  })
  test('reduce方法', () => {
    expect(testDemo.reduce(0, 0)).toBe(0)
    expect(testDemo.reduce(0, 2)).toBe(-2)
  })
})
```
#### 4. 配置test命令
```javascript
// package.json
"scripts": {
  "test": "jest"
}
```
运行得到测试结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/622169/1595318611888-7d670433-be17-4dd6-8282-395a72a38555.png#align=left&display=inline&height=239&margin=%5Bobject%20Object%5D&name=image.png&originHeight=478&originWidth=777&size=31381&status=done&style=none&width=388.5)<br />测试结果说明

- **行覆盖率**（line coverage）：是否每一行都执行了
- **函数覆盖率**（function coverage）：是否每个函数都调用了
- **分支覆盖率**（branch coverage）：是否每个if代码块都执行了
- **语句覆盖率**（statement coverage）：是否每个语句都执行了
### jest常用语法
[API文档](https://jestjs.io/docs/zh-Hans/api)
#### 全局API
#### 
| 方法 | 参数 |
| --- | --- |
| describe(name, fn) | name: 描述， fn： 一组功能相关的测试用例组合 |
| test(name, fn, timeout) | name: 描述， fn: 测试用例， timeout:延时时间 |
| afterAll(fn, timeout)： | 所有测试用例跑完以后执行的方法 |
| beforeAll(fn, timeout) | 所有测试用例执行之前执行的方法 |
| afterEach(fn) | 在每个测试用例执行完后执行的方法 |
| beforeEach(fn) | 在每个测试用例执行之前需要执行的方法 |
| describe.each | 不知道怎么翻译了，看demo吧 ⬇ |
| describe.skip | 跳过测试用例组合 |
| test.each | 看demo吧 ⬇ |
| test.skip(name, fn) | 如果你不想执行某个测试用例的话 |

```javascript
// %p - pretty-format.
// %s- String.
// %d- Number.
// %i - Integer.
// %f - Floating point value.
// %j - JSON.
// %o - Object.
// %# - Index of the test case.
// %% - single percent sign ('%'). This does not consume an argument.
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  })
})
```
```javascript
// test.each
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```
```javascript
// test.skip
test('it is raining', () => {
  expect(inchesOfRain()).toBeGreaterThan(0);
});

test.skip('it is not snowing', () => {
  expect(inchesOfSnow()).toBe(0);
});
// 只有“it is raining”测试才会运行，因为另一个测试是使用test.skip。
```
#### 断言

1. `expect(value)`：要测试一个值进行断言的时候，要使用`expect`对值进行包裹
1. `toBe(value)`：使用`Object.is`来进行比较，如果进行浮点数的比较，要使用`toBeCloseTo`
1. `not`：用来取反
1. `toEqual(value)`：用于对象的深比较
1. `toMatch(regexpOrString)`：用来检查字符串是否匹配，可以是正则表达式或者字符串
1. `toContain(item)`：用来判断`item`是否在一个数组中，也可以用于字符串的判断
1. `toBeNull(value)`：只匹配`null`
1. `toBeUndefined(value)`：只匹配`undefined`
1. `toBeDefined(value)`：与`toBeUndefined`相反
1. `toBeTruthy(value)`：匹配任何使`if`语句为真的值
1. `toBeFalsy(value)`：匹配任何使`if`语句为假的值
1. `toBeGreaterThan(number)`： 大于
1. `toBeGreaterThanOrEqual(number)`：大于等于
1. `toBeLessThan(number)`：小于
1. `toBeLessThanOrEqual(number)`：小于等于
1. `toBeInstanceOf(class)`：判断是不是`class`的实例
1. `anything(value)`：匹配除了`null`和`undefined`以外的所有值
1. `resolves`：用来取出`promise`为`fulfilled`时包裹的值，支持链式调用
1. `rejects`：用来取出`promise`为`rejected`时包裹的值，支持链式调用
1. `toHaveBeenCalled()`：用来判断`mock function`是否被调用过
1. `toHaveBeenCalledTimes(number)`：用来判断`mock function`被调用的次数
1. `assertions(number)`：验证在一个测试用例中有`number`个断言被调用
1. `extend(matchers)`：自定义一些断言
#### 异步函数测试
#### Mock
## 文档
使用gitbook。<br />安装： `npm i -g gitbook-cli` <br />初始化： `gitbook init` <br />启动： `gitbook serve` <br />构建文档生成html文件 `gitbook build` 
## npm发布
发布 `npm publish` <br />删除指定版本 `npm unpublish 包名@版本号` <br />删除整个包 `npm unpublish 包名 --force` 
#### package.json部分配置说明

- name即为包名，
- version为版本号，两次发布版本号不能相同。
- description: 项目描述。
- files：包含在项目中的文件数组。设置发布包包含哪些文件。
- publishConfig： 设置发布包的地址。
```javascript
"publishConfig": {
    "registry": "http://registry.npm.xxx.com/"
 }
```

- main 定义了 `npm` 包的入口文件，browser 环境和 node 环境均可使用
- browser: 定义 `npm` 包在 browser 环境下的入口文件
- module:  定义 `npm` 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用

当打包工具遇到我们的模块时：

1. 如果它已经支持 `pkg.module` 字段则会优先使用 ES6 模块规范的版本，这样可以启用 Tree Shaking 机制。
1. 如果它还不识别 `pkg.module` 字段则会使用我们已经编译成 CommonJS 规范的版本，也不会阻碍打包流程
```javascript
{
  "main": "dist/dist.js",
  "module": "dist/dist.es.js"
}
```
#### 版本管理
npm的发包需要遵循语义化版本，一个版本号包含三个部分：MAJOR.MINOR.PATCH，
> - MAJOR 表示主版本号，当你做了不兼容的API修改；
> - MINOR 表示次版本号，当你做了向下兼容的功能性新增；
> - PATCH 表示修订号,当你做了向下兼容的问题修正;

#### CHANGELOG
包发布了很多次后，使用者升级就需要知道他是否需要升级，需要查看文档看看有哪些不兼容性改动，所以需要一个 CHANGELOG来记录每次发布改了些什么。如果手动的维护肯定会有忘记的时候，所以需要使用工具来自动生成。=》 使用工具 standard-version<br />安装: `npm i standard-version -D `<br />配置package.json中命令： `release: standard-version` <br />执行 `npm run release`  会生成CHANGELOG.md文档如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/622169/1595322481307-aa7b980c-174d-4690-b7e9-5bfb74c14d10.png#align=left&display=inline&height=342&margin=%5Bobject%20Object%5D&name=image.png&originHeight=684&originWidth=859&size=56784&status=done&style=none&width=429.5)
#### 遵循提交规范
如何让standard-version去识别是bug fix还是features需要注意提交信息的填写规范，一般有以下：
> feat: 表示新增了一个功能
> fix: 表示修复了一个 bug
> docs: 表示只修改了文档
> style: 表示修改格式、书写错误、空格等不影响代码逻辑的操作
> refactor: 表示修改的代码不是新增功能也不是修改 bug，比如代码重构
> perf: 表示修改了提升性能的代码
> test: 表示修改了测试代码
> build: 表示修改了编译配置文件
> chore: 无 src 或 test 的操作

> revert: 回滚操作

例如： fix: 修复了XXXbug<br />

#### 发布命令
配置 `release: standard-version` 命令之后还需要执行npm publish才可以发布，可以把命令整合一下：
```javascript
"release": "standard-version && git tag %npm_package_version% && git push && git push --tags && npm publish",
```
## 如何为ts库添砖加瓦
即从哪里复制一些好的方法😀

1. 平时的积累
1. [js-trick](https://qishaoxuan.github.io/js_tricks/)
1. [30s knowledge](https://www.30secondsofcode.org/js/p/1)



## 参考链接
[npm发布包必读](https://juejin.im/post/5d09054f51882563194b302c)<br />[JavaScript库架构实战](https://juejin.im/post/5c7c7f9851882540c8245054#heading-0)<br />[package.json中的module](https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/)<br />[package.json中的browser,module.main优先级](https://github.com/SunshowerC/blog/issues/8)
