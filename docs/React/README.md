### JSX
JS + XML 语法糖 需要Babel编译。Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
注意，网页中实时将ES6代码转为ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

### 插值表达式
* 表达式： 运行之后会返回一个值   
* 输出类型
    字符串 数字=》原样输出  
    布尔值 空 未定义 =》 忽略
### 条件输出
三元表达式、短路运输符&&
### 列表渲染
* jsx不能写循环语句for while
* 可以接受数组 arr.map(item => XXXxXX) 数组只能使用有返回值的api
* 对象 Object.keys(obj).map(item => XXX)

### 基于自动化的集成环境模式 create-react-app 脚手架

### 编辑器高亮

### JSX语法

```js
// jsx不是html,写法与html有区别
0. 只有一个顶层元素
1. 类名
className="div"
动态类名
3. 行内样式style接受一个对象
style={{color: 'red'}}
4. 列表渲染必须加key
5. 标签一定要闭合
6. 事件处理 onClick必须使用preventDefault 阻止默认行为
7. 谨慎对待JSX中的this.在JS中class的方法默认不会绑定this
破解方法：箭头函数、 class fields 语法
1). <div onClick={ () => this.handleClick }> </div>
2) handleClick = () => {
    console.log('this is:', this);
  }
8. 向事件处理程序传递参数
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### 组件

```js
0. 类式组件
必须要继承自React.component
必须要有render方法
1. 函数式组件 
props 从参数传入
在16.7之前，函数组件没有状态，只能用于纯渲染
16.7 Hooks
2. 组件的首字母大写，属性小写
3. setState修改组件数据， 不要直接通过this.state.XXX 修改数据
```

### 组件通信

```js
1. 父-》子 ： props
2. 子 -》 父 【单向数据流】： 调用方法
3. 同级
4. 跨组件通信 context 【面试考点】
import { createContext } from 'react'
createContext(defaultValue)
Context.provider 在父组件调用Provider传递数据
接受数据：
class.contextType = Context
static contextType = Context
Context.Consumer
```

### 生命周期

```js
componentWillMount 在组件渲染之前执行
componebtDidMount 在组件渲染之后执行
shouldComponentUpdate 需要返回true or false， true -> 允许改变，false不允许
componentWillUpdate 数据(data,props)在改变之前执行
componentDidUpdate 数据完成修改
componentWillReceiveProps props发生改变执行
componentWillInmount 组件卸载前执行
```

### 添加事件

```js
1. 驼峰命名
2. 事件处理函数中的this,默认是undefined  =》 用箭头函数
```

### setState 是同步还是异步

```js
increment = () => {
    this.setState({
        count: this.state.count + 1
    }, () => {
        console.log(this.state.count) // 获取的是改变后的值
    })
   console.log(this.state.count) // 获取的是改变前的值
}
// 另外的方案
 setStateAsync(state) {
    return new Promise(resolve => {
        this.setState(state, resolve)
    })
}
increment = async () => {
    await this.setStateAsync({count:this.state.count + 1 })
    console.log(this.state.count)
}
```

### 受控表单 

使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```js
const handleChange = (e) => {
     this.setState({
         value: e.target.value
     })
}
<input type="text" value={this.state.value} onChange={this.handleChange}>
    
// 非受控组件

```

### refs & DOM

```js
// 需要获取DOM的情况
1. 管理焦点，文本选择或媒体播放
2. 触发强制动画
3. 集成第三方DOM库
constructor() {
    super()
    this.HelloDiv = React.createRef()
}
componentDidMount() {
    this.HelloDiv.current.style.color = 'red'
}
<div ref={this.HelloDiv}>
    hello
</div>
// 不能在函数组件上使用 ref 属性，因为他们没有实例。
// ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。

```

### 非受控组件

```js
constructor() {
    super()
    this.username = React.createRef()
}
<input type="text" value={this.username}>
// 获取 this.username.current.value
    // 一般推荐使用受控组件
```

### 状态提升

```js
将状态提升到父组件
```

### 组合 VS 继承

```js
// 推荐使用组合实现组件间的代码重用。
1. 组合
this.props.children
2. 继承
```

### 使用PropTypes进行类型检测

```js
增强程序的健壮性  => ts
import PropTypes from 'prop-types';
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
        {title}
    );
  }
}
Greeting.propTypes = {
  name: PropTypes.string, // 类型
    age: PropTypes.number..isRequired  // 必选项
    title: '默认值' // 默认值
};
```

### fetch

```js
qs.stringify
```

### 跨域的解决方案

```js
# 开发模式
常用的框架都会提供解决方案 proxy
create-react-app => 在package。json中配置proxy
安装http-proxy-middleware
https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/proxying-api-requests-in-development.md
# 生成模式
jsonp、 cors、iframe postMessage
```

### Router

```js
// https://reactrouter.com/web/guides/quick-start
npm i react-router-dom
哈希地址 HashRouter 锚点链接 带# 号
BrowserRouter: h5新特性， /history.push  如果上线之后需要后台做重定向 404

exact  strict
Redirect 重定向
Prompt 钩子
withRouter 将组件由路由管理
<Link activeclassname="selected" 
    to={{
        pathname: "/home",
        search: "?sort=name",
        hash: "#the-hash",
        state: { fromDashboard: true }
    }}>
    首页
</Link>	
this.props.history.push('/')
this.props.history.replace('/') // 替换 上一次页面不存在history中
```






### 需要看的
```js
1. createElement
React.js提供React.js的核心功能代码，如虚拟dom，组件
React.createElement(type, props, children)
ReactDOM 提供了与浏览器交互的DOM功能，如DOM渲染
ReactDOM.render(element, container, [, callback])
2. setState 每次在组件中调用 setState 时，React 都会自动更新其子组件。
3. 纯函数
```

## 杂七杂八学到的
```js
1. del * 删除文件夹下所有文件
2. vscode setting.json配置jsx自动闭合 "emmet.includeLanguages": {"javascript":"javascriptreact" }
3. import React { Component } from 'react'
```

## 参考链接
[Babel 入门教程 - 阮一峰](http://www.ruanyifeng.com/blog/2016/01/babel.html)
[React router 教程](https://reactrouter.com/web/guides/quick-start)
[Redux 中文文档](https://www.redux.org.cn/)