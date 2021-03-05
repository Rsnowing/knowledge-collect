## 常用字段详解

### 必填字段
name,version

### 其余重要字段
```js
1. bin 
bin项用来指定各个内部命令对应的可执行文件的位置。
2. config
3. files
4. module
```

### package-lock.json
>package-lock.json 中已经缓存了每个包的具体版本和下载链接，不需要再去远程仓库进行查询，然后直接进入文件完整性校验环节，减少了大量网络请求。

>开发系统应用时，建议把 package-lock.json 文件提交到代码版本仓库，从而保证所有团队开发者以及 CI 环节可以在执行 npm install 时安装的依赖版本都是一致的。

>在开发一个 npm包 时，你的 npm包 是需要被其他仓库依赖的，由于上面我们讲到的扁平安装机制，如果你锁定了依赖包版本，你的依赖包就不能和其他依赖包共享同一 semver 范围内的依赖包，这样会造成不必要的冗余。所以我们不应该把package-lock.json 文件发布出去（ npm 默认也不会把 package-lock.json 文件发布出去）。

## 参考链接

* [阮一峰](https://javascript.ruanyifeng.com/nodejs/packagejson.html#toc4)
* [package.json知多少，写的特好！](http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%EF%BC%88%E4%BA%8C%EF%BC%89package.json%E7%9F%A5%E5%A4%9A%E5%B0%91%EF%BC%9F.html#man)

