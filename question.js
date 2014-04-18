(function() {
	// switch case 无法做逻辑判断？写代码尝试下
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
			console.log('default');
			tipTxt = days + ' days';
			break;
	}
})();