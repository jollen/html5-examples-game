window.addEventListener("load", function() {
	Modernizr.load([
	    {
	        load : [
	        	"js/jquery-1.9.2.min.js",
	        	"js/sizzle.js",
	        	"js/jquery.websocket.js",
	        	"js/jquery.tmpl.min.js",
	            "js/game.js",
	        ],
	        complete : function() {
	        	gameModule.gameStart();
	        	$("#status").createWebSocket();
	        }
	    }
	]);

}, false);