// for(var i = 0; i<)
function delay(time) {
	for (var i = 0; i < time; i++) {
		var img = document.createElement('img');
		img.src = 'http://www.google.com.hk/images/srpr/logo11w.png?random=' + (Math.random());
		// document.body.appendChild(img);
	}
}
// delay(10);
delay(10 * 10);
// delay(1000 * 10);