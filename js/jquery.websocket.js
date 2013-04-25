(function($) {
	var ws;
	
	var scoresArray;
	
	$.fn.displayScoreBoard = function() {
		for (i = 0; i < scoresArray.length; i++) {
			this.append("<p>" + scoresArray[i].no + "," + scoresArray[i].scores + "</p>");	
		}		
	};
	
	$.fn.sendMessage = function(str) {
		var obj = {
			scores: str
		};
		ws.send(JSON.stringify(obj));
	};
	
	$.fn.createWebSocket = function () {
		ws = new WebSocket('ws://127.0.0.1:8888/', 'echo-protocol');
		
		// This 'this' is '#status' object according to this sample
		var content = this;
		
		ws.onopen = function() {
			content.html("<h2>Server ready !</h2>");
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
		};
		
		ws.onerror = function() {
		};
	};
}) ($);