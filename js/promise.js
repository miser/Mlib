// 等待态（pending）、执行态（resolved）和拒绝态（rejected）

// 1 // p1 = new P(callback);
// 2 // p1.then(onFulfilled , onRejected) => 每个 then 返回一个新的 new P => p2
// 3 // 		- 由于一般不会手动修改 p2 的状态所以 内部会做处理
// 4 // 			- if onFulfilled 或 onRejected 返回 新的 new P => p3 那么会调用 p3.then 并将 p2 的 resolve和reject 作为参数传入
// 5 // 			  当 p3 触发 resolve 或 reject 时，那么 p2 的 resolve 或 reject 也会对应的触发
// 6 // 			  之后会触发 p2.then 后续的方法 重复 2 ~ 9 步，直到结束
// 7 // 			- else 直接调用 p2 的 resolve 或 reject 
// 8 //			- 如果p1的状态是pedding，那么会将p2的 callback push到 p1 自己的 onResolvedCallback 或 onRejectedCallback 中
// 9 //			  等 p1 的状态发生变化后调用相对的 onResolvedCallback 或 onRejectedCallback 里的那些被挂起的 callback


function change(status, value, funs) {
	this.status = status;
	this.data = value;
	for (var i = 0, len = funs.length; i < len; i++) {
		funs[i](value);
	}
}

function resolveFn() {
	if (this.status !== 'pending') return;
	var self = this;
	return function (value) {
		change.call(self, 'resolved', value, self.onResolvedCallback);
	}
}

function rejectFn(error) {
	if (this.status !== 'pending') return;
	var self = this;
	return function (error) {
		change.call(self, 'rejected', error, self.onRejectedCallback);
	}
}

function P(onFulfilled) {
	this.data;
	this.status = 'pending';
	this.onResolvedCallback = [];
	this.onRejectedCallback = [];
	onFulfilled(resolveFn.call(this), rejectFn.call(this));
}

function thenResolveCallback(callback, resolve, reject) {
	try {
		var nextP = callback(this.data);
		if (nextP instanceof P) {
			nextP.then(resolve, reject);
		} else {
			resolve(this.data);
		}
	} catch (e) {
		reject(e);
	}
}
function thenRejectCallback(callback, resolve, reject) {
	try {
		var nextP = callback(this.data);
		if (nextP instanceof P) {
			nextP.then(resolve, reject);
		} else {
			reject(this.data);
		}
	} catch (e) {
		reject(e);
	}
}

P.prototype.then = function (onFulfilled, onRejected) {
	let self = this;

	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function () { }
	onRejected = typeof onRejected === 'function' ? onRejected : function () { }

	if (this.status === 'resolved') {
		return new P(function (resolve, reject) {
			thenResolveCallback.call(self, onFulfilled, resolve, reject);
		})
	}
	if (this.status === 'rejected') {
		return new P(function (resolve, reject) {
			thenRejectCallback.call(self, onRejected, resolve, reject);
		})
	}
	if (self.status === 'pending') {
		return new P(function (resolve, reject) {
			self.onResolvedCallback.push(thenResolveCallback.bind(self, onFulfilled, resolve, reject));
			self.onRejectedCallback.push(thenRejectCallback.bind(self, onRejected, resolve, reject));
		})
	}
}
P.prototype.catch = function (onRejected) {
	return this.then(null, onRejected);
}

// doSomething => doSomethingElse => finalHandler
console.time('case 1')
console.time('first time')
doSomethingP()
	.then(doSomethingElseP)
	.then(function finalHandler(res) {
		console.log(res)
		console.timeEnd('case 1')
	})
	.catch(function (err) {
		console.log(err);
		console.log('err')
	})


// doSomething => doSomethingElse && finalHandler
// console.time('case 2')
// console.time('first time')
// doSomethingP().then(function() {
// 	doSomethingElseP()
// }).then(function finalHandler(res) {
// 	console.log(res)
// 	console.timeEnd('case 2')
// })


function doSomethingP() {
	return new P(function (resolve, reject) {
		console.log('run something P')
		setTimeout(function () {
			resolve('something')
			// reject('somtthing')
		}, 500)
	}, 'doSomethingP')
}

function doSomethingElseP() {
	return new P(function (resolve, reject) {
		console.timeEnd('first time')
		console.log('run somethingElse P')
		setTimeout(function () {
			resolve('somethingElse')
		}, 1000)
	}, 'doSomethingElseP')
}