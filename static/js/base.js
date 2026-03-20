let canvas;
let context;

// Framerate 
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let player = {
	x : 0,
	y : 0,
	width : 50,
	height : 80,
	xChange : 10,
	yChange : 10
}

// Click co-ordinates
let clickX;
let clickY;

// Movement's Initial Condition
let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

document.addEventListener("DOMContentLoaded", init, false);


function init() {
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");

	window.addEventListener("keydown", activate, false);
	window.addEventListener("keyup", deactivate, false);
	canvas.addEventListener("mousedown", getMousePosition, false)

	// Starting Player Position
	player.x = canvas.width / 2 - player.width / 2;
	player.y = canvas.height / 2 - player.height / 2;

	draw();
}


function draw() {
	// Manages the frames per second (fps) 
	// through the denominator of 'fpsInterval'
	window.requestAnimationFrame(draw);

	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	}
	then = now - (elapsed % fpsInterval);

	context.clearRect(0, 0, canvas.width, canvas.height);

	// Test Dot
	context.fillStyle = "Red"
	context.fillRect(5, 5, 5, 5)

	context.fillStyle = "cyan";
	context.fillRect(player.x, player.y, player.width, player.height);

	if (moveRight) {
		player.x = player.x + player.xChange;
	}
	if (moveUp) {
		player.y = player.y - player.yChange;
	}	
	if (moveDown) {
		player.y = player.y + player.yChange;
	}	
	if (moveLeft) {
		player.x = player.x - player.xChange;
	}
}


function activate(event) {
	let key = event.key;

	if (key === "ArrowLeft" ||
	    key === "ArrowRight" ||
	    key === "ArrowUp" ||
	    key === "ArrowDown") {

	    event.preventDefault();

	}

	if (key === "ArrowLeft") {
		moveLeft = true;
	} else if (key === "ArrowUp") {
		moveUp = true;
	} else if (key === "ArrowRight") {
		moveRight = true;
	} else if (key === "ArrowDown") {
		moveDown = true;
	}
}


function deactivate(event) {
	let key = event.key;

	if (key === "ArrowLeft") {
		moveLeft = false;
	} else if (key === "ArrowUp") {
		moveUp = false;
	} else if (key === "ArrowRight") {
		moveRight = false;
	} else if (key === "ArrowDown") {
		moveDown = false;
	}
}


// Calculating The User's Click Position Relative To The Canvas
// Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
function getMousePosition(event) {
	let rect = canvas.getBoundingClientRect();
        clickX = event.clientX - rect.left;
        clickY = event.clientY - rect.top;	

	console.log("Click's X co-ordinate" + clickX, 
		    "Click's Y co-ordinate" + clickY )
}

function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



