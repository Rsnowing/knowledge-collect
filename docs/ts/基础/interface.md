## 官方解释
?>TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
接口是对 JavaScript 本身的随意性进行约束，通过定义一个接口，约定了变量、类、函数等应该按照什么样的格式进行声明，实现多人合作的一致性。TypeScript 编译器依赖接口用于类型检查，最终编译为 JavaScript 后，接口将会被移除。

## 语法
```js
// 语法格式
interface DemoInterface {
}
```

## 应用场景
在声明一个对象、函数或者类时，先定义接口，确保其数据结构的一致性。

## 接口的好处
在JS中：
```js
function getClothesInfo(clothes) {
  console.log(clothes.price)
}
let myClothes = {
  color: 'black', 
  size: 'XL', 
  price: 98 
}
getClothesInfo(myClothes)
// 但是调用时可能会遇到这样的麻烦
getClothesInfo() // Uncaught TypeError: Cannot read property 'price' of undefined
```
JavaScript 是 弱类型 语言，并不会对传入的参数进行任何检测，错误在运行时才被发现。那么通过定义 接口，在编译阶段甚至开发阶段就避免掉这类错误，接口将检查类型是否和某种结构做匹配。
```ts
// 通过接口方式重写上面的案例
interface Clothes {
  color: string;
  size: string;
  price: number;
}
function getClothesInfo(clothes: Clothes) {
  console.log(clothes.price)
}
let myClothes: Clothes = { 
  color: 'black',
  size: 'XL', 
  price: 98 
}
getClothesInfo(myClothes)
```
## 接口的属性
### 1. 可选属性
接口中的属性不全是必需的。可选属性的含义是该属性在被变量定义时可以不存在。  
可选属性名字定义的后面加一个 ? 符号。
```js
// 语法
interface Clothes {
  color?: string;
  size: string;
  price: number;
}
// 这里可以不定义属性 color
let myClothes: Clothes = { 
  size: 'XL', 
  price: 98 
}
```
### 2. 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用 readonly 来指定只读属性
```js
// 语法
interface Clothes {
  color?: string;
  size: string;
  readonly price: number;
}
// 创建的时候给 price 赋值
let myClothes: Clothes = { 
  size: 'XL', 
  price: 98 
}
// 不可修改
myClothes.price = 100
// error TS2540: Cannot assign to 'price' because it is a constant or a read-only property
```
TypeScript 可以通过 ReadonlyArray<T> 设置数组为只读，那么它的所有写方法都会失效。
```js
let arr: ReadonlyArray<number> = [1,2,3,4,5];
arr[0] = 6; // Index signature in type 'readonly number[]' only permits reading
```
### 3. 任意属性
接口允许有任意的属性，语法是用 [] 将属性包裹起来：
```js
// 语法
interface Clothes {
  color?: string;
  size: string;
  readonly price: number;
  [propName: string]: any;
}
// 任意属性 activity
// 这里的接口 Clothes 可以有任意数量的属性，并且只要它们不是 color size 和 price，那么就无所谓它们的类型是什么。
let myClothes: Clothes = { 
  size: 'XL', 
  price: 98,
  activity: 'coupon',
  season: 12
}
```
## 函数类型
除了描述带有属性的普通对象外，接口也可以描述函数类型。
```js
//定义 参数列表 和 返回值类型。
interface SayHi {
    (word: string): string;
}
```
## 可索引类型
用的不多，暂不介绍
## 类类型
接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。  
如果希望类的实现必须遵循接口定义，那么可以使用 implements 关键字来确保兼容性。
```js
interface Person {
    name: string;
    say(word: string): string;
}
class Teacher implements Person {
    age: number
    constructor(name: string) {
        this.name = name
    }
    // 实现接口中的方法
    say: (word: string) => {
        return `i say ${word}`
    }
}
```
## 继承接口
一个接口可以继承多个接口，创建出多个接口的合成接口。
```js
interface Shape {
    color: string;
}
// 继承1个接口
interface Square extends Shape {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
// 继承多个接口
interface Square1 extends Shape, PenStroke {
    sideLength: number;
}
let square1 = <Square>{};
square1.color = "blue";
square1.sideLength = 10;
square1.penWidth = 5.0;
```

> 1. 定义接口要首字母大写  
2. 只需要关注值的 外形，并不像其他语言一样，定义接口是为了实现。  
3. 如果没有特殊声明，定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的，赋值的时候，变量的形状必须和接口的形状保持一致。
4. 接口中的属性结尾分号


