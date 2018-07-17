## 内核

IE浏览器内核：Trident内核，也是俗称的IE内核；

Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；

Firefox浏览器内核：Gecko内核，俗称Firefox内核；

Safari浏览器内核：Webkit内核；



## URL输入后后续

1.根据域名去DNS服务器上查对应的IP地址

2.建立TCP连接，三次握手

3.发送HTTP请求

4.服务器处理

5.返回请求结果

6.关闭TCP连接，四次

7.浏览器解析HTML 
a.解析HTML生成DOM树
b.解析CSS生成CSS规则树
c.将DOM树和CSS规则树合并成渲染树
d.布局或者回流（reflow）,从上至下，从外至里，计算元素的几何信息（宽、高、margin、padding）
e.绘制元素到页面上，比如背景颜色、背景图片之类，不涉及元素几何信息。