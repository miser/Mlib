## XSS

#### 原理

攻击者通过在网页上输入特殊的内容，让服务器保存并注入到HTML中，当后续用户访问该页面，触发之前特殊的内容（脚本代码），实现攻击。

#### 危害

获取用户的信息，比如cookie

挂网页广告<image />

触发页面原有的JS方法，比如followMe() 一打开就关注该页面用户

#### 防范

对提交的用户输入做HTML转义



## CSRF

#### 原理

用户登入站点A并获得一定权限，比如登入。然后访问危险站点B，B站点上的恶意脚本代码被触发，模拟用户去操作站点A，比如银行转账。

#### 危害

获得了用户权限，意味着它可以做任何事情，转账、发帖（广告）、注销账号等等

表单不受同源策略：B站点有个表单提交到A站点，用户以为是提交到B网站，本来用户以为输入的是电话号码，结果提交到A站点的是转账金额

#### 防范

检查http header 的referer是不是有效（来自预期的站点），不过这个值可以被修改。

给表单添加随机token，然后在服务器验证这个token。







