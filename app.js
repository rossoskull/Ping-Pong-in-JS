var canv = document.getElementById("paper");
var ctx = canv.getContext('2d');

var plBatX = 01, // Player bat X coord
	plBatY = canv.height / 2 - 50, // Player bat Y coord
	cpBatX = canv.width - 40, // Computer bat X coord
	cpBatY = canv.height / 2 - 50, // Computer bat Y coord
	cpBatVY = 5, // Computer bat velocity
	cBallX = 320,
	cBallY = 240,
	cBallVX = 6,
	cBallVY = 4,
	cBallVelY = 4,
	plName = "",
	activeSchema = "",
	plScore = 0,
	cpScore = 0,
	gamePlay = false;

var batSchema = ['#800000', '#ffffff', '#224912'];
var tableSchema = ['#112233', '#334455', '#662255'];
var textSchema = ['#987631', '#123994', '#61e213'];
var ballSchema = ['#987123', '#987123', '#FFFFFF'];


var colorBat = "";
var colorBall = "";
var colorText = "";
var colorTable = "";

var start = () => {
	if (setName()) {
		setInterval(update, 1000 / 60);
		canv.addEventListener("mousemove", function (event) {
			plBatY = event.clientY - 50;
		});
	};
};

var update = () => {
	// Draw the canvas
	ctx.fillStyle = colorTable;
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.fillStyle = colorBat;
	ctx.fillRect(plBatX, plBatY, 20, 100); // Bat width = 20px, height = 100px
	ctx.fillRect(cpBatX, cpBatY, 20, 100);
	ctx.beginPath();
	ctx.arc(cBallX, cBallY, 15, 0, 2 * Math.PI);
	ctx.fillStyle = colorBall;
	ctx.fill();
	ctx.font = "15px Source Code Pro Semibold";
	ctx.fillStyle = colorText;
	ctx.fillText(plName, 80, 25);
	ctx.fillText(plScore, 80, 40);
	ctx.fillText("Computer", 500, 25);
	ctx.fillText(cpScore, 500, 40);

	cBallX += cBallVX;
	cBallY += cBallVY;
	cpBatY += cpBatVY;

	if (cBallX > canv.width) {
		plScore++;
		cBallX = canv.width / 2;
	}

	if (cBallX < 0) {
		cpScore++;
		cBallX = canv.width / 2;
	}

	// Reverse vertical velocity of ball when it hits canvas edge
	if (cBallY > canv.height - 16 || cBallY < 16) {
		cBallVY = -cBallVY;
	}

	// Computer bat collision
	if (cBallX > cpBatX - 15 && (cBallY > cpBatY - 15 && cBallY < cpBatY + 115)) {
		cBallVX = -cBallVX;
		if (cBallY < cpBatY + 50) {
			cBallVY = -cBallVelY;
		} else {
			cBallVY = cBallVelY;
		}
	}

	// Player Bat collision
	if ((cBallX < plBatX + 35) && (cBallY > plBatY - 15 && cBallY < plBatY + 115)) {
		cBallVX = -cBallVX;
		if (cBallY < plBatY + 50) {
			cBallVY = -cBallVelY;
		} else {
			cBallVY = cBallVelY;
		}
	}


	// Computer Bat 'AI'

 
	if (cBallVX > 0) {
		if (cpBatY > cBallY) {
			//cpBatVY = -5;
		}

		if (cpBatY < cBallY) {
			cpBatVY = 5;
		}

	} else {
		cpBatVY = 0;
	}


	// Winner
	if (plScore >= 10) {
		alert("The winner is " + plName);
		reset();
	}

	if (cpScore >= 10) {
		alert("The winner is Computer");
		reset();
	}
}

var setActiveColorSchema = (schemaNumber) => {
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
var reset = () => {
	plScore = 0;
	cpScore = 0;
	alert("Good Game!");
	setName();
	setActiveColorSchema(activeSchema);
}

// Play or pause game
var storeBallVX = 0,
	storeBallVY = 0;
var pause = () => {
	let temp;
	temp = cBallVX;
	cBallVX = storeBallVX;
	storeBallVX = temp;

	temp = cBallVY;
	cBallVY = storeBallVY;
	storeBallVY = temp;
}
// logic play and pause
var playPause = () => {
	if (!gamePlay) {
		gamePlay = !gamePlay;
		start();
	} else {
		gamePlay = !gamePlay;
		pause();
	}
}
// Refactor
var setName = () => {
	plName = document.getElementById("name").value;
	if (plName == "" || plName == null) {
		alert("It is necessary to put the name!");
		return false;
	}
	activeSchema = document.getElementById("schema").value;
	if (activeSchema == "" || activeSchema == null) {
		alert("Select color");
		return false;
	}
	setActiveColorSchema(activeSchema);
	return true;
}
