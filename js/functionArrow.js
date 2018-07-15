// nodejs环境
var that = this;
let arrowFn = (...args) => {
	console.log(args);
	console.log(arguments);
	console.log(this === that);
}

function commonFn(...args) {
	console.log(args);
	console.log(arguments);
	console.log(this === that)
}

// 一
// 箭头函数没有 prototype
console.log(arrowFn.prototype); // undefined
console.log(commonFn.prototype); // commonFn {}

// 二
// 箭头函数 arguments 和 this 与谁调用它有关
// args 输出 []
// arguments 输出 nodejs module wrapper（exports, require, module, __filename, __dirname） 
// 的几个参数信息，大致如下
// (function(exports, require, module, __filename, __dirname) {
// 		...
// 		let arrowFn = (...args) => {
//			console.log(args);
//			console.log(arguments);
//			console.log(this === that);
// 		}
// 		...
// });
// this === that 输出 true
arrowFn()

// args 输出 []
// arguments 输出 {}
// this === that 输出 false
commonFn()

let arrowFn2 = (...args) => {
	console.log(this);
	console.log(args)
}

function commonFn2(...args) {
	console.log(this)
	console.log(args)
}

let obj = {
	name: 'miser',
	age: 31
}

// 三
// 箭头函数无法对this进行绑定，第一个参数被忽然，后续的有用
// this 输出 {}
// args 输出 [1]
arrowFn2.call(obj, 1);
// this 输出 { name: 'miser', age: 31 }
// args 输出 [1]
commonFn2.call(obj, 1);

// 四
// 箭头函数不能用new
// TypeError: arrowFn2 is not a constructor
let a = new arrowFn2();



