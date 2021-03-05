## 同源策略
同源协议指的是页面若域名，端口，协议都相同，便具有相同的源。<br/>
目的是为了保证用户信息的安全，防止恶意的网站窃取数据。<br/>
解决这种同源策略的方法便称为跨域。<br/>

## JSONP
JSONP 是JSON with Padding 的缩写。允许在服务器端继承script标签返回至客户端，通过JavaScript callback的形式实现跨域访问。

## 原理
利用script标签的src属性调用资源不跨域的特性，向服务端请求同时传一个callback回调方法名作为参数，服务端接受函数名生成返回json格式资源的代码。

## 优缺点
优点： 兼容性好，实现比较简单<br/>
缺点：只能发送get请求，响应失败没有状态码， 数据容易被劫持

## 实现
```js
function generateJsonpCallback() {
  return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

export default function jsonp(url, data = {}, callback) {
  if (!url) return;
  return new Promise((resolve, reject) => {
    const container = document.body;
    const scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    // 生成jsonp方法
    const funcName = generateJsonpCallback();

    data["callback"] = funcName;
    let params = [];
    for (const key in data) {
      params.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      );
    }
    url = url.indexOf("?") > 0 ? url + "&" : url + "?";
    url += params.join("&");
    scriptNode.src = url;

    window[funcName] = res => {
      callback && callback();
      resolve(res);
      container.removeChild(scriptNode);
      delete window[funcName];
    };

    scriptNode.onerror = () => {
      reject(new Error(`fetch ${url} failed`));
      container.removeChild(scriptNode);
      delete window[funcName];
    };
    scriptNode.src = `${url}&${callback}`;
    container.appendChild(scriptNode);
  });
}

```
```js
// 使用
// 通过jsonp去请求百度的地址的边界信息
import jsonp from './jsonp' 
function getInfoByUid(uid) {
  jsonp(
    `https://map.baidu.com/`,
    {
      pcevaname: "pc4.1",
      qt: "ext",
      ext_ver: "new",
      l: 12,
      uid
    }
  )
    .then(res => {
      console.log(res, 123);
    })
    .catch(e => {
      console.error(e);
    });
  }
```

!> url中https://map.baidu.com/a=1&callback=hellojson 当window中有挂载hellojson方法时会执行

## 参考链接
* [JSONP原理及简单实现](https://github.com/YvetteLau/Step-By-Step/issues/30)
* [动手实现一个JSONP](https://www.jianshu.com/p/58e2374623be)