var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
  }  

  var server = http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

// Export functions
exports.start = start;
