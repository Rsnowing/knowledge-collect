# [翻译 & 补充] - async await 陷阱
原文发布时间: 2020-07-29

你能指出这块代码存在的问题么?
```js
async function getPeople() {
  const members = await fetch("/members");
  const nonMembers = await fetch("/non-members");

  return members.concat(nonMembers);
}
```
花点时间看下。这样的代码可能会存在于很多的JS代码中。即使是认为对它很了解的人也会犯这种错，包括我，正是这个原因促使我写下这篇文章。

给个提示，不使用async/await时代码是这样的：
```js
function getPeople() {
  return fetch("/members")
    .then(members => fetch("/non-members")
      .then(nonMembers => members.concat(nonMembers)))
}
```
明白了吗，，一般我们不会写出以上代码，因为没有async/await，这种错误是很难犯的。

这时浏览器network面板的请求日志是这样的<br/>
我们创建了2个独立的异步任务，并将它们放入一个序列中。getPeople函数执行的时间是它需要的2倍。
![浏览器请求日志](../assets/imgs/async-await/network-log.png)

正确的代码应该是这样：
```js
async function getPeople() {
  const members = fetch("/members");
  const nonMembers = fetch("/non-members");
  const both = await Promise.all([ members, nonMembers ]);

  return both[0].concat(both[1]);
}
```
不使用aysnc/await：
```js
function getPeople() {
  const members = fetch("/members");
  const nonMembers = fetch("/non-members");

  return Promise.all([ members, nonMembers ])
          .then(both => both[0].concat(both[1]));
}
```
此时浏览器请求日志：
![浏览器请求日志](../assets/imgs/async-await/without.png)

## async/await 运行说明
```js
async function foo() {
  const result1 = await new Promise((resolve) => setTimeout(() => resolve('1')))
  console.log(result1)
  const result2 = await new Promise((resolve) => setTimeout(() => resolve('2')))
  console.log(result2)
}
foo()
console.log(3)
// 输出顺序: 3 1 2
```
1. foo函数的第一行将会同步执行，await将会等待promise的结束。然后暂停通过foo的进程，并将控制权交还给调用foo的函数。
2. 一段时间后，当第一个promise完结的时候，控制权将重新回到foo函数内。示例中将会将1（promise状态为fulfilled）作为结果返回给await表达式的左边即result1。接下来函数会继续进行，到达第二个await区域，此时foo函数的进程将再次被暂停。
3. 一段时间后，同样当第二个promise完结的时候，result2将被赋值为2，之后函数将会正常同步执行，将默认返回undefined 。

## 很容易犯的错误
即使你理解了async/await语法最终转换为的Promise代码，也很容易陷入这个陷阱。如果你还不了解Promise以及async/await到底在做什么，那就更不用说了。

不能说async/await是“不好的”(或者“有害的”)。特别是在没有像promise这样合理的API的语言中，或者在闭包中有其他限制，使promise不那么容易使用的语言中，async/await可以使代码总体上更具可读性。

但它们也有一个相当大的陷阱：它允许我们获取异步的东西，并假装它们是同步的。await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但await后的代码被阻塞。

这意味着代码可能会因为大量await的promises相继发生而变慢。每个await都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理（就像我们没有使用async/await时那样）。

一般async/await以一种可能永远不会被注意到的微妙方式出错：它只会影响性能，而不会影响正确性。

## 缓解问题
1. 如果你还不清楚你的代码怎么运行，去看浏览器的请求瀑布流，看看你是否可以提高程序运行速度。

2. 你也可以使用这个经验法则:如果一个await函数没有使用另一个await函数调用的结果(或从结果到处东西)，你应该使用Promise.all()使它们同步执行。

## 原文链接
* [Beware of Async/Await | Brandon's Website](https://www.brandonsmith.ninja/blog/async-await)
* [async和await:让异步编程更简单 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await)