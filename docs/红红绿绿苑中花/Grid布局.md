# 网格布局
网格布局（Grid）是最强大的 CSS 布局方案。

## 与Flex布局的区别
Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

## 1. 基本概念
### 1.1 容器和项目
采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。

### 1.2 行row, 列column
容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。

### 1.3 单元格
行和列的交叉区域，称为"单元格"（cell）。

### 1.4 网格线
划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。

## 2. 容器属性
### 2.1 grid / inline-grid
指定一个容器采用网格布局。

```css
display: grid;
/* display: inline-grid; */
```

> 注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。


### 2.2 grid-template-columns 属性， grid-template-rows 属性
容器指定了网格布局以后，接着就要划分行和列。grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。

可以使用绝对单位,也可以使用百分比.
```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

1. repeat()

  有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值。上面的代码用repeat()改写如下:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3,100px);
  grid-template-rows: repeat(3, 33%);
}
```
2. auto-fill 关键字

3. fr 关键字

  为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。

4. minmax()

  minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

5. auto 关键字

  auto关键字表示由浏览器自己决定长度。
```css
grid-template-columns: 100px auto 100px;
```

6. 布局实例

传统的十二网格布局，写起来也很容易。
```css
grid-template-columns: repeat(12, 1fr);
```

### 2.3 grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性
grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）。

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```
grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。

```css
grid-gap: <grid-row-gap> <grid-column-gap>;
```

### 2.4 grid-template-areas 属性
网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域。

```css
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```
中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。

### 2.5 grid-auto-flow 属性
划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。

这个顺序由grid-auto-flow属性决定，默认值是row，即"先行后列"。也可以将它设成column，变成"先列后行"。

```css
grid-auto-flow: column;
```
还设置成其他属性值：
* row 先行后列, 是默认值
* column 先列后行
* row dense  表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。
* column dense 表示"先列后行"，并且尽量填满空格。
* dense

### 2.6  justify-items 属性， align-items 属性， place-items 属性
justify-items属性设置单元格内容的水平位置（左中右），

align-items属性设置单元格内容的垂直位置（上中下）。

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

> start：对齐单元格的起始边缘。
>
> end：对齐单元格的结束边缘。
>
> center：单元格内部居中。
>
> stretch：拉伸，占满单元格的整个宽度（默认值）。

place-items属性是align-items属性和justify-items属性的合并简写形式。

```css
place-items: <align-items> <justify-items>;
```
如果省略第二个值，则浏览器认为与第一个值相等。

### 2.7 justify-content 属性， align-content 属性， place-content 属性
justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

> start - 对齐容器的起始边框。
>
> end - 对齐容器的结束边框。
> 
> center - 容器内部居中。
>
> stretch - 项目大小没有指定时，拉伸占据整个网格容器。
>
> space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
>
> space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
>
> space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

place-content属性是align-content属性和justify-content属性的合并简写形式。
```css
place-content: <align-content> <justify-content>
```
如果省略第二个值，浏览器就会假定第二个值等于第一个值。


### 2.8 grid-auto-columns 属性， grid-auto-rows 属性
grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。

它们的写法与grid-template-columns和grid-template-rows完全相同。

如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

### 2.9 grid-template 属性， grid 属性
grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。

grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式

建议不要合并属性，不够直接。

## 3. 项目属性
### 3.1 grid-column-start 属性， grid-column-end 属性，grid-row-start 属性，grid-row-end 属性
项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

> grid-column-start属性：左边框所在的垂直网格线
> 
> grid-column-end属性：右边框所在的垂直网格线
> 
> grid-row-start属性：上边框所在的水平网格线
> 
> grid-row-end属性：下边框所在的水平网格线

### 3.2 grid-column 属性， grid-row 属性
grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。

```css
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}
```

### 3.3 grid-area 属性
grid-area属性指定项目放在哪一个区域。


### 3.4 justify-self 属性，align-self 属性，place-self 属性
justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。

align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。

这两个属性都可以取下面四个值。
> start：对齐单元格的起始边缘。
> 
> end：对齐单元格的结束边缘。
> 
> center：单元格内部居中。
> 
> stretch：拉伸，占满单元格的整个宽度（默认值）。

place-self属性是align-self属性和justify-self属性的合并简写形式。

```css
place-self: <align-self> <justify-self>;
```

## 参考链接
* [CSS Grid 网格布局教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
* [An awesome image grid - CSS Grid tutorial - Scrimba.com](https://scrimba.com/learn/cssgrid/an-awesome-image-grid-css-grid-tutorial-cBq3PsP)
* [CSS 网格布局中的自动定位 - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout)
* [Grid布局实践 - a Collection by hell on CodePen](https://codepen.io/collection/XQEeRx?cursor=ZD0wJm89MCZwPTEmdj00)