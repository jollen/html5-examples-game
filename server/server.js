var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
  	var pathname = url.parse(request.url).pathname;
   	
    console.log("Request received. API: " + pathname);

    response.writeHead(200, {
    	'Content-Type': 'text/html'
    });

    response.end('<h1>Hello World</h1>');
  }  

  var server = http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

// Export functions
exports.start = start;