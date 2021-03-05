# apply bind call  
apply()、bind()、call() 都是用来重定义函数的this指向的 【this 永远指向最后调用它的那个对象】
## Function.prototype.apply()
### 定义
apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入，且当第一个参数为null、undefined的时候，默认指向window(在浏览器中)，使用apply方法改变this指向后原函数会立即执行，且此方法只是临时改变thi指向一次。

### demo
#### 1. 获取数组最大最小值
```js
// 基本等同于 Math.max(5, 6, 2, 3, 7) ，Math.min(5, 6, 2, 3, 7) 
const max = Math.max.apply(null, [5, 6, 2, 3, 7]);
console.log(max);
// expected output: 7

const min = Math.min.apply(null, [5, 6, 2, 3, 7]);
console.log(min);
// expected output: 2
```
```js
Math.max(...[2,4,5])
```

```js
// 简单循环算法实现获取max min
function getMaxMIn(numbers) {
  let max = -Infinity, min = Infinity
  for (let i = 0; i< numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i]
    }
    if (numbers[i] < min) {
      min  = numbers[i]
    }
  }
  return {max, min}
}
```
#### 2. 合并数组
concat也可以合并数组，但它并不是将元素添加到现有数组，而是创建并返回一个新数组。
```js
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

## Function.prototype.call()
### 定义
call方法的第一个参数也是this的指向，后面传入的是一个参数列表（注意和apply传参的区别）。当一个参数为null或undefined的时候，表示指向window（在浏览器中），和apply一样，call也只是临时改变一次this指向，并立即执行。

### demo
```js
Math.max.call(null,1,10,5,8,3) //10
```

## Function.prototype.bind()
### 定义
bind方法和call很相似，第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入，call则必须一次性传入所有参数)，但是它改变this指向后不会立即执行，而是返回一个永久改变this指向的函数。
### demo
```js
var max=Math.max.bind(null,1,10,5,8,12)
console.log(max(20)); //20，分两次传参
```
可以看出，bind方法可以分多次传参，最后函数运行时会把所有参数连接起来一起放入函数运行。

## apply，call，bind三者的区别
* 三者都可以改变函数的this对象指向。
* 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。
* 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
* bind 返回绑定this之后的函数，便于稍后调用；apply 、call 则是立即执行 。

## 简易实现bind
```js
Function.prototype.myBind = function() {
  const _this = this
  const context = arguments[0]
  let args = [].slice.call(arguments, 1) // slice(1) 取出除了this指向之外的参数列表
  return function () {
    // bind 可以分多次传参
    args = [].concat.apply(args, arguments) // 合并数组
    _this.apply(context, args)
  }
}
```

## 参考链接
* [Function.prototype.apply() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
* [彻底弄懂bind，apply，call三者的区别 - 知乎](https://zhuanlan.zhihu.com/p/82340026)