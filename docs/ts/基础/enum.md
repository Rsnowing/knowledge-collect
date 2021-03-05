## 解释
使用枚举我们可以定义一些带名字的常量。TypeScript 支持数字的和基于字符串的枚举。   
枚举类型弥补了 JavaScript 的设计不足，很多语言都拥有枚举类型。

## 语法
### 数字枚举与字符串枚举
```js
enum Months { Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec }
enum Size { big = '大', medium = '中', small = '小' }
```
声明一个枚举类型，如果没有赋值，它们的值默认为数字类型且从 0 开始累加：
```js
Months.Jan === 0 // true
Months.Feb === 1 // true
// 现实中月份是从 1 月开始的，那么只需要这样：
enum Months { Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec }
Months.Jan === 1 // true
Months.Feb === 2 // true
```
枚举类型的值为字符串类型：
>  枚举的取值，有 TokenType.ACCESS 和 TokenType['ACCESS'] 这两种不同的写法，效果是相同的。
```js
enum TokenType {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken'
}
// 两种不同的取值写法
console.log(TokenType.ACCESS === 'accessToken')        // true
console.log(TokenType['REFRESH'] === 'refreshToken')   // true
```
### 异构枚举
>数字类型和字符串类型可以混合使用，但是不建议
```js
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```
### 计算常量成员
枚举类型的值可以是一个简单的计算表达式：
```js
enum Calculate {
  a,
  b,
  expired = 60 * 60 * 24,
  length = 'imooc'.length,
  plus = 'hello ' + 'world'
}
console.log(Calculate.expired)   // 86400
console.log(Calculate.length)    // 5
console.log(Calculate.plus)      // hello world
```
> 计算结果必须为常量。   
  计算项必须放在最后。
### 反向映射
所谓的反向映射就是指枚举的取值，不但可以正向的 Months.Jan 这样取值，也可以反向的 Months[1] 这样取值。
> 字符串枚举成员不会生成反向映射。
  枚举类型被编译成一个对象，它包含了正向映射（ name -> value）和反向映射（ value -> name）。
### const 枚举
大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。 常量枚举通过在枚举上使用 const修饰符来定义。
```js
const enum Enum {
  A = 1,
  B = A * 2
}
console.log(Enum['A'])
```
编译后生成：
```js
console.log(1 /* 'A' */);
```
常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。

## 小结
> 通过关键字 enum 来声明枚举类型。  
TypeScript 仅支持基于数字和字符串的枚举。   
通过枚举类型编译后的结果，了解到其本质上就是 JavaScript 对象。   







