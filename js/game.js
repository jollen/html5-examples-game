var gameModule = (function ($) {
	
	var ballX,
	    ballY,
	    ballR;
	    
	var scores;
	
	function randomBall() {
		ballX = Math.floor(Math.random() * 320);  // [0..320]
		ballY = Math.floor(Math.random() * 480);  // [0..480]
		ballR = Math.floor(Math.random() * 80);   // [0..80]
	}
	
	function drawBall() {
		var canvas = document.getElementById("cover");
		var ctx = canvas.getContext("2d");
		
		canvas.width = 320;
		canvas.height = 480;
		
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2, true);
		ctx.fill();
	}	
	
	function touchEvent(e) {
		var x,
		    y;
		    
		var x1, x2, y1, y2;
		    
		x = e.clientX;
		y = e.clientY;
				
        // 四個角
		x1 = ballX - ballR;
		x2 = ballX + ballR;		
		y1 = ballY - ballR;
		y2 = ballY + ballR;

		if ((x > x1) && (x < x2)) {
			if ((y > y1) && (y < y2)) {				
				scores = scores + (100 - ballR);
				console.log("Hit! Scores: " + scores);
			}
		}		
	}
	
	function gameStart() {
		document.getElementById("game").addEventListener("click", touchEvent, false);
		
		// Reset scores
		scores = 0;
		
		//
		$("#game-screen").fadeIn("slow");
		
		randomBall();
		drawBall();
	}
	
	return {
		gameStart: gameStart,
	}
}) ($);

$(document).ready(function () {
	gameModule.gameStart();
});