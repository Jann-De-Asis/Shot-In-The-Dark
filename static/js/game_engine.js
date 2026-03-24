/* 
JavaScript's ES6 Modules for import and export was learned here:
Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
Timestamp: 2:36 
*/
import {PlayersProjectile} from "./classes/projectiles.js";
import {inGameButton} from "./classes/userInterface.js";

let canvas;
let ctx;

// Framerate 
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let ratio = window.devicePixelRatio;

let onScreenProjectiles = []; 
let inGameButtons = [];

// Mouse co-ordinates
let clickPos;
let mousePos;

document.addEventListener("DOMContentLoaded", init, false);


function init() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	window.addEventListener("keydown", activate, false);
	window.addEventListener("keyup", deactivate, false);
	canvas.addEventListener("mousedown", onClick, false);

	document.addEventListener("fullscreenchange", exitFullscreen, false);

	canvas.addEventListener("mousemove", getMousePosition, false);

	inGameButtons.push(
		new inGameButton({
			type : "fullscreenButton",
			x : {
				canvasWidth : canvas.width,
				difference : 20
			}, 
			y : {
				canvasHeight : 0,
				difference : 10
			},  
			size : 10, 
			colour : "gray",
		})
	);

	// Starting Player Position
	player.x = canvas.width / 2 - player.width / 2;
	player.y = canvas.height / 2 - player.height / 2;

	draw();
};


function draw() {
	window.requestAnimationFrame(draw);
	
	// Manages the frames per second (fps) 
	// through the denominator of 'fpsInterval'.
	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	};
	then = now - (elapsed % fpsInterval);

	// Clearing the canvas every frame to give
	// the illusion of movement.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Constantly updating the scale to account for changes
	// in size in fullscreen mode.
	if (scale) {
		scalingCanvas(window.innerWidth, window.innerHeight);
	} else {
		scalingCanvas(600, 400);
	};

	ctx.fillStyle = "red";
	ctx.fillRect(player.x, player.y, player.width, player.height);

	if (moveRight) {
		player.x += player.xChange;
	};
	if (moveUp) {
		player.y -= player.yChange;
	};
	if (moveDown) {
		player.y += player.yChange;
	};
	if (moveLeft) {
		player.x -= player.xChange;
	};

	// Looping backwards to account for projectiles being 
	// removed and avoiding an 'out-of-range' error. 
	for (let i = (onScreenProjectiles.length - 1); i >= 0; i--) {
		let projectile = onScreenProjectiles[i];
		projectile.project(ctx);
	};


	for (let button of inGameButtons) {	
		button.x.canvasWidth = canvas.width;

		ctx.fillStyle = button.colour;
		ctx.fillRect(
			button.x.canvasWidth - button.x.difference, 
			button.y.difference - button.y.canvasHeight, 
			button.size, 
			button.size
		);
	};

	// Reference Dot
	ctx.fillStyle = "orange";
	ctx.fillRect(200, 200, 10, 10);

};

// SINGLEPLAYER

let player = {
	x : 0,
	y : 0,
	width : 15,
	height : 25,
	xChange : 5,
	yChange : 5
};

let shiftSprint = false;
// Multiplied
let sprintSpeed = 2;

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;


function activate(event) {
	let key = event.key.toLowerCase();

	if (key === "shift") {
		shiftSprint = true;

		player.xChange = player.xChange * sprintSpeed;
		player.yChange = player.yChange * sprintSpeed;
	};
	
	if (key === "a") {
		moveLeft = true;
	} else if (key === "w") {
		moveUp = true;
	} else if (key === "d") {
		moveRight = true;
	} else if (key === "s") {
		moveDown = true;
	};
};


function deactivate(event) {
	let key = event.key.toLowerCase();

	if (key === "shift") {
		shiftSprint = false;
		
		player.xChange = player.xChange / sprintSpeed;
		player.yChange = player.yChange / sprintSpeed;
	};
	
	
	if (key === "a") {
		moveLeft = false;
	} else if (key === "w") {
		moveUp = false;
	} else if (key === "d") {
		moveRight = false;
	} else if (key === "s") {
		moveDown = false;
	};
};


function onClick(event) {
	/*
	Calculating The User's Click Position Relative To The Canvas
	Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
	*/
	let rect = canvas.getBoundingClientRect();
        clickPos = {
			x : event.clientX - rect.left,
          	y : event.clientY - rect.top
	};

	// Left-mouse button
	if (event.button === 0) {
		/* 
		Finding the angle and velocity inverse and basic trigonometry.
		Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
		Reference Link: (https://youtu.be/HXquxWtE5vA?si=n6eukRFpBSWR7r9_&t=8459)
		Timestamp: 2:20:59 
		*/
		const angle = Math.atan2(
			clickPos.y - player.y, 
			clickPos.x - player.x
			);
		
		const velocity = {
			x: Math.cos(angle) * 50,
			y: Math.sin(angle) * 50
		};

		onScreenProjectiles.push(
			new PlayersProjectile({
				x : player.x, 
				y : player.y,
				size : 10,
				colour : "yellow",
				velocity
				})
			);
	};

	
	for (let button of inGameButtons) {
		if (button.type === "fullscreenButton") {
			if (button.isInside(clickPos, button)) {
				scale = button.toggleFullscreen(canvas);
			};
		};
	};
};


// USER INTERFACE

let scale = false;

function exitFullscreen() {
	if (document.fullscreenElement === null) {
		scale = false;
	};
};


// MISCELLANEOUS

/*
Scaling the canvas based on new sizes while adapting for high-DPI displays.
Reference Link (https://www.xjavascript.com/blog/how-do-i-fix-blurry-text-in-my-html5-canvas/)
Section 2.2 in Table of Contents
*/
function scalingCanvas(width, height) {

	canvas.width = width * ratio;
	canvas.height = height * ratio;
	canvas.getContext("2d").scale(ratio, ratio);

	return canvas;
};	


function getMousePosition(event) {
		let rect = canvas.getBoundingClientRect();
        mousePos = {
			x : event.clientX - rect.left,
          	y : event.clientY - rect.top
		};

		for (let button of inGameButtons) {
			if (button.isInside(mousePos, button)) {
				button.colour = "brown";
			} else {
				button.colour = "gray";
			};
		};
};


function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};