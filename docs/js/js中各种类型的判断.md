# 类型判断大集合 🌸

## 原始类型
### 1. String
```js
typeof instance === "undefined"
```

### 2. Boolean

### 3. number

### 4. undefined
```js
typeof instance === "undefined"
```

### 5. Symbol

### 6. BigInt

## null
## Object

### 1. Array
### 2. Map

### 3. Set

### 4. WeakMap

### 5. WeakSet

## Function
非数据结构，尽管 typeof 操作的结果是：typeof instance === "function"。这个结果是为 Function 的一个特殊缩写，尽管每个 Function 构造器都由 Object 构造器派生。


## 参考链接
* [原始数据 - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)
* [JavaScript 数据类型和数据结构 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)