// 单例模式

function _System(name) {
	this.name = name;
	this.ver = '0.1';
}
_System.prototype.getVer = function() {
	return System.instance.ver;
}
_System.prototype.setPwd = function(pwd) {
	System.instance.pwd = pwd;
}

function System(name = 'testAdmin') {
	if (System.instance instanceof _System) {
		return System.instance;
	}
	System.instance = new _System(name);
	return System.instance;
}


let system1 = System('miser');
let system2 = System();
system1.setPwd('123');

console.log(system1.name) // miser
console.log(system2.name) // miser
console.log(system1.getVer()) // 0.1

console.log(system1 === system2) // true