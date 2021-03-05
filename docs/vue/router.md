### 迷惑的点
#### router 与 route
1. router为VueRouter实例，`只写对象`,想要导航到不同url,则使用router.push方法
```js
// router
// this.$router.push()
// this.$router.replace()
// this.$router.go()
```
2. route为当前router跳转对象,路由信息对象,`只读对象`,里面可以获取name、path、query、params等
```js
// route
// this.$route.query
// this.$route.params
```

#### params 与 query 
1. params 
刷新页面params丢失
```js
// 传参: 
this.$router.push({ name: 'index' params:{ id }})
// 接收参数:
this.$route.params.id
// url的表现形式(url中没有参数) http://localhost:8080/#/index
```
2. query
刷新页面query不丢失
```js
// 传参
this.$router.push({ path: '/index' query:{ id }})
//接收参数
this.$route.query.id
// url的表现形式(url中带有参数) http://localhost:8080/#/index?id=1
```
!> params传参,push里面只能是 name:'xx',不能是path:'xx',因为params只能用name来引入路由,如果这里写成了path,接收参数页面会是undefined

### 编程式导航
#### router.push(location, onComplete?, onAbort?)
想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。  
当你点击 <router-link> 时，router.push会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。  
```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

#### router.replace(location, onComplete?, onAbort?)
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，replace会替换掉当前的 history 记录。

| 声明式                            | 编程式              |
| --------------------------------- | ------------------- |
| `<router-link :to="..." replace>` | `router.replace(..` |

#### router.go(n)
在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
```

### 导航守卫
简单来说，导航守卫就是路由跳转过程中的一些钩子函数    
[官方文档](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
#### 全局前置守卫
```js
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
  // ...
})
```
#### 全局前置守卫
```js
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
  // ...
})
```
#### 全局解析守卫
在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
#### 全局后置钩子
```js
router.afterEach((to, from) => {
  // ...
})
```
#### 路由独享的守卫
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
#### 组件内的守卫
beforeRouteEnter    
beforeRouteUpdate (2.2 新增)    
beforeRouteLeave    
```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```