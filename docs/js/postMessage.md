### 解释
window.postMessage()方法可以安全地实现跨源通信。    
通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。
### 语法
```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```
1. otherWindow
窗口的一个引用,比如iframe的contentWindow属性,执行window.open返回的窗口对象,或者是命名过的或数值索引的window.frames.
2. message
要发送到其他窗口的数据,
3. targetOrigin
通过窗口的origin属性来指定哪些窗口能接收到消息事件,指定后只有对应origin下的窗口才可以接收到消息,设置为通配符"*"表示可以发送到任何窗口,但通常处于安全性考虑不建议这么做.如果想要发送到与当前窗口同源的窗口,可设置为"/"
4. transfer  可选属性
是一串和message同时传递的Transferable对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权.

### 数据发送： postMessage
```js
const iframeWin = document.getElementById('iframe').contentWindow
// 向该窗口发送消息
iframeWin.postMessage({ a: 1, b: 2 }, '/')
```
### 数据接收： 监听message事件的发生
```js
window.addEventListener("message", receiveMessage, false) ;
function receiveMessage(event) {
    var origin= event.origin;
    console.log(event);
}
```

### 一点拓展
addEventListener与onXXX 的区别
1. addEventListener()的用法：（同一个 dom 元素上，addEventListener 同/不同类型事件可以绑定多个。）

2. onxxxx事件会被后面的onxxxx相同的事件覆盖；addEventListener则不会覆盖。

### 参考链接
[掘金-postMessage可太有用了](https://juejin.im/post/5b8359f351882542ba1dcc31)