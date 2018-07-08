// switch case 无法做逻辑判断？写代码尝试下
var unit = {
	year : 365,
	month : 30,
	week:7,
	day: 1
}
var days = 10000;
switch (days) {
	case days >= unit.year:
		tipTxt = parseInt(unit.year / days) + ' years';
		break;
	case days >= unit.month:
		tipTxt = parseInt(unit.month / days) + ' months';
		break;
	case days >= unit.week * 2:
		tipTxt = parseInt(unit.week / days) + ' weeks';
		break;
	case days == unit.day:
		console.log('24')
		tipTxt = '24 hours';
		break;
	default:
		tipTxt = days + ' days';
		break;
}
console.log(tipTxt); // 10000 days

switch (days) {
	case days >= unit.year ? days : null:
		tipTxt = parseInt(unit.year / days) + ' years';
		break;
	case days >= unit.month ? days : null:
		tipTxt = parseInt(unit.month / days) + ' months';
		break;
	case days >= unit.week * 2 ? days : null:
		tipTxt = parseInt(unit.week / days) + ' weeks';
		break;
	case days === unit.day ? days : null:
		console.log('24')
		tipTxt = '24 hours';
		break;
	default:
		console.log('default');
		tipTxt = days + ' days';
		break;
}
console.log(tipTxt); // 0 years