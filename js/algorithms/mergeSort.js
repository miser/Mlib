function merge(left, right) {
	let result = [];
	while (left.length && right.length) {
		result.push(left[0] <= right[0] ? left.shift() : right.shift())
	}
	return result.concat(left).concat(right);
}
/*
 * 将数组不断的从中间拆分，直到length为1
 */
Object.defineProperty(Array.prototype, 'mergeSort', {
	value: function() {
		var ary = this;

		if (ary.length < 2) return ary;

		let len = ary.length;
		let mid = Math.floor(len / 2);
		let leftAry = ary.slice(0, mid);
		let rightAry = ary.slice(mid);
		return merge(leftAry.mergeSort(), rightAry.mergeSort());
	},
	enumerable: false,
	configurable: false,
	writable: false,
});

var list = [31, 53, 13, 42, 1, 6, 313, 6];
var res = list.mergeSort();
console.log(res); //[ 1, 6, 13, 31, 42, 53, 313 ]