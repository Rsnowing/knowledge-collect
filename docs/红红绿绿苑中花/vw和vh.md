# vw 和 vh


## 什么是视口单位

vm, vh, vmin, vmax 相继出现在2011-2015年,现在已被大部分主流浏览器所支持。

![图片](https://uploader.shimo.im/f/AdP1P7j6HppK76Zd.png!thumbnail?fileGuid=hV6CyjhVCGWrJr9J)


|单位|含义|
|:----|:----|
|vw|1vw = 视口宽度的1%|
|vh|1vh = 视口高度的1%|
|vmin|选取vw和vh中较小的那个|
|vmax|选取vw和vh中较大的那个|


虽然这些单位是衍生自视口宽度和视口高度,但他们可以作用于任何有长度的地方,比如字体大小,内外边距大小,阴影大小,边框大小,等等等等。现在让我们来看看我们可以用它做些什么！

## 响应式排版

使用视口单位进行响应式布局越来越流行-建立在字体可以在通过基于当前视口放大缩小。仅仅给字体加视口单位有点突兀-字体会基于当前视口快速的放大和缩小。

<iframe height="265" style="width: 100%;" scrolling="no" title="use viewport units for font-size" src="https://codepen.io/rsnowing-the-reactor/embed/LYbrpMp?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

See the Pen <a href='https://codepen.io/rsnowing-the-reactor/pen/LYbrpMp'>use viewport units for font-size</a> by hell

(<a href='https://codepen.io/rsnowing-the-reactor'>@rsnowing-the-reactor</a>) on <a href='https://codepen.io'>CodePen</a>.

</iframe>

这种直接突兀的改变在日常开发中肯定是不能使用的。我们需要更柔和的效果：有一个最大最小值和可控的变化速率。这个时候`calc()`函数就排上用场了。我们可以使用一个稳定的基数（比如16px）加上一个较小的视口单位（比如0.5vw）组合在一起。让浏览器去计算：`calc(16px + 0.5vw)`

<iframe height="265" style="width: 100%;" scrolling="no" title="use viewport units and calc" src="https://codepen.io/rsnowing-the-reactor/embed/JjbZXbL?height=265&theme-id=light&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

See the Pen <a href='https://codepen.io/rsnowing-the-reactor/pen/JjbZXbL'>use viewport units and calc</a> by hell

(<a href='https://codepen.io/rsnowing-the-reactor'>@rsnowing-the-reactor</a>) on <a href='https://codepen.io'>CodePen</a>.

</iframe>



对我来说，这已经足够复杂了。如果我需要快速增长的h1标题，我可以用一个单一的媒体查询，当文本变得太大:

```
h1 {
  font-size: calc(1.2em + 3vw);
}
@media (min-width: 50em) {
  h1 {
    font-size: 50px;
  }
}
```
## 圣杯布局

<iframe height="265" style="width: 100%;" scrolling="no" title="full-height css grid" src="https://codepen.io/rsnowing-the-reactor/embed/NWbzNoR?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

See the Pen <a href='https://codepen.io/rsnowing-the-reactor/pen/NWbzNoR'>full-height css grid</a> by hell

(<a href='https://codepen.io/rsnowing-the-reactor'>@rsnowing-the-reactor</a>) on <a href='https://codepen.io'>CodePen</a>.

</iframe>

## 有趣的应用

纯css实现进度指示器

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS only scroll indicator" src="https://codepen.io/MadeByMike/embed/ZOrEmr?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

See the Pen <a href='https://codepen.io/MadeByMike/pen/ZOrEmr'>CSS only scroll indicator</a> by Mike

(<a href='https://codepen.io/MadeByMike'>@MadeByMike</a>) on <a href='https://codepen.io'>CodePen</a>.

</iframe>


## 参考链接

[css trick](https://css-tricks.com/fun-viewport-units/)