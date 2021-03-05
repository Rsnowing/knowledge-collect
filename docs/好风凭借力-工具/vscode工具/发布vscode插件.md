## 发布
### 发布方式
1. 直接把文件夹发给别人，让别人找到vscode的插件存放目录并放进去，然后重启vscode，一般不推荐；
2. 打包成vsix插件，然后发送给别人安装，如果你的插件涉及机密不方便发布到应用市场，可以尝试采用这种方式
3. 注册开发者账号，发布到官网应用市场，这个发布和npm一样是不需要审核的。

### 本地打包
无论是本地打包还是发布到应用市场都需要借助vsce这个工具。
```shell
npm i vsce -g
```
打包成vsix文件
```shell
vsce package
```
生成好的vsix文件不能直接拖入安装,只能从拓展右上角-> 更多 ->从vsix安装
### 发布到应用市场
Visual Studio Code的应用市场基于微软自己的Azure DevOps，插件的身份验证、托管和管理都是在这里。
* 要发布到应用市场首先得有应用市场的publisher账号；
* 而要有发布账号首先得有Azure DevOps组织；
* 而创建组织之前，首先得创建Azure账号；
* 创建Azure账号首先得有Microsoft账号

太绕了 一步步来:
1. 访问 [https://login.live.com/](https://login.live.com/) 登录你的Microsoft账号，没有的先注册一个：
2. 访问  [https://aka.ms/SignupAzureDevOps](https://aka.ms/SignupAzureDevOps) ,按提示操作进行创建组织
3. 创建令牌。 要注意Organization要选择all accessible organizations，Scopes要选择Full access，否则后面发布会失败。
4. 创建发布账号。获得个人访问令牌后，使用vsce以下命令创建新的发布者：
```shell
vsce create-publisher 发布者名称
```
如果你已经有账号了，直接登录
```shell
vsce login 发布者名称
```
5. 发布
```shell
vsce publish
```
增量发布： 如果想让发布之后版本号的patch自增，例如：1.0.2 -> 1.0.3，可以这样：
```shell
vsce publish patch
// or
vsce publish minor
```
6. 取消发布
```shell
vsce unpublish 发布者名称.插件名称
```
7. 更新
如果修改了插件代码想要重新发布，只需要修改版本号然后重新执行vsce publish即可。


### 发布注意项
* README.md文件默认会显示在插件主页；
* README.md中的资源必须全部是HTTPS的，如果是HTTP会发布失败；
* CHANGELOG.md会显示在变更选项卡；
* 如果代码是放在git仓库并且设置了repository字段，发布前必须先提交git，否则会提示Git working directory not clean；

## 开发
最理想的方式是准备双显示器，一个写代码，一个运行插件，实践证明这种方式开发效率会提升很多，每次修改完代码之后直接Ctrl+R重新加载即可，非常方便。

按下F5即可打开拓展开发宿主环境

## 查看插件存放目录
插件安装后根据操作系统不同会放在如下目录
* Windows系统：%USERPROFILE%\.vscode\extensions
* Mac/Linux：~/.vscode/extensions

### 我的vscode插件 收集vscode正则代码片段
https://marketplace.visualstudio.com/items?itemName=llhe.reg-collect

### 参考链接
* [官方-发布插件](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/working-with-extensions/publish-extension)
* [demo](https://www.jianshu.com/p/c8186cc6fc45)
* [官方github示例demo] (https://github.com/microsoft/vscode-extension-samples)
* [VSCode插件开发全攻略（十）打包、发布、升级-好记的博客](http://blog.haoji.me/vscode-plugin-publish.html)
* [sxei/vscode-plugin-demo: VSCode插件开发全攻略配套demo](https://github.com/sxei/vscode-plugin-demo)
* [VS Code API | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/vscode-api)