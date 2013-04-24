(function($) {
	$.fn.createWebSocket = function () {
		var ws = new WebSocket('ws://static.moko365.com:8888/', 'echo-protocol');
		
		// This 'this' is '#status' object according to this sample
		var content = this;
		
		ws.onopen = function() {
			content.html("<h2>Server ready !</h2>");
		};
		
		ws.onmessage = function() {
		};
		
		ws.onclose = function() {
		};
		
		ws.onerror = function() {
		};
	};
}) ($);