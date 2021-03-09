# HTTP 与 HTTPS

## HTTP
HTTP协议是超文本传输协议的缩写，英文是Hyper Text Transfer Protocol。它是从WEB服务器传输超文本标记语言(HTML)到本地浏览器的传送协议。

### http中存在如下问题：
1. 请求信息明文传输，容易被窃听截取。
2. 数据的完整性未校验，容易被篡改
3. 没有验证对方身份，存在冒充危险

## HTTPS
为了解决上述HTTP存在的问题，就用到了HTTPS。

HTTPS 协议（HyperText Transfer Protocol over Secure Socket Layer）：一般理解为HTTP+SSL/TLS，通过 SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密。

### HTTPS的缺点
1. HTTPS协议多次握手，导致页面的加载时间延长近50%；
2. HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗；
3. 申请SSL证书需要钱，功能越强大的证书费用越高。
4. SSL涉及到的安全算法会消耗 CPU 资源，对服务器资源消耗较大。


## 总结
* HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理。
* http和https使用连接方式不同，默认端口也不一样，http是80，https是443。

## 参考链接
* [十分钟搞懂HTTP和HTTPS协议？ - 知乎](https://zhuanlan.zhihu.com/p/72616216)