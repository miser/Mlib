var o = {}; // 创建一个新对象
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
	value: 37,
	writable: true, // o.a = 23; false 无法将23付给o.a
	enumerable: true, // 可以被遍历
	configurable: true // 可以被删除
});
o.a = 23;