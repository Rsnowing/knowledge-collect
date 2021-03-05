
# Vue.extend 和 Vue.component
## 1. Vue.extend
使用Vue构造器，创建vue子类。 <br/>
使用场景：像alert这种组件需要使用js去调用，不能在页面一渲染时就挂载，这个时候需要使用Vue.extend + vm.$mount组合 <br/>
首先来定义这个弹框的结构和样式，就是正常的写组件即可:
```vue
// index.vue
<template>
  <div class="grid">
    <h1 class="head">这里是标题</h1>
    <div class="footer">
      <div @click="handleCancel">{{ cancelText }}</div>
      <div @click="handleConfirm">{{ sureText }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Test",
  props: {
    close: {
      type: Function,
      default: () => {}
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    sureText: {
      type: String,
      default: "确定"
    }
  },
  methods: {
    handleCancel() {
      alert("取消");
      this.close();
    },

    handleConfirm() {
      alert("确定");
      this.close();
    }
  }
};
</script>
<style lang="scss" scope>
.grid {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  padding: 20px;
  .footer {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
  }
}
</style>

```
将创建构造器和挂载到目标元素上的逻辑抽离出来，多处可以复用
```js
// index.js
import Vue from "vue";
import Alert from "./index.vue";

const AlertConstructor = Vue.extend(Alert);
let instance;
const AlertTest = function(options) {
  let userClose = options.close;
  options.close = () => {
    AlertTest.close(userClose);
  };
  instance = new AlertConstructor({
    propsData: { ...options }
  });
  const div = document.createElement("div");
  document.body.appendChild(div);
  instance.$mount(div);
};

AlertTest.close = callback => {
  instance.$el.remove();
  // 用户自定义回调
  callback && callback();
};
export default AlertTest;

```
使用：
```js
import AlertTest from "./index.js";

handleOpen() {
  AlertTest({
    cancelText: "cancel",
    close: () => {
      console.log('自定义回调');
    }
  });
}
```
注意： 
* Vue.extend 获得是一个构造函数，可以通过实例化生成一个 Vue 实例<br/>
* 实例化时可以向这个实例传入参数，但是需要注意的是 props 的值需要通过 propsData 属性来传递
* 得到 Vue 实例后，我们需要通过一个目标元素来挂载它，有人首先会想到挂载到 #app 上，这个挂载的过程是将目标元素的内容全部替换，所以一旦挂载到 #app 上，该元素的所有子元素都会消失被替换
* 针对第3点，所以创建了一个 div 元素插入到 body 中，我们将想要挂载的内容替换到这个div上

## 2. Vue.component
注册或获取全局组件。
```js
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```

## 参考链接
[Vue.extend 编程式插入组件](https://juejin.im/post/6844903998672076813)