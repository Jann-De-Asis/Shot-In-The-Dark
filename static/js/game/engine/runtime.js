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

window.addEventListener("keydown", activatingKey, false);

function activatingKey(event) {
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

window.addEventListener("keyup", deactivatingKey, false);

function deactivatingKey(event) {
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
