var querystring = require('querystring');

var history = [];

function start(response, query) {
	console.log("in /start");
}

function send(response, query) {
	console.log("in /send");
	
	var parsedquery = querystring.parse(query);
	
	var obj = {
		score: parsedquery.s
	};
	
	history.push(obj);
	
	// DEBUG
	for (i = 0;i < history.length; i++) {
		console.log(i + ": " + history[i].score);
	}	
	
	// Push to websocket clients
}

function list(response, query) {
	console.log("in /list");
}

exports.start = start;
exports.send = send;
exports.list = list;