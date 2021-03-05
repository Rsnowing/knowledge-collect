# 类型

## 基本类型 & 对象类型
ts中的原始类型：boolean, string, number, void, null, undefined, symbol, bigint   
ts中的对象类型：元组tuple, 枚举enum, 任意 any, unknown,never, 数组Array,对象 object
### 变量声明
> 变量声明语法：冒号 : 前面是变量名称，后面是变量类型。
### demo 原始类型
```js
// boolean
const flag: boolean = true
// number
const num: numebr = 3,
    notNum: number = NaN
// string
const str: string = 'i am a string'
const modelStr: string = `hhh${str}`
// void: 当一个函数没有返回值时，可以将其返回值类型定义为 void
function doNothing(): void {
  let a  = 10
}
// 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：
let nothing: void = undefined
// null & undefined

```
### demo 对象类型
```js
// 数组类型 2种表示方法 =》推荐使用第一种，比较简洁
let list: number[] = [1, 2, 3] 
let namrArr: string[] = ['llhe', 'cgm']
// 第2种 使用数组泛型Array<元素类型>>
let list1: Array<number> = [1, 2, 3]
// 混合各种元素类型
let list3: any[] = ['llhe', 2020]

// any
//有时候接收来自用户的输入，我们是不能确定其变量类型的。这种情况下，我们不希望类型检查器对这些值进行检查，而是直接让它们通过编译阶段的检查，此时可以使用 any
let input: any = 'nothing'
// 如果一个数据是 any 类型，那么可以访问它的任意属性，即使这个属性不存在
input.onfocus() // 不会报错
```
### 布尔值 boolean
```js
const flag: boolean = true
```
### 数字 number
和JavaScript一样，TypeScript里的所有数字都是浮点数。
```js
const num: number = 23
```
### 字符串 string
```js
const str: string = '123'
const str1: string = `456-${str}`
```
### 数组 array
有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
```js
const list: number = [22,23,24]
```
第二种方式是使用数组泛型，Array<元素类型>
```js
const list: Array<number> = [1, 2, 3];
```
### 元组 Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```js
let arr: [number, string]
arr = [10, '122']
```
### 枚举 enum
枚举类型可以为一组数值赋予友好的名字。
```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green; // c = 1
```
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值:
```js
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green; // 2
```
枚举类型还可以由枚举的值得到它的名字
```js
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```
### any
不希望类型检查器对变量进行检查而是直接让它们通过编译阶段的检查, 那么我们可以使用 any类型来标记这些变量
### void
表示没有任何类型。 当一个函数没有返回值时，返回值类型是 void：
```js
function warnUser(): void {
    console.log("This is my warning message");
}
```
### null 和 undefined
默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给任意类型的变量。
### never
never类型表示的是那些永不存在的值的类型。  
never类型是任何类型的子类型，也可以赋值给任何类型
没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never
【有点像叶子节点】
### 类型断言
类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用
类型断言有两种形式。 其一是“尖括号”语法：
```js
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
另一个为as语法
```js
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```


## 注意
> TypeScript 中描述类型要用 小写。比如 boolean、number、string等  
  大写开头的如 Boolean、Number、String 代表的是 JavaScript 的构造函数。  
  不要滥用 any !