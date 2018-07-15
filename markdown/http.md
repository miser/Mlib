## HTTP 缓存

#### expires和cache-control中max-age

1.expires HTTP/1.0 支持，设置什么时候过期，比如 Mon, 15 Jul 2019 07:37:45 GMT  到 2019年7月15日07:37:45 过期，每次都会从服务器获得新值（从浏览器获取文件——304状态不会获取新的）

2.max-age HTTP/1.1 支持，max-age=3600，表示3600秒后文件过期

3.如果服务器和本机的时间差很多，expires 会存在偏差，它是服务器返回的，而max-age不会有该问题；max-age 会覆盖expires （如果同时存在）

4.它们2个都是客户端缓存的检测值

#### Last-Modified 和 ETag

1.Last-Modified 服务器文件改变的时间

2.ETag 一个hash之类的字符串表示

3.如果没有变化返回304和空响应

4.它们都要与服务器发生交互