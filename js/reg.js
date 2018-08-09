// num.toString().replace(/(\d)(?=(?:\d{3})+$)/g,'$1,')
var num = '1234567890';
var str = num.toString();

var reg = /(?=(\d{3})+$)/g;
// console.log(reg.exec(str))
console.log(str.replace(reg, function ($1) {
    return arguments[0] + ','
}))

// console.log('(?=1)(ABCAD)'.match(/A[A-Z]/g))