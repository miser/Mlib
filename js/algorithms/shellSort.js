Object.defineProperty(Array.prototype, 'shellSort', {
	value: function() {
		// inc← round(n / 2)
		// while inc > 0 do :
		// 		for i = inc..n− 1 do :
		// 			temp← a[i]
		// 		j← i
		// 	while j≥ inc and a[j− inc] > temp do :
		// 		a[j]← a[j− inc]
		// 	j← j− inc
		// 	a[j]← temp
		// 	inc← round(inc / 2)
		var ary = this,
			len = ary.length,
			tmp;
		for (var gap = len >> 1; gap > 0; gap = gap >> 1) {
			for (var i = gap; i < len; i++) {
				tmp = ary[i];
				for (var j = i - gap; j >= 0 && ary[j] > tmp; j -= gap) {
					// console.log(`gap:${gap},j:${j}`)
					console.log(`gap:${gap}, i:${i}, j:${j}, tmp:${tmp}`)
					ary[j + gap] = ary[j];
					console.log(ary)
				}
				ary[j + gap] = tmp;
			}
		}
		return ary;
	},
	enumerable: false,
	configurable: false,
	writable: false,
});

// var list = [31, 53, 13, 42, 1, 6, 313, 6];
var list = [99, 5, 69, 33, 56, 13, 22, 55, 77, 48, 12, 88, 2, 69, 99]
console.log(list)
var res = list.shellSort();
console.log(res); //[ 1, 6, 13, 31, 42, 53, 313 ]