function A() {
	this.name = 'a name'
};
// prototype 被重写
A.prototype = {
	getName: function() {
		return this.name
	}
};

function B() {
	this.name = 'b name'
};
B.prototype.getName = function() {
	return this.name;
}

function C() {
	this.name = 'c name';
}
// prototype 被重写
C.prototype = {
	getName: function() {
		return this.name
	},
	constructor:C
};

class D {
	constructor() {
		this.name = 'd name';
	}
	getName() {
		return this.name
	}
}
class DD extends D {
	constructor(){
		super();
		this.name = 'dd name'
	}
}
console.log('------------------ A -----------------')
var a = new A();
console.log(a.__proto__.__proto__.__proto__) // null
console.log(a.__proto__ === A.prototype) // true
console.log(a.__proto__.__proto__ === Object.prototype) // true
console.log(a.constructor === {}.constructor) // true
console.log(a.constructor === A) // false
console.log(a.constructor) //  Object() { [native code] }
console.log(a.constructor.prototype) // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// console.log('')
console.log('------------------ B -----------------')
var b = new B();
console.log(b.__proto__.__proto__.__proto__) // null
console.log(b.__proto__ === B.prototype) // true
console.log(b.__proto__.__proto__ === Object.prototype) // true
console.log(b.constructor === B.prototype.constructor) // true
console.log(b.constructor === B) // true
console.log(b.constructor) // 打印构造函数 ƒ B() {this.name = 'b name'}
console.log(b.constructor.prototype) // {getName: ƒ, constructor: ƒ}
// console.log('')
console.log('------------------ C -----------------')
var c = new C();
console.log(c.__proto__.__proto__.__proto__) // null
console.log(c.__proto__ === C.prototype) // true
console.log(c.__proto__.__proto__ === Object.prototype) // true
console.log(c.constructor === C.prototype.constructor) // true
console.log(c.constructor === C) // true
console.log(c.constructor) //  ƒ C() {this.name = 'c name';}
console.log(c.constructor.prototype) // {getName: ƒ, constructor: ƒ}
console.log('------------------ D -----------------')
var d = new D();
console.log(d.__proto__.__proto__.__proto__) // null
console.log(d.__proto__ === D.prototype) // true
console.log(d.__proto__.__proto__ === Object.prototype) // true
console.log(d.constructor === D.prototype.constructor) // true
console.log(d.constructor === D) // true
console.log(d.constructor) //  class D() {constructor() {this.name = 'd name';}getName() {return this.name}}
console.log(d.constructor.prototype) // {constructor:class D,getName:ƒ getName()}
console.log('------------------ DD -----------------')
var dd = new DD();
console.log(dd.__proto__.__proto__.__proto__.__proto__) // null
console.log(dd.__proto__ === DD.prototype) // true
console.log(DD.prototype.__proto__ === D.prototype) // true
console.log(D.prototype.__proto__ === Object.prototype) // true

console.log('------------------ Z ------------------')
function Z() {
	this.name = 'z name';
}

Z.prototype.getName = function() {
	return this.name
}
function ZZ(){

}
ZZ.prototype = new Z();

var z = new Z;
var zz = new ZZ;
var callZ = Z.prototype.getName.bind({
	name : 'call z name'
})
console.log(callZ.prototype) // undefined
console.log(callZ()) // call z name
z.__proto__.getName = function (){
	return 'z name __proto__'	
}
console.log(z.getName()) // z name __proto__
console.log(zz.getName()) // z name __proto__