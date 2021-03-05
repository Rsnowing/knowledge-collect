Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构　　  
集合是由一组无序且唯一(即不能重复)的项组成的。
## Set
### 属性
```js
Set.prototype.size // 返回 Set 对象中的值的个数
```
### 实例方法
```js
Set.prototype.add(value) // 在Set对象尾部添加一个元素。返回该Set对象。
Set.prototype.clear() // 移除Set对象内的所有元素。
Set.prototype.delete(value)
Set.prototype.entries()
Set.prototype.forEach(callbackFn[, thisArg])
Set.prototype.has(value)
Set.prototype.keys()
Set.prototype.values()
```

### 迭代
#### for...of
#### forEach

### 与数组相关
```JS
let myArray = ["value1", "value2", "value3"];
// 用Set构造器将Array转换为Set
let mySet = new Set(myArray);
mySet.has("value1"); // returns true
// 用...(展开操作符)操作符将Set转换为Array
console.log([...mySet]); // 与myArray完全一致
```

### 数组去重
```js
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
console.log([...new Set(numbers)]) 
// [2, 3, 4, 5, 6, 7, 32]
```

### String相关
```js
let text = 'India';
let mySet = new Set(text);  // Set {'I', 'n', 'd', 'i', 'a'}
mySet.size;  // 5
// 大小写敏感 & duplicate ommision
new Set("Firefox")  // Set(7) [ "F", "i", "r", "e", "f", "o", "x" ]
new Set("firefox")  // Set(6) [ "f", "i", "r", "e", "o", "x" ]
```


## 参考链接
[掘金](https://juejin.im/post/5acc57eff265da237f1e9f7c)  
[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)