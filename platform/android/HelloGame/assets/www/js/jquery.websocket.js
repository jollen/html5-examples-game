(function($) {
	var ws;
	
	var scoresArray;
	var scoreBoardHtml = $("#active-score-board").html();

	$.fn.displayScoreBoard = function() {
		// THIS IS OLD STYLE
		//for (i = 0; i < scoresArray.length; i++) {
		//	this.append("<p>" + scoresArray[i].no + "," + scoresArray[i].scores + "</p>");	
		//}		
				
		// Use new style
		$("#active-score-board").html(scoreBoardHtml);
		$("#scoresTemplate").tmpl(scoresArray).appendTo("#active-score-board");
	};
		
	$.fn.sendMessage = function(str) {
		// WE DONT USE IT NOW
		//var obj = {
		//	s: str,
		//	u: "jollen"
		//};
		//ws.send(JSON.stringify(obj));
	};
	
	$.fn.createWebSocket = function () {
		
		if ("WebSocket" in window) {
			ws = new WebSocket('ws://static.moko365.com:8888/', 'echo-protocol');
		} else {
			alert("We use WebSocketImpl"); 
			ws = new WebSocketImpl('ws://static.moko365.com:8888/', 'echo-protocol');	
			ws.connect();
		}
		
		// This 'this' is '#status' object according to this sample
		var content = this;
		
		ws.onopen = function() {
			content.html("<h2>Server Ready</h2>");
		};
		
		ws.onmessage = function(message) {
			var scoresObj = JSON.parse(message.data);
			scoresArray = scoresObj.data;
			
			// Empty its content
			//content.empty();
			
			//for (i = 0; i < scoresArray.length; i++) {
			//	content.append("<p>" + scoresArray[i].no + "," + scoresArray[i].scores + "</p>");	
			//}
			
			$("#active-score-board").displayScoreBoard();
		};
		
		ws.onclose = function() {
			content.html("<h2>Server Closed</h2>");			
		};
		
		ws.onerror = function() {
			content.html("<h2>Server Error</h2>");						
		};
	};
}) ($);