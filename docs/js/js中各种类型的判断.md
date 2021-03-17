# 类型判断大集合 🌸

## 一. 原始类型
### 1. String
```js
typeof instance === "undefined"
```

### 2. Boolean
```js
typeof instance === "boolean"
```

### 3. Number
```js
typeof instance === "number"
```

### 4. undefined
```js
typeof instance === "undefined"
```

### 5. Symbol
```js
typeof instance === "symbol"
```

### 6. BigInt
```js
typeof instance === "bigint"
```

## 二. null
```js
typeof instance === "object"
```
## 三. Object
```js
typeof instance === "object"
```

### 1. Array
```js
Array.isArray(instance)
```

### 2. Map

### 3. Set

### 4. WeakMap

### 5. WeakSet

## 四. Function
非数据结构，尽管 typeof 操作的结果是：typeof instance === "function"。这个结果是为 Function 的一个特殊缩写，尽管每个 Function 构造器都由 Object 构造器派生。
```js
typeof instance === "function"
```


## 通过toString方法判断类型
```js
function toRawType(value) {
  let _toString = Object.prototype.toString;

  let str = _toString.call(value);

  return str.slice(8, -1);
}
```
toString 方法
```js
Object.prototype.toString.call('') ;  // [object String]
Object.prototype.toString.call(1) ;   // [object Number]
Object.prototype.toString.call(true) ;// [object Boolean]
Object.prototype.toString.call(Symbol());//[object Symbol]
Object.prototype.toString.call(undefined) ;// [object Undefined]
Object.prototype.toString.call(null) ;// [object Null]
Object.prototype.toString.call(newFunction()) ;// [object Function]
Object.prototype.toString.call(newDate()) ;// [object Date]
Object.prototype.toString.call([]) ;// [object Array]
Object.prototype.toString.call(newRegExp()) ;// [object RegExp]
Object.prototype.toString.call(newError()) ;// [object Error]
Object.prototype.toString.call(document) ;// [object HTMLDocument]
Object.prototype.toString.call(window) ;//[object global] window 是全局对象 global 的引用
```

## 其他常见的判断
### 1. 判断对象为空 {}
```js
// Object.keys length为0
Object.keys(obj).length === 0

// JSON.stringify
JSON.stringify(obj) === '{}'

// for...in 遍历
for(const i in obj) {
  // 如果不为空 会进入这里,可以使用一个标志判断
}
```

### 2. 判断数组为空[]
```js
// Object.keys
Object.keys(arr).length === 0

// length
arr.length === 0

```

## 参考链接
* [原始数据 - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)
* [JavaScript 数据类型和数据结构 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)