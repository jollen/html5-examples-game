window.addEventListener("load", function() {
	Modernizr.load([
	    {
	        load : [
	        	"cordova-2.6.0.js",      
	        	"js/jquery-1.9.2.min.js",
	        	"js/sizzle.js",
	        	"js/jquery.websocket.js",
	        	"js/jquery.tmpl.min.js",
	            "js/game.js"
	        ],
	        complete : function() {
	        	gameModule.gameStart();
	        	$("#status").createWebSocket();
	        }
	    }
	]);

}, false);