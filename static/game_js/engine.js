/* 
JavaScript's ES6 Modules for import and export was learned here:
Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
- Timestamp: 2:36 
*/
import { Projectile } from "./classes/projectiles.js";
import { canvas, ctx } from "./ignition.js";


// Change the lists into dictionaries and have the objects in that list. 
// Pre-define that list since nothing new is ever going to change.
let buttons = [];
let entities = [];

let projectiles = {
	userProjectiles: [],
	enemyProjectiles: []
};

// Framerate 
const fpsInterval = 1000 / 30;
let then = Date.now();


function animating() {
	window.requestAnimationFrame(animating);

	// Manages the frames per second (fps) 
	// through the denominator of 'fpsInterval'.
	// (Make this into a function when it's working.)
	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	};
	then = now - (elapsed % fpsInterval);

	// Clearing the canvas every frame to give
	// the illusion of animation.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Constantly updating the scale to account for changes
	// in size for fullscreen mode.	
	if (scale) {
		scalingCanvas(canvas, window.innerWidth, window.innerHeight);
	} else {
		scalingCanvas(canvas, 600, 400);
	};

	ctx.imageSmoothingEnabled = false;
	
	animatingSprite(user);

	user.movement();
	user.animation(cursorAngle(cursorPos, user));
	

	buttons.push(fullscreenButton);

	bars.push(ammunitionBar);

	// Looping backwards to account for projectiles being 
	// removed and avoiding an 'out-of-range' error. 
	for (let projectileType in projectiles) {
		for (let i = (projectiles[projectileType].length - 1); i >= 0; i--) {
			projectiles[projectileType][i].project(ctx);
		};
	};
	
	for (let button of buttons) {
		button.draw(ctx, canvas.width, canvas.height)
	};
	
	if (user.equip === null) {
		ammunitionBar.width = 0;
	} else {
		// Multiplies the bar to make it more visible.
		ammunitionBar.width = user.equip.capacity * 8;
	};

	for (let bar of bars) {
		bar.draw(ctx, canvas.width, canvas.height);
	};

	// Text
	ctx.font = "30px  Andale Mono";
	ctx.fillStyle = "black";
	ctx.fillText("Ammo: " + user.ammunition, 10, canvas.height - 10)
		
};

// IMAGES

function animatingSprite(entity) {
	ctx.drawImage(entity.sprite.image,
		entity.sprite.frame * entity.width, entity.height, entity.height, entity.width,
		entity.position.x, entity.position.y, entity.width * entity.asset.scale, entity.height * entity.asset.scale);	
	/*
	Displays and delays the sprite animation cycle.
	Reference Link: (https://stackoverflow.com/questions/69059989/how-do-i-slowdown-my-sprite-animation-in-javascript-canvas)
	- Found in the verified solution.  
	*/
	if (entity.animationDelay > 0) {
		entity.animationDelay--;
	} else {
		entity.forwardCycle ? 
		(entity.frame = (entity.frame+1) % 6) : (entity.frame = ((entity.frame+6)-1) % 6);
		entity.animationDelay = 1.25;
	};
};

// EVENTS

window.addEventListener("keydown", activateKey, false);

function activateKey(event) {
	let key = event.key//.toLowerCase;

	if (key === "shift") {	
		user.velocity.x = user.velocity.x * user.sprintIncrease;
		user.velocity.y = user.velocity.y * user.sprintIncrease;
	};

	if (key === "w") {	
		user.moveUp = true;

	} else if (key === "a") {
		user.moveLeft = true;
	
	} else if (key === "s") {
		user.moveDown = true;

	} else if (key === "d") {
		user.moveRight = true;
	
	};
};

window.addEventListener("keyup", deactivateKey, false);

function deactivateKey(event) {
	let key = event.key//.toLowerCase();	
	
	if (key === "shift") {
		user.velocity.x = user.velocity.x / user.sprintIncrease;
		user.velocity.y = user.velocity.y / user.sprintIncrease;
	};
	
	if (key === "w") {	
		user.moveUp = false;
	
	} else if (key === "a") {
		user.moveLeft = false;
	
	} else if (key === "s") {
		user.moveDown = false;

	} else if (key === "d") {
		user.moveRight = false;
	};
	
	if (key === "r") {
		if (user.ammunition !== 0) {
			user.ammunition--;
			user.equip.capacity = user.equip.maxCapacity;
		};
	};
};

let clickPos;

canvas.addEventListener("mousedown", onClick, false);

function onClick(event) {
	/*
	Calculating The User's Click Position Relative To The Canvas
	Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
	*/
	let rect = 0 //canvas.getBoundingClientRect();
	clickPos = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};

	// Left-mouse button
	if (event.button === 0) {
		
		/* 
		Finding the angle and velocity using inverse trigonometry and basic trigonometry.
		Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
		Reference Link: (https://youtu.be/HXquxWtE5vA?si=n6eukRFpBSWR7r9_&t=8459)
		- Timestamp: 2:20:59 
		*/
		const angle = Math.atan2(
			clickPos.y - (user.position.y + ((user.height/2)*user.sprite.scale) - 5), 
			clickPos.x - (user.position.x + ((user.width/2)*user.sprite.scale) - 5) 
		);

		const velocity = {
			x: Math.cos(angle) * 50,
			y: Math.sin(angle) * 50
		};


		if (user.equip.capacity !== 0) {
			projectiles.userProjectiles.push(
						new Projectile({
							x: (user.position.x + ((user.width/2)*user.sprite.scale) - 5), 
							y: (user.position.y + ((user.height/2)*user.sprite.scale) - 5), 
							width: 10,
							height: 10,
							colour: "yellow",
							velocity
						})
			);

			user.equip.capacity -= 1;
		};
	};

	/*	
	if (fullscreenButton.isInside(clickPos, fullscreenButton)) {
		// The 'toggleFullscreen' method returns 
		// either true or false for scale.
		scale = fullscreenButton.toggleFullscreen(canvas);
	};
	*/
};

let cursorPos;

canvas.addEventListener("mousemove", cursorMovement, false);

function cursorMovement(event) {
		let rect = 0//canvas.getBoundingClientRect();
		/*
		cursorPos = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
		*/
		for (let button of buttons) {
			if (button.isInside(cursorPos, button)) {
				button.colour = "brown";
			} else {
				button.colour = "gray";
			};
		};
};

document.addEventListener("fullscreenchange", exitFullscreen, false);

function exitFullscreen() {
	if (document.fullscreenElement === null) {
		scale = false;
	};
};

// MISCELLANEOUS

// Make a separate JavaScript file for miscellaneous functions.

let scale = false;

function scalingCanvas(width, height) {
	canvas.width = width;
	canvas.height = height;
	
	return canvas;
};	

function cursorAngle(cursorPos) {
	/*
	'cursorPos' is set to 'undefined' until the mouse moves. Therefore,
	the default case will be set to be facing down (i.e. 90 degrees) using 
	a ternary operator.
	Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) 
	*/
	return cursorPos === undefined ? 90 : Math.atan2(
			cursorPos.y - (user.position.y + (user.height/2)*user.sprite.scale), 
			cursorPos.x - (user.position.x + (user.width/2)*user.sprite.scale) 
			) * 180 / Math.PI;
	// (Note: atan2() has been changed to degrees!)
};

/*
function toggleDarkMode() {
	isDarkMode = !isDarkMode // Toggle
};
*/

function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
