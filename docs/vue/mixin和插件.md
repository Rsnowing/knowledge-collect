## 1. mixin
混入。分发组件中的可复用功能。
### 单个组件混入
```js
const mixin = {
  methods: {
    sayHello() {
      console.log('hello')
    }
  }
}

const vm = new Vue({
  mixins: [mixin],
  methods: {
    callHello() {
      this.sayHello() // hello
    }
  }
})
```

> 当组件和mixin中有同名选项时，=》选项合并。<br/>
选项合并原则： 
>1. data 发生冲突时 以组件数据优先。
2. 同名钩子函数将被合并为一个数组，都会被调用。且mixin的钩子将在组件自身钩子之前被调用。
3. 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
### 全局混入
```js
Vue.mixin({
  created: function () {
    console.log('created')
  }
})

```
!> 全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。 慎用乃至不用！推荐使用插件完成全局功能。

## 2. 插件
插件通常用来为vue添加全局功能。

### 使用插件
Vue.use()。需要在Vue初始化之前调用。Vue.use 会自动阻止多次注册相同插件，即使多次调用也只会注册一次该插件。
```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```
### 开发插件
vue的插件应该暴露一个install方法。
```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}

// 使用 
Vue.use(MyPlugin)
```
