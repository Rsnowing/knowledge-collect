## npm 常用命令
* npm root -g 查找node包安装的全局目录
* npm root 查找本项目下node包安装的目录
* npm config set register XXX
* npm config list
* npm config ls
* npm prune 清除未被使用的模块
* npm install --loglevel=error  安装时忽略警告(不打印),只打印错误日志
* npm install --silent 忽略警告和错误


### 用户
* npm adduser
* npm whoami

### npm源
* npm config get registry
* npm config set registry XXX

### 发布
* npm publish 发布
* npm publish --access public 当包名为@XXX 时 npm默认为私有包，在package.json里设置了"publishConfig": { "access": "public" } 也没有用，用此命令即可
* npm unpublish 包名@版本号 删除指定版本
* npm unpublish 包名 --force  删除整个包

### 包相关信息

#### 查看远程包
* npm info img-tiny 查看npm上img-tiny的信息
* npm view img-tiny versions 查看npm上img-tiny的所有版本信息
* npm view img-tiny version 查看npm上img-ting最新版本

#### 查看本地包
* npm ls img-tiny 当前目录下img-tiny的相关信息，如果当前目录没有安装img-tiny返回empty
* npm ls img-tiny -g 查看全局安装的img-tiny的相关信息

#### 更新
* npm update -g img-tiny 更新全局安装的img-tiny
* npm update img-tiny 更新当前目录下安装的img-tiny
* npm outdated 查看项目下所有可更新包

#### 卸载
* npm uninstall img-tiny 卸载当前目录的包
* npm uninstall img-tiny -g 卸载当全局包

### nrm
```
npm i nrm -g
```
* nrm ls // 查看所有的npm 源
* nrm use taobao  // 切换源

### 参考
* [config | npm Docs](https://docs.npmjs.com/cli/v6/using-npm/config)