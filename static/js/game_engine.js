/* 
JavaScript's ES6 Modules for import and export was learned here:
Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
Timestamp: 2:36 
*/
import {Projectile} from "./classes/projectiles.js";
import {Button} from "./classes/userInterface.js";
import {Entity} from  "./classes/entities.js";


document.addEventListener("DOMContentLoaded", init, false);

let canvas;
let ctx;


function init() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	window.addEventListener("keydown", activate, false);
	window.addEventListener("keyup", deactivate, false);

	canvas.addEventListener("mousedown", onClick, false);
	canvas.addEventListener("mousemove", getMousePosition, false);

	document.addEventListener("fullscreenchange", exitFullscreen, false);

	// (Make a some sort of place to run all the 
	// class objects rather than stuffing it all here.)

	inGameButtons.push(
		new Button({
			type : "fullscreenButton",
			x : {
				canvasWidth : canvas.width,
				difference : 20
			}, 
			y : {
				canvasHeight : 0,
				difference : 10
			},  
			width : 10, 
			height : 10, 
			colour : "gray",
		})
	);

	entities.push (
		new Entity({
			type : "player",
			x : canvas.width / 2,
			y : canvas.height / 2,
			width : 15,
			height : 25,
			colour : "red",
			velocity : {
				x : 5,
				y : 5
			}
		})
	);
		
	draw();
};


// Framerate 
const fpsInterval = 1000 / 30;
let then = Date.now();

let onScreenProjectiles = []; 
let inGameButtons = [];
let entities = [];

let playerX;
let playerY;

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
	// in size for fullscreen mode.
	if (scale) {
		scalingCanvas(window.innerWidth, window.innerHeight);
	} else {
		scalingCanvas(600, 400);
	};

	
	// Looping backwards to account for projectiles being 
	// removed and avoiding an 'out-of-range' error. 
	for (let i = (entities.length - 1); i >= 0; i--) {
		let entity = entities[i];

		entity.draw(ctx);
		
		if (entity.type === "player") {
			playerX = entity.x
			playerY = entity.y
		};

	};

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
			button.width, 
			button.height
		);
	};

	// Reference Dot
	ctx.fillStyle = "orange";
	ctx.fillRect(200, 200, 10, 10);

};


function activate(event) {
	let key = event.key.toLowerCase();
		
	for (let entity of entities) {
		if (entity.type === "player") {
			if (key === "shift") {	
				entity.velocity.x = entity.velocity.x * entity.sprintIncrease;
				entity.velocity.y = entity.velocity.y * entity.sprintIncrease;
			};
		
			if (key === "w") {
				entity.moveUp = true;
			} else if (key === "a") {
				entity.moveLeft = true;
			} else if (key === "s") {
				entity.moveDown = true;
			} else if (key === "d") {
				entity.moveRight = true;
			};	
		};
	};
};


function deactivate(event) {
	let key = event.key.toLowerCase();	
	
	for (let entity of entities) {
		if (entity.type === "player") {
			if (key === "shift") {
				entity.velocity.x = entity.velocity.x / entity.sprintIncrease;
				entity.velocity.y = entity.velocity.y / entity.sprintIncrease;
			};

			if (key === "w") {
				entity.moveUp = false;
			} else if (key === "a") {
				entity.moveLeft = false;
			} else if (key === "s") {
				entity.moveDown = false;
			} else if (key === "d") {
				entity.moveRight = false;
			};
		};
	};
};


let clickPos;


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
			clickPos.y - playerY, 
			clickPos.x - playerX
			);
		
		const velocity = {
			x : Math.cos(angle) * 50,
			y : Math.sin(angle) * 50
		};

		onScreenProjectiles.push(
			new Projectile({
				type : "playersProjectile",
				x : playerX, 
				y : playerY,
				width : 10,
				height : 10,
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


function exitFullscreen() {
	if (document.fullscreenElement === null) {
		scale = false;
	};
};


let mousePos;


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

// MISCELLANEOUS

/*
Scaling the canvas based on new sizes while adapting for high-DPI displays.
Reference Link (https://www.xjavascript.com/blog/how-do-i-fix-blurry-text-in-my-html5-canvas/)
Section 2.2 in Table of Contents
*/

let ratio = window.devicePixelRatio;
let scale = false;

function scalingCanvas(width, height) {

	canvas.width = width * ratio;
	canvas.height = height * ratio;
	canvas.getContext("2d").scale(ratio, ratio);

	return canvas;
};	


function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
