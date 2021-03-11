相对于loader转换指定类型的模块功能，plugins能够被用于执行更广泛的任务比如打包优化、文件管理、环境注入等……

loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

## 参考链接
* [第 148 题： webpack 中 loader 和 plugin 的区别是什么 · Issue #308 · Advanced-Frontend/Daily-Interview-Question · GitHub](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/308)