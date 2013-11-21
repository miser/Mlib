/**
 * 百度：
 * 我们把一个数字倒着读和原数字相同的数字称之为对称数，（例如1,121,88,8998），不考虑性能，请找出1—10000之间的对称数，要求用javaScript实现；
 */
(function() {
	var results = [];
	for (var i = 0; i <= 10000; i++) {
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
	console.log(results);
})();

/**
 * 百度：
 * !!typeof  "abc" === "string" 输出结果
 */
(function() {
	console.log( !! typeof "abc" === "string") //false,  先typeof  "abc",然后 !typeof  "abc",在!!typeof  "abc",最后!!typeof  "abc" === "string"
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

/**
 * 百度：
 * 假设知道总页数和当前页码，写出一个生成页码函数，要求当前页码用粗体显示，当前 页码前后各显示n个页码（n可设置），总的显示数目是2n+1（15分）
 */
(function() {
	var currentPage = 1,
		totalPage = 100,
		n = 0, 
		showCount = (2 * n + 1);

		if(showCount > totalPage) {
			//显示全部
		} else{
			if(showCount > totalPage) { 
				//显示部分 后面的用...
			}
			if(showCount > (totalPage-currentPage){
				//显示部分 前面的用...
			}
		}
})();


/**
 * Given an array that may contain nested arrays, return a flattened array. Input and out put are illustrated as follows.将含有嵌套的数组排序输出。*号部分为需要写出的代码。
 * var input = [{a: 'a'}, 'b', ['c', 'd'], ['e', ['f']], 'g'];
 * function flatten_array(arr){ 
 * 	var out = [];
 *	*******; 
 *	return out;
 * }
 */