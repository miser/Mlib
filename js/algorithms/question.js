/*
 *  一些现实中会遇到的一些小题目
 */


/**
 * 获得1-10000以内的回数数量
 */
(function() {
	var results = [];
	for (var i = 1; i <= 10000; i++) {
		var str = i.toString();
		if (str.length == 1) {
			results.push(i);
		} else {
			//len
			var count = 0;
			var len = str.length,
				isRight = true,
				index = 0;
			while (len / 2 >= index) {
				count++;
				if (str[index] != str[len - (index + 1)]) {
					isRight = false;
					break;
				}
				index++;
				if (count > 7) break;
			}
			if (isRight) {
				results.push(i);
			}
		}
	}
	console.log(results.length);
})();
// 或
(function() {
	var out = [];
	for (var i = 1; i <= 10000; i++) {
		var numberStr = i + '',
			reverseNumber = numberStr.split('').reverse().join('');
		if (numberStr === reverseNumber) out.push(i)
	}
	console.log(out.length)
})();

/*
 * var input = [{a: 'a'}, 'b', ['c', 'd'], ['e', ['f']], 'g']; 将含有嵌套的数组排序输出
 */
(function() {
	var a = [{
			a: 'a'
		},
		'b', ['c', 'd'],
		['e', ['f', ['g']]], 'h'
	];

	function flatten_array(arr) {
		var out = [];

		function parse(array) {
			for (var index in array) {
				var item = array[index];
				if (typeof item == "string") {
					out.push(item);
				} else if (item instanceof Array) {
					parse(item);
				} else {
					for (var key in item) {
						parse(item[key]);
					}
				}
			}
		}
		parse(arr);
		return out;
	}
	var res = flatten_array(a);
	console.log(res);
})();
// 或
(function() {
	var a = [{
			a: 'a'
		},
		'b', ['c', 'd'],
		['e', ['f', ['g']]], 'h'
	];


	function parse(ary) {
		var o = [];
		for (var i = 0; i < ary.length; i++) {
			if (Array.isArray(ary[i])) {
				o = o.concat(parse(ary[i]))
			} else if (typeof ary[i] === 'string') {
				o.push(ary[i])
			} else {
				var item = ary[i]
				for (var key in item) {
					o = o.concat(parse(item[key]))
				}
			}
		}
		return o
	}
	var out = parse(a);
	console.log(out)
})();

(function() {
	//按照层数，把同一层的属性放在同一个子数组内 source => [[a,e],[b,v,f,m],[c,w,i],[d,j,o,t,x],[p,r,y]]
	var source = {
		a: {
			b: {
				c: {
					d: 'h',
					j: 'l',
					o: {
						p: 'q',
						r: 's'
					},
					t: 'u'
				}
			},
			v: {
				w: {
					x: {
						y: 'z'
					}
				}
			}
		},
		e: {
			f: {
				i: 'k'
			},
			m: 'n'
		}
	}
	let cache = {};

	function parse(obj, deep = 0) {
		if (typeof obj === 'string') return [];

		var keys = Object.keys(obj);
		for (var key in obj) {
			parse(obj[key], deep + 1)
		}
		cache[deep] = cache[deep] || [];
		cache[deep] = cache[deep].concat(keys);
	}
	parse(source)
	cache.length = Object.keys(cache).length;
	var res = Array.prototype.slice.call(cache);
	console.log(res)
})();

/*
 * !!typeof  "abc" === "string" 输出结果
 */
(function() {
	// 先typeof  "abc",然后 !typeof  "abc",在!!typeof  "abc",最后!!typeof  "abc" === "string"
	console.log(!!typeof "abc" === "string") //false
	//js 运算符优先级
	// . [] ()	字段访问、数组下标、函数调用以及表达式分组
	// ++ -- - ~ ! delete new typeof void	一元运算符、返回数据类型、对象创建、未定义值
	// * / %	乘法、除法、取模
	// + - +	加法、减法、字符串连接
	// << >> >>>	移位
	// < <= > >= instanceof	小于、小于等于、大于、大于等于、instanceof
	// == != === !==	等于、不等于、严格相等、非严格相等
	// &	按位与
	// ^	按位异或
	// |	按位或
	// &&	逻辑与
	// ||	逻辑或
	// ?:	条件
	// = oP=	赋值、运算赋值
	// ,	多重求值
})();