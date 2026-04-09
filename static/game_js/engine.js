/* 
JavaScript's ES6 Modules for import and export was learned here:
Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
- Timestamp: 2:36 
*/
import { Projectile } from "./classes/projectiles.js";

import { assetLoading, user, villageMap, 
	 fullscreenButton, ammunitionBar
       } from "./initialise.js";

import { layers } from "./map_values.js";


let canvas;
let ctx;

document.addEventListener("DOMContentLoaded", init, false);


function init() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	
	window.addEventListener("keydown", activate, false);
	window.addEventListener("keyup", deactivate, false);

	canvas.addEventListener("mousedown", onClick, false);
	canvas.addEventListener("mousemove", cursorPosition, false);

	document.addEventListener("fullscreenchange", exitFullscreen, false);
	
	entities.push(user);

	buttons.push(fullscreenBar);

	bars.push (ammunitionBar);

	drawingTileset(ctx);
	
	assetLoading(animate);
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
	playerProjectiles: [],
	enemyProjectiles: []
};


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
	// the illusion of animation.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Constantly updating the scale to account for changes
	// in size for fullscreen mode.	
	if (scale) {
		scalingCanvas(window.innerWidth, window.innerHeight);
	} else {
		scalingCanvas(600, 400);
	};

	ctx.imageSmoothingEnabled = false;
	
	drawingSprite(user);

	user.movement();
	user.animation(cursorAngle(cursorPos));
	
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
	ctx.fillText("Ammo: " + player.ammunition, 10, canvas.height - 10)
};

// IMAGES

function drawingSprite(entity) {
	ctx.drawImage(entity.sprite.image,
		(player.framePosition.x*player.size.width)+player.frameOffset.x,  (player.framePosition.y*player.size.height)+player.frameOffset.y, entity.width,
		entity.position.x, entity.position.y, entity.width * entity.sprite.spriteScale, entity.height *  entity.sprite.spriteScale);	
	/*
	Displays and delays the sprite animation cycle.
	Reference Link: (https://stackoverflow.com/questions/69059989/how-do-i-slowdown-my-sprite-animation-in-javascript-canvas)
	- Found in the verified solution.  
	*/
	if (player.animationDelay > 0) {
		player.animationDelay--;
	} else {
		player.forwardCycle ? 
		(player.framePosition.x = (player.framePosition.x+1) % 6) : (player.framePosition.x = ((player.framePosition.x+6)-1) % 6);
		player.animationDelay = 1.25;
	};
};


function drawingTileset(map, layers) {
	const tilesPerRow = 24;
	const tileSize = 16;
	const tileScale = 2;

	// Background values were created using an application called: "Tiled"
	// and reformated using a basic python script.
	// Reference Link: (https://www.mapeditor.org/)
	for (const layer in layers) {
		for (let row = 0; row < layers[layer].length; row += 1) {
			for (let col = 0; col < layers[layer][row].length; col += 1) {
				const tile = layers[layer][row][col];
				if (tile >= 0) {
					const tileRow = Math.floor(tile / tilesPerRow)
					const tileCol = Math.floor(tile % tilesPerRow);
					ctx.drawImage(map,
						tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
						(col*tileSize) * tileScale, (row*tileSize) * tileScale, tileSize * tileScale, tileSize * tileScale);
				};
			};
		};
	};
};


function activate(event) {
	let key = event.key.toLowerCase();

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


function deactivate(event) {
	let key = event.key.toLowerCase();	
	
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


function onClick(event) {
	/*
	Calculating The User's Click Position Relative To The Canvas
	Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
	*/
	let rect = canvas.getBoundingClientRect();
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
			clickPos.y - (player.y + ((player.height/2)*player.spriteScale) - 5), 
			clickPos.x - (player.x + ((player.width/2)*player.spriteScale) - 5) 
		);

		const velocity = {
			x: Math.cos(angle) * 50,
			y: Math.sin(angle) * 50
		};


		if (player.equip.capacity !== 0) {
			projectiles.playerProjectiles.push(
						new Projectile({
							x: (player.x + ((player.width/2)*player.spriteScale) - 5), 
							y: (player.y + ((player.height/2)*player.spriteScale) - 5), 
							width: 10,
							height: 10,
							colour: "yellow",
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


let cursorPos;

function cursorPosition(event) {
		let rect = canvas.getBoundingClientRect();
	        cursorPos = {
			x: event.clientX - rect.left,
        		y: event.clientY - rect.top
		};
		
		for (let button of buttons) {
			if (button.isInside(cursorPos, button)) {
				button.colour = "brown";
			} else {
				button.colour = "gray";
			};
		};
};



// MISCELLANEOUS

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
			cursorPos.y - (player.y + (player.height/2)*player.spriteScale), 
			cursorPos.x - (player.x + (player.width/2)*player.spriteScale) 
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
