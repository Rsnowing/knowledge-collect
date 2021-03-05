# SPA
2021-03-05
## 什么是SPA
SPA是single page application的缩写， 意为单页面应用，是一种网页应用模型。
## SPA优点
1. SPA路由跳转是基于特定的实现（如vue-router，react-router等前端路由）,而非原生浏览器的文档跳转（navigating across documents）。那么即可实现按需进行页面中的必要的组件级别的更新，而非无差别式的页面级更新。

2. 基于1的特点，相较于MPA避免了不必要的整个页面重新加载，在页面切换之间间隙更短，更能体现出web应用流畅的特点，因而更具有接近原生应用的性能优势与体验

3. 因为组件级更新的特点，组件可复用性提高了代码的可复用性。适合快速迭代的产品。


4. 由于SPA的前端路由，前端不需要再依赖后端的路由分配，与后端解耦，实现前后端分离。
## SPA缺点
1. SPA应用再初始化时时从无状态（数据）的空白页进入到有状态（数据）的内容页面。而搜索引擎算法抓取结构仅限初次请求时的返回页面，搜索引擎是不会等待当前 SPA 进行数据填充。因此纯粹的SPA时不利于搜索引擎优化的。（SEO)

2. 父子组件必形成耦合，有 父 才有 子。在原则上，对比 开闭原则，每一次页面迭代，都需要修改组件内部代码，而组件时可复用的，有引入 BUG 风险。

3. SPA是整个应用页面，那么在`未优化前端路由加载`时，应用初始首屏即需要下载整个应用。这其中包含了一些用户根本不会在会话中访问的页面（但这些页面对于应用来说又是不可或缺的。）。这一点，相对于单个 MPA 组件来说，SPA更重一点。

## SPA优化
### SSR（for SEO）
基于以上特点，SPA 最大的优势就是基于 前端路由 实现组件级更新所带来的性能优势，在体验上 SPA 更为接近原生应用。但纯粹的 SPA 是从空白页面进行应用初始化。基于一般搜索引擎算法，从空白页面进行应用初始化是不利于 SEO 的。一个适应 SEO 的 SPA 必是需要通过 SSR（即 Server-Side Rendering）来进行应用优化，而 SSR 亦会增加了服务器的压力，也会让用户消耗更多的流量？。基于此，SPA 要做到符合 SEO 的应用，必须要付出一些服务端的代价来换取良好的 SEO。

也存在一个 SPA 特例，即 静态 页面内容（如 产品介绍页）的 SPA。因为静态内容的不可变性特点，那么我们可以在服务端进行静态内容预渲染（pre-render），以此来减轻服务端不必要的即时页面服务端渲染需求的性能压力。预渲染的一种实现是使用 Chrome 浏览器的无界面 API [puppeteer](https://github.com/puppeteer/puppeteer) 并配合 prerender-spa-plugin 来实现静态内容的预渲染。在完成预渲染之后，即可得到 有数据的 SPA，之后再将生成的页面部署在静态服务器上即可。此时这部分静态内容就避免了即时的 SSR。

因为动态内容（如 用户信息页）具有不确定性，那么这部分内容页面为了保证良好的 SEO 还是不可避免的需要 SSR。

### 动态加载路由组件（for 首屏加载优化）
SPA是基于前端路由来实现各级组件路由，那么在未优化 SPA 应用时，应用初始化就需要加载完成所有子路由基础组件。在这一点上，未优化的 SPA 相较于 MPA 首屏需要加载更多的基础内容。不论后期，用户是否会访问一些组件页面，在首屏加载时都会进行下载。那么此处无形中增加了应用初始化成本。那么 未优化的 SPA 相较于一般的 MPA 具有更高的初始启动成本。

我们常用的 SPA 首屏优化策略是使用 动态加载路由组件。即在应用初始，并不加载所有的子路由组件，而是在用户访问时再下载相应的子路由组件。本质上，我们将下载子路由组件的时间均摊到各个子路由组件自身，而不是在首屏集中处理。

以vue-router为例：

常用的一种实现是 vue 下的 [异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6) 配合 webpack 的 [代码分割 | webpack](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 以及 babel 转义（[syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/)）草案的动态加载语法 [import()](https://github.com/tc39/proposal-dynamic-import) 来实现动态加载路由组件。import() 默认在内部调用 Promise 函数，最终返回一个 Promise 对象，对于不支持 Promise 的浏览器，需要引入 es6-promise 或 promise-polyfill 或者直接引入 polyfill.io 动态引入 polyfill 来做兼容。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 静态加载，不论用户是否访问该页面都在初始化应用时加载
import home from '~/components/home')

// 动态加载方式一，仅在 webpack 请求该模块的 chunk 时才会加载，即只有在用户访问时加载
// 该组件
const app = () => import(/* webpackChunkName: "app" */ '~/components/app')

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/app',
          component: app
        },
        {
          path: '/info',
          /**
           * 动态加载方式二
           * 1. chunk 命名必须配合 webpack 中 output.chunkFileName: '[name].js' 指
           * 定占位符为 `[name]` 使用
           */
          component: () => import(/* webpackChunkName: "info" */ '~/components/info')
        }
      ]
    }
  ]
})
```
以上关键点在于使用 import('./module') 代替静态模块加载语法 import module from './module'。

/* webpackChunkName: "info" */ 注释用于将单个路由下所有组件都打包在同一个异步 chunk 中。即被请求的模块和其应用的所有子模块都会分离到同一个异步 chunk 中。

```js
// webpack 相应配置为:
module.exports = {
  // ...
  output: {
    filename; '[name].bundle.js',
+    chunkFileName: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
  // ...
}
```

# MPA
## 什么是MPA
MPA 即为 multiple page application 的缩写，意为多页面应用模型，与 SPA 对比最大的不同即是页面路由切换由原生浏览器文档跳转（navigating across documents）控制。

## MPA优点
1. 因为 MPA 各个页面相互独立，那么可将每一个页面都看作一个单一的 微服务。各个页面达到相互独立与 解耦 的目的。

2. 因其解耦特性，因而更加适合 前端去中心化 的复杂 web 应用。

3. 因为页面互相独立的特性，那么有利于应用本地数据的模块化。

4. 因为页面相互独立的特性，移除一个单页或增加一个单页不会对其他 MPA 单页造成影响。那么降低了我们页面迭代的门槛。不用担心对其他单页组件的 蝴蝶效应。

5. 单个页面相互独立，且页面在初始时，就具有页面内容而非 无状态，那么相对于 SPA，更加有利于 SEO。

## MPA缺点
1. MPA 路由基于原生浏览器的文档跳转（navigating across documents）。因此每一次的页面更新都是一次页面重载，这将带来巨大的重启性能消耗。

2. MPA 的前端页面与后端是一一对应，耦合的。在开发时，增加了开发成本，前后端开发进度必须统一协作。

与 SPA 的高性能侧重点不同的是，MPA 更加注重于页面之间的相互解耦。以页面为单位形成多个独立组件。多个页面组件构成一个完成的 web 应用。

## MPA优化
相对于 SPA 应用，MPA 应用天生具有重启性能消耗高的弊端。因为每一次的页面切换都将导致所有的组件都会被浏览器刷新，那么一些可复用组件也必须重新加载。这个行为的本质是 MPA 路由切换由浏览器的 navigating across documents 所决定的，它默认执行无差别式的页面级更新，而不管页面中的组件是否可以复用。正因具有很高的重启消耗，那么在页面切换间隙，重启整个页面将导致有较大几率出现较长时间的页面空白。在我们应用的页面没有完全加载完成之前，这个空白页面将一直持续。

为了解决 MPA 加载页面时的页面空白问题。一般借鉴原生应用的 skeleton screen（骨架屏） 的方式来解决切换时页面空白的问题。本质上，MPA 在加载时，页面加载完全由浏览器控制，而不是像 SPA 那样可以加入前端路由来控制页面加载。因为在 MPA 中我们无法引入前端路由，也就无法实现插入类似像 SPA 那样的 loading 组件。既然无法从前端路由解决页面空白的问题，那么从切换页面时页面加载的内容着手即是成为了一个很好的切入点。

一般解决的思路是通过 SSR 来向 MPA 的初始单页组件替换为加入无状态的 skeleton screen，使得我们在加载轻量的 skeleton screen 之后展示 skeleton 页面而非空白。继续开始加载单

在整个过程中，因为有 skeleton screen 的存在。那么在加载单页组件期间，页面将始终呈现 skeleton screen 组件，这样大大缩减了应用单页组件初始化时的出现页面空白时间。我们之所以这么做的原因是，skeleton screen 仅仅只是一个包含页面骨架的 html，本质上 skeleton screen 的大小远远小于 MPA 单页组件。那么加载 skeleton 的时间远远小于单个页面组件，那么我们就可以借助展示 skeleton screen 来缩短页面空白时间。

# 基于 SPA 与 MPA 的优化 -> PWA(progressive web apps:渐进式 Web 应用)
通过以上分别对于 SPA 和 MPA 的分析。不论是 MPA 还是 SPA 我们都可以实现加载时的非空白页面过渡。但是这也许还不够，下载 skeleton screen 仍然需要时间，其中还是会存在间隙。那么我们是否可以找到一个缓存应用基础架构的方式？其实我们可以通过 service-workers 来实现对应用的 app shell 缓存。对于 MPA 应用来说，我们可以缓存基础的 skeleton screen，那么在下一次启动 MPA 时，仅需要验证是否存在更新，在不存在 app shell 更新的情况下，即可调用本地 skeleton screen 缓存，借此用来缩短应用初始化时间。相对于 SPA 来说，原理与 MPA 缓存应用基础架构本质也是相似的。

App shell 本质是 PWA 的基础应用架构，通过 service-worker 来实现对应用基础架构做本地缓存，但是 service-worker 并不应该局限于用来实现 PWA，service-worker 与 PWA 并不是包含关系。我们亦可调用 service-worker 仅仅用来缓存 web 应用的非业务逻辑基础组件。那么基于这些对 service-worker 的分析，不论是 MPA 还是 SPA 的非业务逻辑基础组件都可以被 service-worker 缓存下来。MPA 和 SPA 本身是作为网页应用模型的存在，借用 App shell 的缓存机制，实现了对 MPA 和 SPA 的基础架构缓存优化。这里尤其需要注意的思维陷阱就是 PWA 并不等于 SPA 或者 MPA，service-worker 与 PWA 也不是包含关系。

# 技术选型
针对以上的分析，我们知道了 MPA 与 SPA 最大的不同之处在于页面路由切换的方式不同。SPA 的路由切换是由前端路由来实现，MPA 的路由切换则完全依靠浏览器的路由切换机制。针对于二者不同的路由切换方式，也注定了二者在应用架构模型方面的侧重点不同。

SPA 更加注重于接近原生应用的体验，基于代码组件的可复用特性，使得开发效率和成本方面具有得天独厚的优势，那么 SPA 更加适合开发有快速迭代需求的应用。而且基于可复用组件的特点，应用虽然在初始化时的成本高于 MPA，但其页面切换之间的成本是明显小于 MPA 的切换成本。虽然 SPA 因其架构特点导致其初始化成本高，但可以通过动态加载异步组件来显著降低 SPA 应用的初始化成本。

而对于 MPA 来说，更加注重于单个页面组件的之间的解耦，同时因为页面之间相互独立，那么使得 MPA 应用初始化成本小，但是页面重启的成本高。基于应用组件之间解耦的特性，MPA 更加适合开发大型复杂的 web 应用。在开发成本上来说，虽然代码复用性低于 SPA，但其解耦所带来的便捷拓展性，是 SPA 无法比拟的。MPA 无论是增加还是删除页面，对于其他的单页面组件影响都很小。但是，SPA 之间存在组件复用时，也就存在了代码耦合。特别是存在复杂逻辑的组件之间拓展功能时需要更加的小心翼翼。

虽然以上简要总结了 SPA 与 MPA 之间的差异，共同点以及他们的优化方式。但是我们在技术选型时，不仅需要考虑了以上因素，而且还需要结合特定的应用场景与自身的开发条件来选择合适的应用架构。MPA 与 SPA 没有说一定是要有对应的适用应用类型方式，因为应用场景，开发条件都是必须考虑进去的选型因素。

# PWA 渐进式 Web 应用 
Progressive web apps
* 使用service-worker 让PWA离线工作
* 使用Web推送功能
* 支持安装到用户桌面
* 渐进式加载

# 总结
> SPA优点： 使用前端路由按需加载，并不是浏览器原生的文档跳转，避免不必要的页面重载。基于组件 可复用。利于前后端分离。
SPA缺点：数据内容从后端获取然后进行填充，不利于SEO。组件的可复用性 一定程度上代表耦合性高 修改组件 容易引入bug。如果不进行路由按需加载的话，首屏即需要下载整个应用。
优化： SSR（会增加服务器压力）, 按需加载路由组件

> MPA优点： 页面之间解耦，相互独立。页面初始化就有内容 利于SEO
MPA缺点： 基于原生浏览器文档跳转，蔑称更新都是页面重载 性能消耗。不利于前后端分离。
优化： 骨架屏，



# 参考链接
* [Single-page application - Wikipedia](https://en.wikipedia.org/wiki/Single-page_application)
* [SPA 与 MPA 的比较与优化 - Liu Bowen](https://set.sh/post/180804-spa-and-mpa)
* [渐进式 Web 应用（PWA） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)