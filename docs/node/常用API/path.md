## path 操作路径对象
path不在全局作用域中，需要先引入
```js
const path = require('path')
```

### 方法

#### 1. path.basename(path[,ext])
获得文件名及文件后缀，ext是文件后缀，若ext与实际文件后缀匹配则不输出文件后缀，否则忽略ext
 ```js
const basename1 = path.basename('/a/b/c/d/index.html')
const basename2 = path.basename('/a/b/c/d/index.html','.html')
const basename3 = path.basename('/a/b/c/d/index.html','.css') // 第二个参数会被忽略
console.log(basename1, basename2, basename3)
// 输出index.html  index  index.html
```

#### 2. path.dirname(path)
获得不带文件名的文件路径
```js
const dirname = path.dirname('/a/b/c/d/index.html')
console.log(dirname)
// 输出 /a/b/c/d
```

#### 3. path.extname(path)
获得文件后缀名
```js
const extname = path.extname('/a/b/c/d/index.html')
console.log(extname)
// 输出 .html
```

#### 4. path.parse(path)
将路径字符串转换为路径对象
```js
const pathObj = path.parse('E:\\a\\b\\c\\d\\index.html')
console.log(pathObj)
/* 输出
 * { 
 *  root: 'E:\\', // 文件根目录
 *  dir: 'E:\\a\\b\\c\\d', // 不带文件名的文件路径
 *  base: 'index.html', // 文件名
 *  ext: '.html', // 文件后缀
 *  name: 'index' // 不带后缀的文件名
 * }
 */
```

#### 5. path.format(pathObj)
将路径对象转换为路径字符串
```js
const pathObj = {
  root: 'E:\\',
  dir: 'E:\\a\\b\\c\\d',
  base: 'index.html',
  ext: '.html',
  name: 'index'
}
console.log(path.format(pathObj))
// 输出 E:\a\b\c\d\index.html
// 注意：路径对象的每个属性不是必须的，提供了dir属性时会忽略root属性，提供了base属性时会忽略ext与name属性
```

#### 6. path.isAbsolute(path)
判断路径是否是绝对路径
```js
console.log(path.isAbsolute('E:/a/b/c/d\index.html'))
console.log(path.isAbsolute('./a/b/c/d\index.html'))
// 输出 true false
```

#### 7. path.join([...paths])
接收一组路径，并拼接为一个路径，../表示返回上一级目录，./表示同级目录<br/>
该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
```js
console.log(path.join('/a/b/c/d','../','./','index.html'))
// 输出 \a\b\c\index.html
```

#### 8. path.relative(from, to)
接收两个路径，返回第一个路径到第二个路径的相对路径
```js
const to = 'C:\\ll\\test\\aaa'
const from = 'C:\\ll\\impl\\bbb'
console.log(path.relative(to, from))
// 输出 ..\..\impl\bbb
```

#### 9. path.resolve([...paths])
将路径或路径片段的序列解析为绝对路径。
```js
path.resolve('/目录1/目录2', './目录3');
// 返回: '/目录1/目录2/目录3'

path.resolve('/目录1/目录2', '/目录3/目录4/');
// 返回: '/目录3/目录4'
path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif');
// 如果当前工作目录是 /目录A/目录B，
// 则返回 '/目录A/目录B/目录1/目录2/目录4/文件.gif'
```

### 属性
#### 1. path.delimiter
环境变量分隔符
```js
console.log(path.delimiter)
// windows下输出; Linux下是:
```

#### 2. path.sep
路径分隔符
```js
console.log(path.sep)
// windows下输出\ Linux下是/
```