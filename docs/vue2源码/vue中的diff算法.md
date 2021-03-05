# vue中的diff算法
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。

## virtual DOM和真实DOM的区别？
virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。比如dom是这样的：
```html
<div>
  <p>123</p>
</div>
```
对应的virtual DOM（伪代码）：
```js
var Vnode = {
  tag: 'div',
  children: [
      { tag: 'p', text: '123' }
  ]
};
```
## diff的比较方式
在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。(深度优先)


## Vue中的key作用解析
1. 本质作用主要是为了更加高效的更新Virtual Dom。
2. Vue在进行打补丁操作得时候首先会进行判断两个节点是否相同得过程种，key是一个必要条件（此处可以参考源码），假如没有进行定义key值的话，Vue只能默认当作相同节点来进行处理，哪怕他们不是，这样做会导致不必要的元素更新，使得整个打补丁的过程中性能比较低效。（打补丁–> patch --> diff 本质上同一回事儿）
```js
// vue源码
function sameVnode (a , b){
  // 必要条件
	return (
	a.key === b.key && (
	    //判断标签类型
		a.tag === b.tag &&
		a.isComment === b.isComment &&
		isDef(a.data) === isDef(b.data) &&
		sameInputType(a,b)
    ) || (
		isTrue(a.isAsyncPlaceholder) && 
		a.asyncFactory === b.asyncFactory  &&
		isUndef(b.asyncFactory.error)
	)
  )
}
```
3. 在实际使用中渲染一组列表时key值必须使用，而且时唯一性标识，在实际使用过程中应该避免使用数组的索引来当作key值，可能会出现一些隐藏的bug,Vue中再使用相同的元素进行过度切换的时候，也会使用key值属性，目的也是为了可以进行区分他们，否则Vue只会替代内部属性而不会触发过渡效果（主要在动画方面来说）

4. 从源码解析的角度可以了解到，Vue判断两个元素的节点是否是同一个主要依据就是元素的类型还有key,如果不设置的话为undefined,造成的效果就是永远认为这两个节点是同一个节点，只能去做更新dom会造成大量的dom更新，明显是不可取的。

## 参考
* [详解vue的diff算法](https://juejin.cn/post/6844903607913938951)