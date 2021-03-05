# 内置对象
## ECMAScript的内置对象
像Boolean,Error,Date,RegExp等。<br/>
在TS中可以直接使用:
```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```
更多内置对象 查看 [MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) <br/>
而他们的定义文件 在 [TypeScript核心库的定义文件中](https://github.com/Microsoft/TypeScript/tree/master/src/lib)

## DOM和BOM的内置对象
`DOM 和 BOM 是 JavaScript 的运行平台（浏览器）提供的，比如在 nodejs 中就没有 DOM 和 BOM。`<br/>

DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等<br/>
TS中使用方法:
```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```
定义文件 也在 [TypeScript核心库的定义文件中](https://github.com/Microsoft/TypeScript/tree/master/src/lib)

## TypeScript 核心库的定义文件
TypeScript核心库的定义文件中定义了所有浏览器环境需要用到的类型,并且是预置在 TypeScript 中的。

## 用TypeScript写nodejs
Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
`npm install @types/node --save-dev`

## 参考链接
* [内置对象](https://ts.xcatliu.com/basics/built-in-objects.html)
