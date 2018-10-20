
var canv = document.getElementById("paper");
var ctx = canv.getContext('2d');	

var plBatX = 20, // Player bat X coord
	plBatY = canv.height/2 - 50, // Player bat Y coord
	cpBatX = canv.width - 40, // Computer bat X coord
	cpBatY = canv.height/2 - 50, // Computer bat Y coord
	cpBatVY = 3, // Computer bat velocity
	cBallX = 320, 
	cBallY = 240, 
	cBallVX = 6, 
	cBallVY = 4,
	cBallVelY = 4,
	plName = "",
	activeSchema = "",
	plScore = 0,
	cpScore = 0,
	ballColor = '#000',
	textColor = '#000',
	playerColor = '#000',
	computerColor = '#000',
	backgroundColor = '#CCC',
	batSchema = ['#800000', '#ffffff', '#224912'],
	backgroundSchema = ['#112233', '#334455', '#662255'],
	textSchema = ['#987631', '#123994', '#61e213'],
	ballSchema = ['#987123', '#987123', '#FFFFFF'];

var batSchema = ['#800000', '#ffffff', '#224912'];
var tableSchema = ['#112233', '#334455', '#662255'];
var textSchema = ['#987631', '#123994', '#61e213'];
var ballSchema = ['#987123', '#987123', '#FFFFFF'];


var colorBat = "";
var colorBall = "";
var colorText = "";
var colorTable = "";

window.onload = function() {
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
	document.querySelector("#colorPicker").addEventListener("change", function(){
		var color = document.querySelector('#colorPicker').value;
		var elem = document.querySelector('#elementSelector').value;
		switch (elem) {
			case "ballColor":
				ballColor = color;
				break;
			case "playerColor":
				playerColor = color;
				break;
			case "computerColor":
				computerColor = color;
				break;
			case "backgroundColor":
				backgroundColor = color;
				break;
			case "textColor":
				textColor = color;
				break;
		}
	}, false)
};

var update = function() {
	// Draw the canvas

	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.fillStyle = playerColor;
	ctx.fillRect(plBatX, plBatY, 20, 100); // Bat width = 20px, height = 100px
	ctx.fillStyle = computerColor;
	ctx.fillRect(cpBatX, cpBatY, 20, 100);
	ctx.beginPath();
	ctx.arc(cBallX, cBallY, 15, 0, 2*Math.PI);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.font = "15px Source Code Pro Semibold";
	ctx.fillStyle = textColor;
	ctx.fillText(plName, 80, 25);
	ctx.fillText(plScore, 80, 40);
	ctx.fillText("Computer", 500, 25);
	ctx.fillText(cpScore, 500, 40);

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
	computerColor = batSchema[schemaNumber - 1];
	playerColor = batSchema[schemaNumber - 1];
	ballColor = ballSchema[schemaNumber - 1];
	textColor = textSchema[schemaNumber - 1];
	backgroundColor = backgroundSchema[schemaNumber - 1];

	if (!backgroundColor || !computerColor || !playerColor || !textColor || !ballColor) {
		computerColor = '#000';
		playerColor = '#000';
		ballColor = '#000';
		textColor = '#000';
		backgroundColor = '#ccc';
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
var storeBallVX = 0, storeBallVY = 0;
var pause = function() {
	var temp;
	temp = cBallVX;
	cBallVX = storeBallVX;
	storeBallVX = temp;

	temp = cBallVY;
	cBallVY = storeBallVY;
	storeBallVY = temp;
}