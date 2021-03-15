# iframe优缺点
2021-03-15

## 优点
1. iframe能够嵌入网页 一处编写 多处使用, 代码可复用性

## 缺点
1. 阻塞主页面的onload事件(浏览器引擎会去加载iframe里的内容) [可以通过动态src解决]
2. 搜索引擎爬虫还不能很好的处理iframe中的内容，所以使用iframe会不利于搜索引擎优化（SEO）
3. 增加服务器的http请求
4. 


现在基本上都是用Ajax来代替iframe，所以iframe已经渐渐的退出了前端开发。
如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上一些问题。(阻塞主页面加载)