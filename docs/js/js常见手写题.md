# 平铺数组
1. 递归
```js
function flatten(array) {
  return array.reduce((acc, cur) => {
    cur = Array.isArray(cur) ? flatten(cur) : cur
    return acc.concat(cur)
  }, [])
}
// usage:
let res = flatten([1, 2, [2, [1, 3]]])
console.log(res);
```

2. 利用数组的API
```js
function flatten(array) {
  return array.flat(Infinity)
}
```

# 数组去重
1. ES6 Set
```js
function unique(array) {
  return Array.from(new Set(array))
}
```

2. 利用map结构去重
```js
function unique(array) {
  let map = {}
  return array.reduce((acc, cur) => {
    if (!map[cur]) {
      acc.push(cur)
      map[cur] = true
    }
    return acc
  }, [])
}
```

# 判断对象为空