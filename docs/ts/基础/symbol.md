## 解释
symbol 属于基本数据类型  
Symbol() 函数会返回 symbol 类型的值。每个从 Symbol() 返回的 symbol 值都是唯一的。

## 语法
`Symbol([description]) `   参数 description：可选的，字符串类型。
```js
const sym1: symbol = Symbol()
const sym2: symbol = Symbol('foo')
const sym3: symbol = Symbol('foo')
sym2 === sym3 // false => 每个 Symbol() 方法返回的值都是唯一的
```

## 介绍
Symbol() 作为构造函数是不完整的:
```js
const sym = new Symbol() // TypeError
```
这种语法会报错，是因为从 ECMAScript 6 开始围绕原始数据类型创建一个显式包装器对象已不再被支持，但因历史遗留原因， new Boolean()、new String() 以及 new Number() 仍可被创建：
```js
const symbol = new Symbol()   // TypeError
const bigint = new BigInt()   // TypeError
const number = new Number()   // OK
const boolean = new Boolean() // OK
const string = new String()   // OK
```

## 使用场景
1. 👍当一个对象有较多属性时（往往分布在不同文件中由模块组合而成），很容易将某个属性名覆盖掉，使用 Symbol 值可以避免这一现象，比如 vue-router 中的 name 属性。
```js
// 两个不同文件使用了同样的 Symbol('index') 作为属性 name 的值，因 symbol 类型的唯一性，就避免了重复定义。
// a.js 文件
export const aRouter = {
  path: '/index',
  name: Symbol('index'),
  component: Index
},
// b.js 文件
export const bRouter = {
  path: '/home',
  name: Symbol('index'), // 不重复
  component: Home
},
// routes.js 文件
import { aRouter } from './a.js'
import { bRouter } from './b.js'
const routes = [
  aRouter,
  bRouter
]
```
2. 判断是否可以用`for...of`迭代
> for...of 循环内部调用的是数据结构的 Symbol.iterator 方法。  
  for...of 只能迭代可枚举属性。
```js
if (Symbol.iterator in iterable) {
    for(let n of iterable) {
      console.log(n)
    }
}
```
3. Symbol.prototype.description  
Symbol([description]) 中可选的字符串即为这个 Symbol 的描述，如果想要获取这个描述：
```js
const sym: symbol = Symbol('llhe')
console.log(sym);               // Symbol(llhe)
console.log(sym.toString());    // 'Symbol(llhe)'
console.log(sym.description);   // 'llhe;
```
> escription 属性是 ES2019 的新标准，Node.js 最低支持版本 11.0.0。

