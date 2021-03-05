## Chrome 调试技巧收集 🌶

### $0
在 Chrome 的 Elements 面板中，$0 是当前我们选中的 html 节点的引用。<br/>
$1 就是我们上一次选择的节点的引用，$2 是在那之前选择的节点的引用，等等。一直到 $4

### $
如果你没有在 App 中定义过 $ 变量 (例如 jQuery )的话，它在 console 中就是对 document.querySelector 的别名。

### $_
$_ 是对上次执行的结果的引用。

### $i
安装chrmoe插件[Console Importer
](https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie) 之后，就可以在控制台玩一些npm库啦

### copy 
在控制台复制变量 
copy(location)

### h
元素面板中选中元素 可以按下 h 切换显示隐藏

### ctrl +　上下箭头　
移动dom，拖动DOM节点也可以

### console 快照 vs 引用
之前有出现过在vue中 打印对象修改前和修改后 在控制台显示的是一样的值。 现在我是85版本的chrome 好像没有这个问题了

### ctrl + shift + p
弹出命令面板

### 控制台打印显示时间
ctrl + shift + p 输入 time 选择 show timeStamps

### 控制台方法queryObjects
显示对象的实例数  queryObjects(Person)

### ctrl + [  or ] 左右切换devvtools面板

### style增加数字
* 上下箭头 步长为1 
* ctrl + 上下箭头 步长为100<br/>
* alt + 上下箭头 步长为0.1
* shift + 上下箭头 步长为10

### 重新发送XHR请求
请求列表 右键 replay xhr

### 展开所有dom结构
alt + 点击 dom节点旁边的小三角

### console 打印, 再也不用console里面加1，2，3区分了！
```js
let a = 1
console.log({a})
```

### 切换控制台抽屉 esc 键

### 调试相关
* F8  or  Ctrl + \: 暂停/继续
* F10  or  Ctrl + ': 单步执行
* F11  or Ctrl +;: 单步进入
* Shift + F11  or Ctrl + Shift+;: 单步退出
* Ctrl +./Ctrl+, : 上一帧/下一帧
* Ctrl +Shift+E: 被选中代码在控制台中打印出console信息(非常实用)
* Ctrl + Shift + A: 添加到debugger的watch里面,可以关注你选中内容的变化
* Ctrl + B: 打断点/取消断点(很实用)

## 参考链接
* [你不知道的Chrome调试工具技巧-系列-有趣有趣！！](https://juejin.im/post/6844903732874854414)
* [console所有的api](https://developers.google.cn/web/tools/chrome-devtools/console/api)