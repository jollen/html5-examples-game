var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");

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