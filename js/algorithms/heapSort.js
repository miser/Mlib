// i:节点 i的left节点2i + 1  i的right节点:2i + 2
// length / 2 + 1 ... length 为 叶节点
// 从最后一个有子女的节点开始往前构建heap
// 构建完后，将heap数组的第一个移动到Array的最后一个
Object.defineProperty(Array.prototype, 'heapSort', {
	value: function() {
		var ary = this,
			heapSize = ary.length;

		function getLeftIndex(i) {
			return 2 * i + 1;
		}

		function getRightIndex(i) {
			return 2 * i + 2;
		}

		function maxHeap(i) {
			let leftIndex = getLeftIndex(i),
				rightIndex = getRightIndex(i),
				maxIndex = i;

			if (leftIndex < heapSize && ary[leftIndex] > ary[maxIndex]) {
				maxIndex = leftIndex;
			}
			if (rightIndex < heapSize && ary[rightIndex] > ary[maxIndex]) {
				maxIndex = rightIndex;
			}

			if (maxIndex !== i) {
				let tmp = ary[maxIndex];
				ary[maxIndex] = ary[i];
				ary[i] = tmp;
				maxHeap(maxIndex);
			}
		}
		for (var i = ary.length / 2; i >= 0; i--) {
			maxHeap(i);
		}

		for (var i = ary.length - 1; i > 0; i--) {
			let tmp = ary[0];
			ary[0] = ary[i];
			ary[i] = tmp;
			heapSize--;
			maxHeap(0);
		}

		return ary;
	},
	enumerable: false,
	configurable: false,
	writable: false,
});

var list = [31, 53, 13, 42, 1, 6, 313, 6];
var res = list.heapSort();
console.log(res); //[ 1, 6, 13, 31, 42, 53, 313 ]