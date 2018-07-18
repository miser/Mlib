## CSS

#### 盒子模型

元素的几个几何属性：内容(content)、填充(padding)、边框(border)、边界(margin)

W3C标准 : 宽度 = content 宽度，高度 = content 高度

IE旧版本（怪异模式）：
宽度 = 左 padding 宽度 + 左 border 宽度 + content 宽度 + 右 border 宽度 + 右 padding 宽度
高度 = 上 padding 高度 + 上 border 高度 + content 高度 + 下 border 高度 + 下 padding 高度

CSS3 box-sizing：
content-box采用标准盒子
border-box采用怪异模式

#### 权重

计算：分a,b,c,d计算
a.style样式
b.id选择器
c.class选择器
d.元素和伪类
通配符 * 无权重

例子：
li {}  => 它的权重 0,0,0,1
li.name {}  => 它的权重 0,0,1,1
\#name => 0.1,0,0
*值越在前面权重越高*

#### BFC（Block Formatting Context）

触发

- 根元素或包含根元素的元素
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 `strict` 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中

作用

解决问题

当一个盒子的子元素全部都浮动的时候，如下 .app无法正常展示高度导致塌陷。

```html
<div class="app">
	<div style="float:left">123</div>
	<div style="float:right">321</div>
</div>
```

还有margin塌陷



####position定位

```css
.wrapper{
  /* position: relative; */
  border: 2px solid #999;
  overflow: none;
}
.mid {
  position: relative;
  margin: 40px;
  padding:20px;
  border: 2px solid green;
}
.a,.b,.c {
  width: 100px;
  height: 100px;
}
.a {  
  position:absolute;
  left:100px;
  top: 10px;
  border: 2px solid red;
}
.b {
  /* position:absolute; */
  border: 2px solid #ccc;
}
.c {
  position: relative;
  left:50px;
  top:50px;
  border: 2px solid black;
}
```

```html
<div class="wrapper">
  <div class="mid">
    <div class="a">
    </div>
    <div class="b">
    </div>
    <div class="c">
    </div>
  </div>
</div> 
```

根据.wrapper 和 .mid 元素的position变化，内部的a位置也会变化，.wrapper 的position为absolute或者relative，而.mid的position为默认值(static)时，.a的left、top等属性与.wrapper有关，当.mid的position为absolute或者relative，则.a的left、top与.mid有关。

position：relative，是相对其它正常位置的元素，在.b后面则相对.b，在.a后面则相对 .mid （.a是absolute，它跳出了普通布局流）

#### link和@import

link除了加载CSS样式文件外还能加载RSS，@import只为CSS服务

@import等页面加载完后再加载

@import是在CSS2.1提出的，之前的低版本浏览器不支持