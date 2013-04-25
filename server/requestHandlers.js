var querystring = require('querystring');

var history = [];

function start(response, query, clients) {
	console.log("in /start");
}

function send(response, query, clients) {
	console.log("in /send");
	
	var parsedquery = querystring.parse(query);
	
	var obj = {
		scores: parsedquery.s
	};
	
	history.push(obj);
	
	// DEBUG
	for (i = 0;i < history.length; i++) {
		console.log(i + ": " + history[i].scores);
	}	
	
	var scoresObj = {
		type: 'scores',
		data: history
	};
	
	// Push to websocket clients
	for (i = 0; i < clients.length; i++) {
		clients[i].sendUTF(JSON.stringify(scoresObj));
	}
}

function list(response, query, clients) {
	console.log("in /list");
}

exports.start = start;
exports.send = send;
exports.list = list;