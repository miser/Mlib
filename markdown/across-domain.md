## 跨域

ajax和DOM都是同源策略，协议、端口和域名都相同。

#### JSONP

http://domain.com/a.html 定一个js函数，如

````js
function getName(name){
  console.log(name);
}
````

通过<script>标签去请求另一个域名，如http://domain2.com/b.js。因为<script>不受同源策略影响所以b.js会被加载。在响应b.js的服务器可以根据业务需求将数据填充进去，如下

```js
getName("miser")
```

那么当b.js被加载完后，就会触发getName("miser")，最后控制台输出miser。

#### document.domain

主页面 http://a.domain.com/a.html， iframe页面http://b.domain.com/b.html

2个页面都将 document.domain = 'domain.com'; 这样，在a.html上就能访问b.html里的window对象和操作DOM了

#### window.name

不怎么用，window.name不会随页面的跳转而变化

#### postMessage（HTML5）

无视协议，端口，域名的不同

#### CORS

1.ajax设置withCredentials 设置 true，cookie 可以一起发送

2.服务器端

```
Access-Control-Allow-Origin: * // 允许所有域名，可以单独配置需要的域名
Access-Control-Allow-Credentials:true
```





