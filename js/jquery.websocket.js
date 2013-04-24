(function($) {
	var ws;
	
	$.fn.sendMessage = function(str) {
		var obj = {
			scores: str
		};
		ws.send(JSON.stringify(obj));
	};
	
	$.fn.createWebSocket = function () {
		ws = new WebSocket('ws://static.moko365.com:8888/', 'echo-protocol');
		
		// This 'this' is '#status' object according to this sample
		var content = this;
		
		ws.onopen = function() {
			content.html("<h2>Server ready !</h2>");
		};
		
		ws.onmessage = function(message) {
			var scoresObj = JSON.parse(message.data);
			var scoresArray = scoresObj.data;
			
			for (i = 0; i < scoresArray.length; i++) {
				content.append("<p>" + scoresArray[i].no + "," + scoresArray[i].scores + "</p>");	
			}
		};
		
		ws.onclose = function() {
		};
		
		ws.onerror = function() {
		};
	};
}) ($);