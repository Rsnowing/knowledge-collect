Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构　　  
集合是由一组无序且唯一(即不能重复)的项组成的。
## Map
Map是一组键值对的结构，具有极快的查找速度。  
如果需要键值对的数据结构，Map比Object更合适。
### Map 与 Object区别

|         | Map                                                          | Object                                                       |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| key值   | 默认情况下不包含任何键,只包含显示插入的键                    | 一个 Object 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见 |
| key类型 | 任意类型                                                     | string/symbol                                                |
| key顺序 | Map 中的 key 是有序的。因此，当迭代的时候，一个 Map 对象以插入的顺序返回键值。 | 无序                                                         |
| size    | 键值对个数可以轻易地通过size 属性获取                        | Object 的键值对个数只能手动计算                              |
| 迭代    | Map 是 iterable 的，所以可以直接被迭代。                     | 迭代一个Object需要以某种方式获取它的键然后才能迭代。         |
| 性能    | 在频繁增删键值对的场景下表现更好。                           | 在频繁添加和删除键值对的场景下未作出优化。                   |

### 使用
```js
let myMap = new Map()
let keyObj = {};
let keyFunc = function() {};
let keyString = 'key1';
// 添加键
myMap.set(keyString, '哈哈参加')
myMap.set(keyFunc, '函数key')
myMap.set(keyObj, '对象key')
// 获取键值对个数
myMap.size // 2
// 读取值
myMap.get('key1') // 哈哈参加
myMap.get(function() {}); // undefined, 因为keyFunc !== function () {}
myMap.get({}); //undefined, 因为keyObj !== {}
```
### 属性
```js
Map.prototype.constructor
Map.prototype.size
```
### 方法
```js
Map.prototype.clear() // 移除所有键值对
Map.prototype.delete(key) // 移除特定键值对
Map.prototype.entries() // 
Map.prototype.forEach(callbackFn[, thisArg])
Map.prototype.get(key) // 获取特定key对应的value,不存在则返回undefined
Map.prototype.has(key) // 返回一个布尔值，表示Map实例是否包含键对应的值。
Map.prototype.keys() // 返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
Map.prototype.set(key, value) // 设置Map对象中键的值。返回该Map对象。
Map.prototype.values() // 返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 
Map.prototype[@@iterator]()
```

### 迭代
#### for...of
```js
for (let obj of myMap) {
  console.log(key);
}
```
#### forEach
```js
myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
})
```

### Map与数组
```js
let kvArray = [["key1", "value1"], ["key2", "value2"]];
// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
let myMap = new Map(kvArray);
myMap.get("key1"); // 返回值为 "value1"
// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和kvArray相同的数组
// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);
// 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```

### 复制或合并Maps
```js
let original = new Map([
  [1, 'one']
]);
let clone = new Map(original);
console.log(clone.get(1)); // one
console.log(original === clone); // false. 浅比较 不为同一个对象的引用
```
```js
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);
// 合并两个Map对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开运算符本质上是将Map对象转换成数组。
let merged = new Map([...first, ...second]);
```
!> 尽量不要使用 map['key'] = XXX 这种赋值方式

## Set
Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。

## 参考链接
[掘金](https://juejin.im/post/5acc57eff265da237f1e9f7c)  
[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)