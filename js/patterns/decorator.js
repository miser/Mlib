// 增加税
function addTaxDecorator() {
	this.price = (this.price * (1 + .12)).toFixed(2);
}
// 转化为美元
function toDollarDecorator() {
	this.price = (this.price / 6.5).toFixed(2);
}
// 转化为欧元
function toEuroDecorator() {
	this.price = (this.price / 8).toFixed(2);
}

function conectDecorator(fn, callbacks) {
	let originFn = fn;
	let result, fns;
	if (typeof callbacks === 'function') {
		fns = [];
		fns.push(callbacks);
	} else if (!Array.isArray(callbacks)) {
		throw new Error('callbacks is not function or array')
	} else {
		fns = callbacks;
	}
	return function() {
		var args = Array.prototype.slice.call(arguments);
		for (let i = 0; i < fns.length; i++) {
			if (typeof fns[i] !== 'function') {
				continue;
			}
			result = fns[i].apply(this, args.concat(result))
		}
		return originFn.apply(this, args.concat(result));
	}
}


function Moeny(price) {
	this.price = price;
}
Moeny.prototype.getPrice = function() {
	return this.price;
}

Moeny.prototype.getPrice = conectDecorator(Moeny.prototype.getPrice, [addTaxDecorator]);


var moeny1 = new Moeny(100);
moeny1.getPrice = conectDecorator(Moeny.prototype.getPrice, [toDollarDecorator]);
// moeny1.getPrice = conectDecorator(Moeny.prototype.getPrice, [addTaxDecorator, toDollarDecorator]);
console.log(moeny1.getPrice())

var moeny2 = new Moeny(150);
// moeny2.getPrice = conectDecorator(Moeny.prototype.getPrice, [addTaxDecorator, toEuroDecorator]);
console.log(moeny2.getPrice());