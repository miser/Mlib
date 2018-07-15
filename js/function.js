// 普通函数和构造函数
// nodejs环境

// 一个主要的就是是否用了new关键字

function A() {
	this.name = 'a'
}

// 用new 大致经历了3步
// 1. a = {}
// 2. A.call(a)
// 3. a.__proto__ = A.prototype;
var a = new A();

// function 返回  String,Number,Boolean,Null,Undefined，在new的时候被忽略了
function B() {
	this.name = 'b';

	return this.name;
}

function C() {
	this.name = 'c';

	return true;
}

var b = new B();
var c = new C();
console.log(b); // B { name: 'b' }
console.log(c); // C { name: 'c' }


function D() {
	this.name = 'd';

	return {};
}

function E() {
	this.name = 'e';

	return [];
}

// function 返回 Array,Date,Object,Function,RegExp,Error 那么按照返回的对象输出
var d = new D();
var e = new E();
console.log(d); // {}
console.log(e); // []

