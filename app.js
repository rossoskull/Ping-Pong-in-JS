
var canv = document.getElementById("paper");
var ctx = canv.getContext('2d');	

window.onload = function() {
	init();
	plName = prompt("Enter Your Name : ");
	if ( plName == "" || plName == null ) {
		plName = "Player";
	}

	activeSchema = prompt("Choose color scheme (1,2, or 3)");

	setInterval(update, 1000/60);
	setActiveColorSchema(activeSchema);
	canv.addEventListener("mousemove", function(event) {
		plBatY = event.clientY - 50;
	});
};

var init = function() {
	window.plBatX = 20, // Player bat X coord
	window.plBatY = canv.height/2 - 50, // Player bat Y coord
	window.cpBatX = canv.width - 40, // Computer bat X coord
	window.cpBatY = canv.height/2 - 50, // Computer bat Y coord
	window.cpBatVY = 3, // Computer bat velocity
	window.cBallX = 320, 
	window.cBallY = 240, 
	window.cBallVX = 6, 
	window.cBallVY = 4,
	window.cBallVelY = 4,
	window.plName = "",
	window.activeSchema = "",
	window.plScore = 0,
	window.cpScore = 0;

	window.batSchema = ['#800000', '#ffffff', '#224912'];
	window.tableSchema = ['#112233', '#334455', '#662255'];
	window.textSchema = ['#987631', '#123994', '#61e213'];
	window.ballSchema = ['#987123', '#987123', '#FFFFFF'];

	window.storeBallVX = 0, storeBallVY = 0;

	window.colorBat = "";
	window.colorBall = "";
	window.colorText = "";
	window.colorTable = "";
};

var canvasDraw = function(){

	ctx.fillStyle = colorTable;
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.fillStyle = colorBat;
	ctx.fillRect(plBatX, plBatY, 20, 100); // Bat width = 20px, height = 100px
	ctx.fillRect(cpBatX, cpBatY, 20, 100);
	ctx.beginPath();
	ctx.arc(cBallX, cBallY, 15, 0, 2*Math.PI);
	ctx.fillStyle = colorBall;
	ctx.fill();
	ctx.font = "15px Source Code Pro Semibold";
	ctx.fillStyle = colorText;
	ctx.fillText(plName, 80, 25);
	ctx.fillText(plScore, 80, 40);
	ctx.fillText("Computer", 500, 25);
	ctx.fillText(cpScore, 500, 40);

}

var update = function() {
	// Draw the canvas
	canvasDraw();

	cBallX += cBallVX;
	cBallY += cBallVY;
	cpBatY += cpBatVY;

	if ( cBallX > canv.width ) {
		plScore++;
		cBallX = canv.width/2;
	}

	if ( cBallX < 0 ) {
		cpScore++;
		cBallX = canv.width/2;
	}

	// Reverse vertical velocity of ball when it hits canvas edge
	if ( cBallY > canv.height-16 || cBallY < 16 ) {
		cBallVY = -cBallVY;
	}

	// Computer bat collision
	if ( cBallX > cpBatX - 15  &&  ( cBallY > cpBatY - 15 && cBallY < cpBatY + 115 ) ) {
		cBallVX = -cBallVX;
		if ( cBallY < cpBatY + 50 ) {
			cBallVY = -cBallVelY;
		} else {
			cBallVY = cBallVelY;
		}
	}

	// Player Bat collision
	if ( (cBallX < plBatX + 35 ) &&  ( cBallY > plBatY - 15 && cBallY < plBatY + 115 ) ) {
		cBallVX = -cBallVX;
		if ( cBallY < plBatY + 50 ) {
			cBallVY = -cBallVelY;
		} else {
			cBallVY = cBallVelY;
		}
	}


	// Computer Bat 'AI'
	if ( cBallVX > 0 ) {
		if ( cpBatY > cBallY ) {
			cpBatVY = -5;
		}

		if ( cpBatY < cBallY ) {
			cpBatVY = 5;
		}

	} else {
		cpBatVY = 0;
	}
	

	// Winner
	displayWinner();
}

var displayWinner = function (){

	if ( plScore >= 10 ) {
		alert("The winner is " + plName);
		reset();
	}

	if ( cpScore >= 10 ) {
		alert("The winner is Computer");
		reset();
	}

}

var setActiveColorSchema = function (schemaNumber) {
    colorBat = batSchema[schemaNumber - 1];
    colorBall = ballSchema[schemaNumber - 1];
    colorText = textSchema[schemaNumber - 1];
    colorTable = tableSchema[schemaNumber - 1];

    if (!colorTable || !colorBat || !colorText || !colorBall) {
    	colorBat = '#000';
    	colorBall = '#000';
    	colorText = '#000';
    	colorTable = '#ccc';
	}
}

// Reset the game
var reset = function() {
	plScore = 0;
	cpScore = 0;
	alert("Good Game!");
	plName = prompt("Enter your name : ");
	if ( plName == "" || plName == null ) {
		plName = "Player";
	}

    activeSchema = prompt("Choose color scheme (1,2, or 3)");
    setActiveColorSchema(activeSchema);
}

// Play or pause game

var pause = function() {
	var temp;
	temp = cBallVX;
	cBallVX = storeBallVX;
	storeBallVX = temp;

	temp = cBallVY;
	cBallVY = storeBallVY;
	storeBallVY = temp;
}