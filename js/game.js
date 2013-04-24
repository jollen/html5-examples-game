var gameModule = (function ($, Sizzle) {
	
	var ballX,
	    ballY,
	    ballR;
	    
	var scores;
	
	var timeoutVar;
	
	var balls;
	
	// Used by drawBall
	var imageObj = new Image();
	
	function randomBall(w, h, r) {
		ballX = Math.floor(Math.random() * w);  
		ballY = Math.floor(Math.random() * h); 
		ballR = Math.floor(Math.random() * r); 
		
		if (ballR < 30) ballR = 30;
	}
	
	function drawBall() {
		var canvas = document.getElementById("cover");
		var ctx = canvas.getContext("2d");
		
		// Use Sizzle selector to get attributes
		var background = Sizzle("#game")[0],
			rect = background.getBoundingClientRect();
		
		canvas.width = rect.width;
		canvas.height = rect.height;
		
		randomBall(canvas.width, canvas.height, 200);
		
		//ctx.fillStyle = "black";
		//ctx.beginPath();
		//ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2, true);
		//ctx.fill();		
		
		// <img src='img/bubble.jpg' />
		imageObj.src = 'img/bubble.jpg';
		ctx.drawImage(imageObj, ballX, ballY, ballR, ballR);
				
		if (balls <= 10) {
			timeoutVar = setTimeout(drawBall, 1000);
			balls = balls + 1;
		} else {
			// Game Over
			gameOver();
		}
	}	
	
	function gameOver() {
		$("#game-screen").css('display', 'none');
		
		$("#score-board").fadeIn("slow");
		
		// Send game score 
		$("#status").sendMessage(scores);
	}
	
	function touchEvent(e) {
		var x,
		    y;
		    
		var x1, x2, y1, y2;
		    
		x = e.clientX;
		y = e.clientY;
				
        // 四個角
		//x1 = ballX - ballR;
		//x2 = ballX + ballR;		
		//y1 = ballY - ballR;
		//y2 = ballY + ballR;
		x1 = ballX;
		x2 = ballX + ballR;
		y1 = ballY;
		y2 = ballY + ballR;

		if ((x > x1) && (x < x2)) {
			if ((y > y1) && (y < y2)) {				
				scores = scores + (210 - ballR);
				console.log("Hit! Scores: " + scores);
				
				$("#score-board").html(scores);
			}
		}		
	}
	
	function gameStart() {
		document.getElementById("game").addEventListener("click", touchEvent, false);
		
		// Reset scores
		scores = 0;
		
		//
		balls = 1;
		
		//
		$("#game-screen").fadeIn("slow");
		
		drawBall();
	}
	
	return {
		gameStart: gameStart,
	}
}) ($, Sizzle);

$(document).ready(function () {
	gameModule.gameStart();
});