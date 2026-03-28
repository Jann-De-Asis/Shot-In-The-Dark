/* 
JavaScript's ES6 Modules for import and export was learned here:
Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
- Timestamp: 2:36 
*/
import {Projectile} from "./classes/projectiles.js";
import {Bar, Button} from "./classes/userInterface.js";
import {Entity} from  "./classes/entities.js";
import {Firearm} from  "./classes/items.js";


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
	
	entities.push(
		player = new Entity({
			x : canvas.width / 2,
			y : canvas.height / 2,
			width : 15,
			height : 25,
			colour : "red",
			velocity : {
				x : 5,
				y : 5
			},
			ammunition : 3,
			equip : new Firearm({
				type : "glock19",
				magazineType : "9mm",
				maxCapacity : 15,
				capacity : 15
			})
		})

	);

	buttons.push(
		fullscreenButton = new Button({
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

	bars.push (
		ammunitionBar = new Bar({
			x : {
				canvasWidth : 0,
				difference : 10
			}, 
			y : {
				canvasHeight : canvas.height,
				difference : 20
			},  
			width : 0,
			height : 15,
			colour : "yellow",

		})
	);
		
	animate();
};


// Framerate 
const fpsInterval = 1000 / 30;
let then = Date.now();


// Change the lists into dictionaries and have the objects in that list. 
// Pre-define that list since nothing new is ever going to change.
let bars = []; 
let buttons = [];
let entities = [];

let projectiles = {
	playerProjectiles : [],
	enemyProjectiles : []
};

// All unique objects.
let player; 

let fullscreenButton;
let ammunitionBar;

function animate() {
	window.requestAnimationFrame(animate);
	
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
		entities[i].draw(ctx);
	};

	for (let projectileType in projectiles) {
		for (let i = (projectiles[projectileType].length - 1); i >= 0; i--) {
			projectiles[projectileType][i].project(ctx);
		};
	};
	
	for (let button of buttons) {
		button.draw(ctx, canvas.width, canvas.height)
	};
	
	if (player.equip === null) {
		ammunitionBar.width = 0;
	} else {
		// Multiplies the bar to make it more visible.
		ammunitionBar.width = player.equip.capacity * 8;
	};

	for (let bar of bars) {
		bar.draw(ctx, canvas.width, canvas.height);
	};

	// Text
	ctx.font = "30px  Andale Mono";
	ctx.fillStyle = "black";
	ctx.fillText("Ammo: " + player.ammunition, (canvas.width/2) - 50, 50)

	// Reference Dot
	ctx.fillStyle = "orange";
	ctx.fillRect(500, 500, 100, 100);

	console.log(ammunitionBar.width);
};


function activate(event) {
	let key = event.key.toLowerCase();
		
	if (key === "shift") {	
		player.velocity.x = player.velocity.x * player.sprintIncrease;
		player.velocity.y = player.velocity.y * player.sprintIncrease;
	};

	if (key === "w") {
		player.moveUp = true;
	} else if (key === "a") {
		player.moveLeft = true;
	} else if (key === "s") {
		player.moveDown = true;
	} else if (key === "d") {
		player.moveRight = true;
	};	
};


function deactivate(event) {
	let key = event.key.toLowerCase();	
	
	if (key === "shift") {
		player.velocity.x = player.velocity.x / player.sprintIncrease;
		player.velocity.y = player.velocity.y / player.sprintIncrease;
	};

	if (key === "w") {
		player.moveUp = false;
	} else if (key === "a") {
		player.moveLeft = false;
	} else if (key === "s") {
		player.moveDown = false;
	} else if (key === "d") {
		player.moveRight = false;
	};

	if (key === "r") {
		if (player.ammunition !== 0) {
			player.ammunition -= 1;
			player.equip.capacity = player.equip.maxCapacity;
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
		- Timestamp: 2:20:59 
		*/
		const angle = Math.atan2(
			clickPos.y - player.y, 
			clickPos.x - player.x
		);

		const velocity = {
			x : Math.cos(angle) * 50,
			y : Math.sin(angle) * 50
		};


		if (player.equip.capacity !== 0) {
			projectiles.playerProjectiles.push(
						new Projectile({
							x : player.x, 
							y : player.y,
							width : 10,
							height : 10,
							colour : "yellow",
							velocity
						})
			);

			player.equip.capacity -= 1;
		};
	};

	
	if (fullscreenButton.isInside(clickPos, fullscreenButton)) {
		// The 'toggleFullscreen' method returns 
		// either true or false for scale.
		scale = fullscreenButton.toggleFullscreen(canvas);
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

		for (let button of buttons) {
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
- Section 2.2 in Table of Contents
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
