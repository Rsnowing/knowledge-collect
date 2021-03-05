### Redux

#### Store

#### State

#### Action

#### Action Creator

### HOOK

```js
 Hook 是一个特殊的函数，它可以让你“钩入” React 的特性
 什么时候我会用 Hook？ 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其转化为 class。现在你可以在现有的函数组件中使用 Hook。
1. useState
2. useEffect
React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。
Effect Hook  可以让你在函数组件中执行副作用操作
useEffect 做了什么？ 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。
与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。
```

### React.FC

```js
FC是FunctionComponent的简写, 这个类型定义了默认的 props(如 children)以及一些静态属性(如 defaultProps)
```

### React 组合 & 继承

```js
props.children
```

### Dvajs

```js
dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。
1. 定义Model
namespace 表示在全局 state 上的 key
state 是初始值，在这里是空数组
reducers 等同于 redux 里的 reducer，接收 action，同步更新 state // 能改变界面的action应该放这里,这里按官方意思不应该做数据处理，只是用来return state 从而改变界面
effects 与后台交互，处理数据逻辑的地方
```



### 杂七杂八

```js
1. Partial
2. React 组件名必须大写开头
3. less中:global  => 允许使用:global(.className)的语法，声明一个全局规则。凡是这样声明的class，都不会被编译成哈希字符串。
4. new Date().getFullYear()
```



### TS 相关

```js
1. interface ?: 表示可选属性
2. interface名称需大写 AxxxBxxx
```



### 参考链接

[掘金](https://juejin.im/post/5cd7f2c4e51d453a7d63b715)

[阮一峰css module](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

