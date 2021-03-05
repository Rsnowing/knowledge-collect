# nvm使用
## 安装
[github地址](https://github.com/coreybutler/nvm-windows/releases)

> 尽量不要安装在C盘，否则后面安装node及其它插件和调用只能使用管理者权限

## 常用命令

* nvm version
* nvm ls 查看本地已安装的node版本
* nvm ls available 查看可安装的版本,只会展示部分,大概20个
* nvm install 10.6.0 安装指定版本nodejs
* nvm use 10.6.0 切换到制定版本
* nvm uninstall 10.6.0 卸载指定版本 卸载前先切换到别的版本
* 


## 配置全局包安装路径
1. npm config set prefix "C:\Users\win10\AppData\Roaming\npm"   
2. npm config set cache "C:\Users\win10\AppData\Roaming\npm_cache"   
3. 在系统变量中新增NODE_PATH，变量值为设置的安装路径下的C:\Users\win10\AppData\Roaming\npm\node_modules
4. 设置用户变量 在path中新增 C:\Users\win10\AppData\Roaming\npm


这样所有node就可以将全局包共享了

## 配置镜像安装
nvm安装目录，编辑settings.txt文件添加node_mirror: https://npm.taobao.org/mirrors/node/


## 其他node版本管理工具
* n 不支持windows 告辞