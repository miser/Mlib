// 封装了大量类的细节（变量等）,统一的创建入口
// 但是如果有新的类，需要添加到工厂里

function Android() {
	this.name = 'Android';
	this.ver = '8.0';
	this.company = 'Google';
}
Android.prototype.open = function() {
	console.log('opening Android');
}

function IOS() {
	this.name = 'ios';
	this.ver = '10.0';
	this.company = 'Apple';
}
IOS.prototype.open = function() {
	console.log('opening IOS');
}

function Win() {
	this.name = 'win';
	this.ver = '1';
	this.company = 'Microsoft';
}
Win.prototype.open = function() {
	console.log('opening Win');
}

function PhoneFactory() {
}
PhoneFactory.addPhone = function(phoneClass) {
	if (typeof phoneClass !== 'function') {
		return;
	}
	var name = phoneClass.prototype.constructor.name.toUpperCase();
	this.factory = this.factory || {};
	this.factory[name] = phoneClass;
}
PhoneFactory.create = function(name) {
	name = name.toUpperCase();
	var PhoneClass = this.factory[name];
	if(!PhoneClass) throw Error(`未知的手机型号`);

	return new PhoneClass();
}

PhoneFactory.addPhone(IOS);
PhoneFactory.addPhone(Android);
PhoneFactory.addPhone(Win);


var winPhone =  PhoneFactory.create('win');
winPhone.open();
var iosPhone =  PhoneFactory.create('ios');
iosPhone.open();
var androidPhone =  PhoneFactory.create('android');
androidPhone.open();

var otherPhone =  PhoneFactory.create('other'); // throw error





