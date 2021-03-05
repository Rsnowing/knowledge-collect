## 解释
相同类型元素组成为数组，不同类型元素组成了元组（Tuple）。

## 语法
>  元组中规定的元素类型顺序必须是完全对照的，而且不能多、不能少  
    要注意元组的越界问题，虽然可以越界添加元素（不建议），但是不可越界访问
```js
const list: [string, number] = ['Sherlock', 1887]   // ok
const list1: [string, number] = [1887, 'Sherlock']  // error
// 当赋值或访问一个已知索引的元素时，会得到正确的类型
list[0].substr(1)  // ok
list[1].substr(1)  // Property 'substr' does not exist on type 'number'.
// 添加元素 
list.push('hello world')
console.log(list)      // ok [ 'Sherlock', 1887, 'hello world' ]
console.log(list[2])   // Tuple type '[string, number]' of length '2' has no element at index '2'
```

## 可选元素类型
元组类型允许在元素类型后缀一个 ? 来说明元素是可选的：
```js
const list: [number, string?, boolean?]
list = [10, 'Sherlock', true]
list = [10, 'Sherlock']
list = [10]
```
> 可选元素必须在必选元素的后面，也就是如果一个元素后缀了 ?号，其后的所有元素都要后缀 ?号。

## 元组类型的Rest使用
元组可以作为参数传递给函数，函数的 Rest 形参可以定义为元组类型：
```js
declare function rest(...args: [number, string, boolean]): void
// 等价于
// declare function rest(arg1: number, arg2: string, arg3: boolean): void
// 还可以这样
const list: [number, ...string[]] = [10, 'a', 'b', 'c']
const list1: [string, ...number[]] = ['a', 1, 2, 3]
```
