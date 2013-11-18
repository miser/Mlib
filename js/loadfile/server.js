var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if(req.url == '/test1'){
		setTimeout(function() {
			res.end();
		}, 1000 * 5);
  } else {
  	res.end();
  }
  // res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');