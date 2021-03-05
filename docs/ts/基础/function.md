## 功能
函数类型 可选参数 默认参数 剩余参数 函数重载
## 函数类型
在 TypeScript 中编写函数，需要给形参和返回值指定类型：
```js
const add = function(x: number, y: number): string {
  return (x + y).toString()
}
```
## 函数参数
### 1. 参数个数保持一致
TypeScript 中每个函数参数都是必须的。编译器会检查用户是否为每个参数都传入了值。
### 2. 可选参数
JS中每个参数都是可选的，可传可不传，未传时表示undefined。  
TS中参数名旁使用?实现可选参数的功能。 `可选参数必须跟在必须参数后面`。
```ts
const fullName = (firstName: string, lastName?: string): string => `${firstName}${lastName}`
let result1 = fullName('Sherlock', 'Holmes')
let result2 = fullName('Sherlock')
```
### 3. 默认参数
`带默认值的参数位置随意`
```js
const token = (expired = 60*60, secret: string): void  => {}
// 或
const token1 = (secret: string, expired = 60*60 ): void => {}
```
### 4. 剩余参数
rest参数【形式 ...变量名 】  `rest参数只能是最后一个参数`
```js
function assert(ok: boolean, ...args: string[]): void {
  if (!ok) {
    throw new Error(args.join(' '));
  }
}
assert(false, '上传文件过大', '只能上传jpg格式')
```
### 5. this参数

## 函数重载
函数根据传入不同的参数，返回不同类型的数据。

>  如果一个函数没有使用 return 语句，则它默认返回 undefined。

