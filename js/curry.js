function add(v1, v2, v3, v4) {
	return v1 + v2 + v3 + v4;
}

function curry(fn) {
	var storeAry = [];

	function _curry() {
		if (arguments.length === 0) {
			return fn.apply(null, storeAry)
		} else {
			var args = Array.prototype.slice.call(arguments);
			storeAry = storeAry.concat(args);
			return _curry;
		}
	}

	return _curry;
}

function curry2(fn) {
	var argLen = fn.length;
	var storeAry = [];

	function _curry() {
		var args = Array.prototype.slice.call(arguments);
		if (args.length >= argLen) {
			return fn.apply(null, storeAry)
		} else {
			storeAry = storeAry.concat(args);
			return _curry;
		}
	}

	return _curry;
}
var curryAdd = curry(add);
var a = curryAdd(1)(2)(3)(4)();
console.log(a)

var curryAdd2 = curry2(add);
var a2 = curryAdd(1)(2)(3)(4);
console.log(a)
