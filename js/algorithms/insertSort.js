// 扑克牌，选中一张，不断和之前的一张比较，直到合适位置
Object.defineProperty(Array.prototype, 'insertSort', {
	value: function() {
		var ary = this;
		for (var i = 1; i < ary.length; i++) {
			for (var j = i; j > 0; j--) {
				let tmp;
				if (ary[j] < ary[j - 1]) {
					tmp = ary[j];
					ary[j] = ary[j - 1];
					ary[j - 1] = tmp;
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
var res = list.insertSort();
console.log(res); //[ 1, 6, 13, 31, 42, 53, 313 ]