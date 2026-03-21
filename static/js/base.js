/* JavaScript's ES6 Modules for import and export was learned here:
   Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
   Timestamp: 2:36 */
import {PlayersProjectile} from "./projectiles.js";

let canvas;
let context;

// Framerate 
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let player = {
	x : 0,
	y : 0,
	width : 15,
	height : 25,
	xChange : 10,
	yChange : 10
}

let onScreenProjectiles = []; 

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
	canvas.addEventListener("mousedown", activate, false)

	// Starting Player Position
	player.x = canvas.width / 2 - player.width / 2;
	player.y = canvas.height / 2 - player.height / 2;

	draw();
}


function draw() {
	window.requestAnimationFrame(draw);
	
	// Manages the frames per second (fps) 
	// through the denominator of 'fpsInterval'.
	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	}
	then = now - (elapsed % fpsInterval);

	// Clearing the canvas every frame to give
	// the illusion of movement.
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "red";
	context.fillRect(player.x, player.y, player.width, player.height);

	// Looping backwards to account for projectiles being 
	// removed and avoiding an 'out-of-range' error. 
	for (let i = (onScreenProjectiles.length - 1); i >= 0; i--) {
		let projectile = onScreenProjectiles[i]
		projectile.project(context)
	}

	if (moveRight) {
		player.x += player.xChange;
	}
	if (moveUp) {
		player.y -=  player.yChange;
	}	
	if (moveDown) {
		player.y += player.yChange;
	}	
	if (moveLeft) {
		player.x -= player.xChange;
	}
}

function activate(event) {
	let key = event.key;
	let mouse = event.button;

	if (key === "a") {
		moveLeft = true;
	} else if (key === "w") {
		moveUp = true;
	} else if (key === "d") {
		moveRight = true;
	} else if (key === "s") {
		moveDown = true;
	}

	// Left-mouse button
	if (mouse === 0) {
		/* Finding the angle and velocity inverse and basic trigonometry.
		Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
		Reference Link: (https://youtu.be/HXquxWtE5vA?si=n6eukRFpBSWR7r9_&t=8459)
		Timestamp: 2:20:59 */
		const angle = Math.atan2(
			clickY - player.y, 
			clickX - player.x
			);
		
		const velocity = {
			x: Math.cos(angle) * 50,
			y: Math.sin(angle) * 50
		}

		onScreenProjectiles.push(
			new PlayersProjectile({
				x : player.x, 
				y : player.y,
				size : 10,
				colour : "yellow",
				velocity
				})
			);
	}
}

function deactivate(event) {
	let key = event.key;

	if (key === "a") {
		moveLeft = false;
	} else if (key === "w") {
		moveUp = false;
	} else if (key === "d") {
		moveRight = false;
	} else if (key === "s") {
		moveDown = false;
	}
}

/*
Calculating The User's Click Position Relative To The Canvas
Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
*/
function getMousePosition(event) {
	let rect = canvas.getBoundingClientRect();
        clickX = event.clientX - rect.left;
        clickY = event.clientY - rect.top;	
}

function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
