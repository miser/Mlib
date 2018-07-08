// 相邻的数不断比较（替换），直到将未排序的最大数（最小数）替换到未排序的最后一位
// 如同鱼吐泡泡，从水底缓慢上升直到水面
Object.defineProperty(Array.prototype, 'bubbleSort', {
	value: function() {
		var ary = this;
		for (var i = 0; i < ary.length - 1; i++) {
			for (var j = 0; j < ary.length - i - 1; j++) {
				let tmp;
				if (ary[j] > ary[j + 1]) {
					tmp = ary[j];
					ary[j] = ary[j + 1];
					ary[j + 1] = tmp;
				}
			}
		}
		return ary;
	},
	enumerable: false,
	configurable: false,
	writable: false,
});

var list = [31, 53, 13, 42, 1, 6, 313, 6];
var res = list.bubbleSort();
console.log(res); //[ 1, 6, 13, 31, 42, 53, 313 ]