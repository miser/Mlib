## valueOf vs toString

#### 它们什么时候被调用 ？

```js
let obj1 = {
	count: 1,
	valueOf: function() {
		console.log('!valueOf!');
		return this.count;
	}
}
let obj2 = {
	count: 1,
	toString: function() {
		console.log('*toString*');
		return this.count;
	}
}
let obj3 = {
	count: 1,
	valueOf: function() {
		console.log('&valueOf&');
		return this.count;
	},
	toString: function() {
		console.log('&toString&');
		return this.count;
	}
}
console.log('------------')
console.log(obj1) // 触发 !valueOf! 
console.log(obj2) // 没触发 toString
console.log(obj3) // 没触发 toString
console.log('------ +1 ------')
obj1 + 1; // 触发 !valueOf!
obj2 + 1; // 触发 *toString*
obj3 + 1; // 触发 &valueOf&
console.log(`------ +'' ------`)
obj1 + ''; // 触发 !valueOf!
obj2 + ''; // 触发 *toString*
obj3 + ''; // 触发 &valueOf&
console.log('------ Number ------')
Number(obj1); // 触发 !valueOf!
Number(obj2); // 触发 *toString*
Number(obj3); // 触发 &valueOf&
console.log('------ String ------')
String(obj1); // 没触发 !valueOf!
String(obj2); // 触发 *toString*
String(obj3); // 触发 &toString&
console.log('------ Object ------')
Object(obj1); // 没触发 !valueOf!
Object(obj2); // 没触发 *toString*
Object(obj3); // 没触发 &valueOf&
console.log('------ === ------')
console.log(obj1 === obj1) // 没触发
console.log(obj1 === obj2) // 没触发
console.log(obj1 === obj3) // 没触发
console.log('------ string concat ------')
"".concat(obj1) // 没触发 !valueOf!
"".concat(obj2) // 触发 *toString*
"".concat(obj3) // 触发 &toString&
```

#### 为什么用 “+” 连接会先调用 valueOf 呢？ ECMA-262 对 “+” 定义如下:

12.5.6 Unary+Operator
_NOTE The unary + operator converts its operand to Number type._	
​	12.5.6.1 Runtime Semantics: Evaluation UnaryExpression : + UnaryExpression
​		1.Let expr be the result of evaluating UnaryExpression.
​		2.Return ? ToNumber(? GetValue(expr)).

#### 总结：

与数字相关的操作，会优先调用 valueOf ，与字符串相关的 会优先调用 toString

#### 小技巧

```js
function add(num) {
	var res = num;

	function _add(num) {
		res += num;
		return _add;
	}
	_add.valueOf = function() {
		return res;
	}
	return _add;
}
console.log(add(1)(2) + add(3)) // 6
```



