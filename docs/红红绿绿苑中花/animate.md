# CSS3 animation
animation 是一个缩写属性，由以下属性构成
```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

| 属性                | 说明 | 默认值 |
| ------------------- | -------------------------- | ---- |
| animaition-name     | keyframe 名称 | none |
| animaition-duration | 完成动画所花费的时间，以s或ms计。【0表示没有动画效果】 | 0 |
| animaition-timing-function  | 动画的速度曲线 | ease |
| animaition-delay | 动画开始之前的延迟 | 0 |
| animaition-iteration-count | 播放的次数 n \| infinite(无限) | 1 |
| animaition-direction | 动画的方向 normal \| alternate(反向播放) | normal |
| animaition-fill-mode | 设置CSS动画在执行之前和之后如何将样式应用于其目标。 |none |
| animaition-play-state | 设置动画暂停或运行 running \| paused | running |

## 属性详解
### animation-timing-function
速度曲线用于使变化更为平滑。  
animation-timing-function 使用三次贝塞尔（Cubic Bezier）函数的数学函数，来生成速度曲线。您能够在该函数中使用自己的值，也可以预定义的值：

| 值                            | 描述                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。             |
| linear                        | 匀速                                                       |
| ease-in                       | 以低速开始                                                 |
| ease-out                      | 以低速结束。                                               |
| ease-in-out                   | 以低速开始和结束                                           |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值 |

### animation-fill-mode
动画填充模式。
@keyframes 只是定义了动画过程中每一帧的值，animation-fill-mode规定动画开始前和动画结束后该处于什么状态

| 值        | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| none      | 默认。当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。 |
| forwards  | 动画完成后，元素状态保持为最后一帧的状态                    |
| backwards | 有动画延迟时，动画开始前，元素状态保持为第一帧的状态         |
| both      | 表示上述二者效果都有                                       |

### animaition-direction
动画播放的方向

| 值        | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| normal       | 默认。动画结束，重置回到起点重新开始         |
| reverse   | 反向运行动画。动画周期结束，由尾到头重新运行    |
| alternate  | 交替反向运行         |
| alternate-reverse   | 反向交替。动画第一次运行时是反向的，然后下一次是正向，后面依次循环    |

## 参考文档
[CSS老姚](https://juejin.im/post/5cdd178ee51d456e811d279b)  
[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)  
[w3school](https://www.w3school.com.cn/cssref/pr_animation.asp)  
[贝塞尔函数在线生成](https://cubic-bezier.com/#.17,.67,.83,.67) 