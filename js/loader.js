window.addEventListener("load", function() {

	Modernizr.load([
	    {
	        load : [
	        	"jquery-1.9.2.min.js",
	        	"sizzle.js",
	        	"jquery.websocket.js",
	            "game.js"
	        ],
	        complete : function() {
	        	$("#status").createWebSocket();
	        }
	    }
	]);

}, false);