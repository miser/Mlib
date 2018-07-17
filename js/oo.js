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
	constructor: C
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
	constructor() {
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

function ZZ() {

}
ZZ.prototype = new Z();

var z = new Z;
var zz = new ZZ;
var callZ = Z.prototype.getName.bind({
	name: 'call z name'
})
console.log(callZ.prototype) // undefined
console.log(callZ()) // call z name
z.__proto__.getName = function() {
	return 'z name __proto__'
}
console.log(z.getName()) // z name __proto__
console.log(zz.getName()) // z name __proto__



// 继承
console.log('---------- 继承 --------------');
// 每一段请分开执行
// console.log('链式继承')

// function Parent() {
// 	this.name = 'mike';
// 	this.jobs = ['job1', 'job2', 'job3']
// }

// function Child() {
// 	this.age = 12;
// }
// Child.prototype = new Parent(); //Child继承Parent，通过原型，形成链条
// var parent = new Parent();
// var child = new Child();
// var child2 = new Child();
// child.jobs.push('job4');
// console.log(child.name); // mike
// console.log(child.age);  // 12
// console.log(parent.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.jobs)  // [ 'job1', 'job2', 'job3', 'job4' ]
// console.log(child2.jobs)  // [ 'job1', 'job2', 'job3', 'job4' ]
// console.log(child.hasOwnProperty('name')) // false
// console.log(child.hasOwnProperty('age')) // true
// console.log(child instanceof Parent) // true
// console.log(child instanceof Child)  // true
// 缺点
// 无法实现多继承
// prototype 加方法需要在 new Parent() 执行之后
// 无法像父类传参数
// 引用属性所有实例共享


// console.log('构造继承')
// function Parent(name = 'mike') {
// 	this.name = name;
// 	this.jobs = ['job1', 'job2', 'job3']
// }
// Parent.prototype.getName = function(){
// 	return this.name;
// }
// function Child(name) {
// 	Parent.call(this,name);
// 	this.age = 12;
// }

// var parent = new Parent();
// var child = new Child('miser');
// var child2 = new Child('miser2');
// child.jobs.push('job4');
// console.log(child.name); // miser
// console.log(child.age);  // 12
// console.log(parent.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.jobs)  // [ 'job1', 'job2', 'job3', 'job4' ]
// console.log(child2.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.hasOwnProperty('name')) // true
// console.log(child.hasOwnProperty('age')) // true
// console.log(child instanceof Parent) // false
// console.log(child instanceof Child)  // true
// console.log(child.getName) // undefined
// 解决了子类实例共享父类引用属性的问题
// 可以给父类传参数
// 可以通过call实现继承多个父类
// 缺点
// 实例并不是父类的实例，只是子类的实例
// 只能继承父类的实例属性和方法，不能继承原型属性/方法
// 每个子类都有父类实例函数的副本，影响性能

// console.log('组合继承')
// function Parent(name = 'mike') {
// 	this.name = name;
// 	this.jobs = ['job1', 'job2', 'job3']
// }
// Parent.prototype.getName = function(){
// 	return this.name;
// }
// function Child(name) {
// 	Parent.call(this,name); // 第一次被调用
// 	this.age = 12;
// }
// Child.prototype = new Parent(); // 第二次被调用

// var parent = new Parent();
// var child = new Child('miser');
// var child2 = new Child('miser2');
// child.jobs.push('job4');
// console.log(child.name); // miser
// console.log(child.age);  // 12
// console.log(parent.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.jobs)  // [ 'job1', 'job2', 'job3', 'job4' ]
// console.log(child2.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.hasOwnProperty('name')) // true
// console.log(child.hasOwnProperty('age')) // true
// console.log(child instanceof Parent) // true
// console.log(child instanceof Child)  // true
// console.log(child.getName) // [Function]
// 缺点
// 调用了两次父类构造函数

// console.log('寄生组合继承')
// function Parent(name = 'mike') {
// 	this.name = name;
// 	this.jobs = ['job1', 'job2', 'job3']
// }
// Parent.prototype.getName = function(){
// 	return this.name;
// }
// function Child(name) {
// 	Parent.call(this,name); 
// 	this.age = 12;
// }
// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;

// var parent = new Parent();
// var child = new Child('miser');
// var child2 = new Child('miser2');
// child.jobs.push('job4');
// console.log(child.name); // miser
// console.log(child.age);  // 12
// console.log(parent.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.jobs)  // [ 'job1', 'job2', 'job3', 'job4' ]
// console.log(child2.jobs)  // [ 'job1', 'job2', 'job3' ]
// console.log(child.hasOwnProperty('name')) // true
// console.log(child.hasOwnProperty('age')) // true
// console.log(child instanceof Parent) // true
// console.log(child instanceof Child)  // true
// console.log(child.getName) // [Function]

// ES6里 class extend