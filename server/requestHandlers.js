var querystring = require('querystring');
var couchdb = require('felix-couchdb');
var client = couchdb.createClient(5984, 'localhost');
var db = client.db('gamedb');

var history = [];

function start(response, query, clients) {
	console.log("in /start");
}

function send(response, query, clients) {
	console.log("in /send");
	
	var parsedquery = querystring.parse(query);
	
	var obj = {
       	no: history.length,
		scores: parsedquery.s,
		picture: parsedquery.p
	};

    // Save to CouchDB
    db.saveDoc(history.length, obj, function (err, done) {
        if (err) throw new Error(JSON.stringify(err));
        console.log("Saved to CouchDB");
    });
	
	history.push(obj);
	
	// DEBUG
	for (i = 0;i < history.length; i++) {
		console.log(i + ": " + history[i].scores + ", picture: [" + history[i].picture + "]");
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
