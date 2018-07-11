var o = {}; // 创建一个新对象
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
	value: 37,
	writable: true, // o.a = 23; false 无法将23付给o.a
	enumerable: true, // 可以被遍历
	configurable: true // 可以被删除
});
o.a = 23;

var str = '123';
var obj = new Object(str);


function test1(v) {
	v = '321';
}

function toNewString() {
	return 'hi'
}

function test2(v) {
	v.toString = toNewString;
}

test1(str);
test1(obj);
console.log(str)
console.log(obj)

test2(str);
test2(obj);
console.log(str)
console.log(obj)