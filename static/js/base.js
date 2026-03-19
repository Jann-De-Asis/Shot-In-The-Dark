let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let player = {
	x : 0,
	y : 150,
	size : 10,
	xChange : 10,
	yChange : 10
};

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

	context.fillStyle = "cyan";
	context.fillRect(player.x, player.y, player.size, player.size);

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


function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



