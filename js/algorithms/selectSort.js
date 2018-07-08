Object.defineProperty(Array.prototype, 'selectSort', {
	value: function() {
		var ary = this;
		var i, j, min;
		var temp;
		var len = ary.length;
		for (var i = 0; i < len - 1; i++) {
			min = i;
			for (j = i + 1; j < len; j++) {
				if (ary[min] > ary[j]) {
					min = j;
				}
			}
			temp = ary[min];
			ary[min] = ary[i];
			ary[i] = temp;
		}
		return ary;
	},
	enumerable: false,
	configurable: false,
	writable: false,
});

var list = [31, 53, 13, 42, 1, 6, 313, 6];
var res = list.selectSort();
console.log(res); //[ 1, 6, 13, 31, 42, 53, 313 ]