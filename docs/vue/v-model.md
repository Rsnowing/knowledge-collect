## vue 在自定义组件上使用v-model
很惭愧，最近才想到怎么在组件上使用v-model，之前都是依赖父子组件之间的传值和调用方法

### 父组件
```js
<Upload v-model="imgList"></Upload>
```

### 子组件
```js
// props
props: {
  imgList: {
    type: Array,
    default: () => []
  },
}

// model
model: {
  prop: "imgList", //绑定的值，通过父组件传递
  event: "success" //自定义事件名
},

// 方法
changImg() {
  this.$emit( "success", [XXX, XXX] );
}
```
