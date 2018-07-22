/*
test1.js 和 test2.js 会被一个一个座位source传入进来
*/
module.exports = function(source, map) {
	return source;
	// const callback = this.async();
	// asyncFn(function() {
	// 	callback(null, source);
	// })
}

function asyncFn(callback) {
	setTimeout(function() {
		callback();
	}, 1000 * 3)
}