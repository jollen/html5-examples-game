var http = require("http");
var url = require("url");
var WebSocketServer = require('websocket').server;

function start(handlers) {
  function onRequest(request, response) {
  	var pathname = url.parse(request.url).pathname;
  	var query = url.parse(request.url).query;
   	
    console.log("Request received. API: " + pathname);
    
    if (typeof handlers[pathname] === 'function') {
    	handlers[pathname](response, query);
    }

    response.writeHead(200, {
    	'Content-Type': 'text/html'
    });

    response.end('<h1>Hello World</h1>');
  }  

  var server = http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
  
  /**
   * Create WebSocket server
   */   
   var wsServer = new WebSocketServer({
  		httpServer: server,
  		autoAcceptConnections: false
  	});
  	
  function onWsConnMessage(message) {
  	console.log("onWsConnMessage: " + message.utf8Data);
  }
  	
  function onWsRequest(request) {
 	console.log("Websocket connection requested");
 	
 	var connection = request.accept('echo-protocol', request.origin);
 	
 	connection.on('message', onWsConnMessage);
  }
  	
  wsServer.on('request', onWsRequest);
}

// Export functions
exports.start = start;