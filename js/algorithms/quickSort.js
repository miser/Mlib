Object.defineProperty(Array.prototype, 'quickSort', {
	value: function() {
		if(this.length === 0) return [];
		let ary = this;
		let left = [];
		let right = [];
		let current = [],
			currentVal = ary[0];
		for (var i = 1; i < ary.length; i++) {
			if(ary[i] < currentVal) {
				left.push(ary[i])
			} else if (ary[i] > currentVal) {
				right.push(ary[i])
			} else {
				current.push(ary[i])
			}
		}
		return left.quickSort().concat(currentVal).concat(right.quickSort());
	},
	enumerable: false,
	configurable: false,
	writable: false,
});

var list = [31, 53, 13, 42, 1, 6, 313, 6];
var res =  list.quickSort();
console.log(res);//[ 1, 6, 13, 31, 42, 53, 313 ]
