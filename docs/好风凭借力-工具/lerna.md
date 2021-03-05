# lerna
## Monorepo单体式仓库 vs Multirepo
Monorepo 的全称是 monolithic repository，即单体式仓库，与之对应的是 Multirepo(multiple repository)，这里的“单”和“多”是指每个仓库中所管理的模块数量。

Multirepo 是比较传统的做法，即每一个模块都单独用一个仓库来进行管理。典型案例[webpack](https://github.com/webpack/webpack)
Monorep 是把所有相关的 module 都放在一个仓库里进行管理，每个 module 独立发布，典型案例[babel](https://github.com/babel/babel/tree/master/packages)


## 如何实现 monorepo？
目前业界最佳实践是采用yarn workspace + lerna 来实现。<br/>
yarn workspace可以实现在一个项目中实现多个模块的依赖新增和共用，而lerna的功能则更完善，不仅可以管理多个模块，还有清除模块node_modules，发布模块到npm，自动更新模块间版本依赖，并支持全量发布和根据改动单独发布等功能。

###  lerna常用命令
* lerna init 初始化 或 升级 当前仓库为 lerna 模式
* lerna create <package-name> -y 新增子包, -y表示默认选择yes配置
* lerna bootstrap 安装依赖，这个命令相当于 在每个packages/的包中，执行了npm install (当在顶层package.json中加了包的时候需要执行这个命令，否则子包无法同步安装的包)

#### 依赖管理
1. 安装
* yarn add --dev <module-name> -W 使用-W选项会将依赖安装到workspace的根目录下。
* 给某个模块安装包: yarn workspace <package-name> add xxx 或者 lerna add --scope=<package-name> xxx
* 为所有子模块安装包: lerna add xxx or lerna exec -- yarn add xxx
2. 卸载
* yarn workspace <module-name> remove xxx 或者 lerna exec --scpope=<module-name> -- yarn remove xxx 删除某个模块的包
* yarn remove -W xxx 删除根目录包
* lerna exec -- yarn remove xxx  为所有子包删除包
* lerna clean 删除所有子包的node_modules目录, 根目录的 node_modules 不会删除.

#### 其他
* lerna link convert 将包下的开发依赖包移到顶层package.json
* lerna run  XXX   会跑所有packages/下面的包中的相同命令
* lerna list 列出所有的包
* lerna changed 在代码都commit之后 列出有修改的包，（如果修改没有提交，则是no change）
* lerna publish 发布包

### 问题
* 如何忽略发布一个包?

## yarn 相关知识补充
### 命令
* yarn 
* yarn add [package] (--dev 表示开发依赖)
* yarn remove [package]
* yarn cache clean [package]



## 参考链接
* [参考](http://blog.runningcoder.me/2018/08/17/learning-lerna/)    
* [掘金](https://juejin.im/post/5a989fb451882555731b88c2)
* [官方文档](https://lerna.js.org/)
* [从npm迁移至yarn](https://classic.yarnpkg.com/zh-Hans/docs/migrating-from-npm/)