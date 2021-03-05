## 解释
bigint 属于基本数据类型。
JS 中Number表示的最大整数为2^53 - 1，可以写作Number.MAX_SAFE_INTEGER，如果超过了这个界限，可以用bigint来表示，它可以表示任意大的整数。
## 语法
* 在一个整数字面量后加n
* 调用函数BigInt()
```js
const theBiggestInt: bigint = 9007199254740991n
const alsoHuge: bigint = BigInt(9007199254740991)
const hugeString: bigint = BigInt("9007199254740991")
theBiggestInt === alsoHuge // true
theBiggestInt === hugeString // true
```

## BigInt 与 Number 的不同
* BigInt 不能用于Math对象中的方法
* BigInt 不能和任何Number实例混合运算，两者必须转换成统一类型
* BigInt 变量在转换为Number变量时可能会丢失掉精度
```js
const biggest: number = Number.MAX_SAFE_INTEGER
const biggest1: number = biggest + 1
const biggest2: number = biggest + 3
biggest1 === biggest2 // true => 因为精度丢失
```
```js
const biggest: bigint = BigInt(Number.MAX_SAFE_INTEGER)
const biggest1: bigint = biggest + 1n
const biggest2: bigint = biggest + 3n
biggest1 === biggest2 // false
```

## 类型信息
```js
typeof 18n // 'bigint'
typeof BigInt(10) // 'bigint'
```

## 注意
!> 不要在Number 与 BigInt 之间相互转换（会损失精度）；  
仅在值可能大于 2^53 - 1 时使用 BigInt。