// // //评测题目: 1. 请通过代码实现大整数（可能比Number.MAX_VALUE大）相加运算
// var BigInt = function(str) {
// 	// your code here
// 	this.value = str;
// };

// BigInt.prototype.plus = function(bigint) {
// 	// your code here
// 	let value1 = this.value.split('');
// 	let value2 = bigint.value.split('');
// 	var jinwei = 0,
// 		result = '';

// 	while (value1.length || value2.length || jinwei) {
// 		var temp = parseInt(value1.pop() || 0) + parseInt(value2.pop() || 0) + jinwei;
// 		result = temp % 10 + result;
// 		jinwei = Math.floor(temp / 10);
// 	}
// 	return result;
// };

// BigInt.prototype.toString = function() {
// 	// your code here
// 	return this.value;
// };

// var bigint1 = new BigInt('1234232453525454546445458814343421545454545454');
// var bigint2 = new BigInt('1234232453525454546445459914343421536654545454');

// console.log(bigint1.plus(bigint2));

// // 2. 编写一个简单的自定义事件处理器
// // 1. 具备 on 方法绑定事件
// // 2. 具备 off 方法解绑事件
// // 3. 注意对 * 的处理
// // 4. 尽量考虑在生产环境中可直接使用，而不仅仅是完成题目要求

// function EventEmitter() {
// 	// TODO
// 	this.events = {};
// 	let self = this;

// 	function add(key, fn) {
// 		let callbacks = self.events[key] || [];
// 		callbacks.push(fn);
// 		self.events[key] = callbacks;
// 	}

// 	function trigger(key, args) {
// 		let callbacks = self.events[key] || [];
// 		for (let i = 0; i < callbacks.length; i++) {
// 			let callback = callbacks[i];
// 			callback.apply(null, args);
// 		}
// 	}

// 	function off(key, fn) {
// 		if (typeof fn === 'function') {
// 			let callbacks = self.events[key] || [];
// 			for (let i = 0; i < callbacks.length; i++) {
// 				if (callbacks[i] === fn) {
// 					callbacks.splice(i, 1);
// 				}
// 			}
// 		} else {
// 			delete self.events[key];
// 		}
// 	}

// 	function doAllEvents(doFn, arg) {
// 		let keys = Object.keys(self.events);
// 		for (let i = 0; i < keys.length; i++) {
// 			doFn(keys[i], arg);
// 		}
// 	}

// 	this.on = function(key, fn) {
// 		if (key === '*') {
// 			doAllEvents(add, fn);
// 		} else {
// 			add(key, fn);
// 		}
// 	}
// 	this.off = function(key, fn) {
// 		if (key === '*') {
// 			// doAllEvents(off, fn);
// 			self.events = {};
// 		} else {
// 			off(key, fn);
// 		}
// 	}
// 	this.trigger = function(key) {
// 		let args = Array.prototype.slice.call(arguments, 1);
// 		if (key === '*') {
// 			doAllEvents(trigger, args);
// 		} else {
// 			trigger(key, args);
// 		}
// 	}
// }


// var emitter = new EventEmitter();

// emitter.on('foo', function(e) {
// 	console.log('listening foo event', e);
// });

// emitter.trigger('foo', {
// 	name: 'John'
// });

// emitter.off('foo');
// emitter.trigger('foo', {
// 	name: 'John'
// });

// function handler(args) {
// 	console.log('listening bar event');
// }

// emitter.on('bar', handler);
// emitter.on('bar', function() {
// 	console.log('other listening bar event');
// });
// emitter.trigger('bar', 'something');
// emitter.off('bar', handler);

// emitter.on('*', function(e) {
// 	console.log('listening all events');
// });
// emitter.trigger('*')

// 3. 请通过代码实现下面的效果
function add(num) {
	var res = num;
	var _add = function(b) {
		res += b;
		return _add;
	}
	_add.toString = function() {
		return res;
	}
	return _add;
}

console.log(add(2)(3) + add(2)(3)); // 结果为5
// console.log(add(2)(3)(4)(5)); // 结果为14