/* 
JavaScript's ES6 Modules for import and export was learned here:
Reference Link: (https://youtu.be/fl-_6d18DN0?si=QIpKUDiK_ljpY70J&t=156)
- Timestamp: 2:36 
*/
import ctx, { canvas, fullscreenButton } from "./../start/main.js";

import { interactingWithFullscreen } from "./../start/menu.js" ;

import { fullscreenIcon, villageMap, drawMap } from "./../assets/render.js";
import { layers } from "./../assets/village_data.js";

import { fetchPlayerToCursorAngle, fetchPlayerToClickAngle } from "./../utilities.js";

import { Projectile } from "./../classes/projectiles.js";


import { ammunitionBar, user } from "./initialise.js";

export { animateGame, activate, deactivate };

// Change the lists into dictionaries and have the objects in that list. 
// Pre-define that list since nothing new is ever going to change.
let projectiles = [];

// Framerate 
const fpsInterval = 1000 / 30;
let then = Date.now();

let gameAnimation, playerToCursorAngle;


function animateGame() {
	gameAnimation = window.requestAnimationFrame(animateGame);
	
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
	ctx.imageSmoothingEnabled = false;
	
	// Temporary camera solution for visibility of the map.
	ctx.save();
	ctx.translate(canvas.width / 2 - user.x, canvas.height / 2 - user.y);
	drawMap(villageMap.image, layers, 24, 16, 2);
	ctx.restore();
	
	ammunitionBar.drawWithText(ctx, {
		text: "Ammo " + user.ammunition,
		font: "pixel",
		size: "30",
		offset: {
			x: 0,
			y: 30
		},
		colour: "white"
	});

	fullscreenButton.draw(ctx, 
		fullscreenIcon.x, fullscreenIcon.y, fullscreenIcon.width, fullscreenIcon.height
	);	


	user.drawSprite(ctx);
	user.move();
	/*
	'playerToCursorAngle' is set to 'undefined' until the mouse moves. Therefore,
	the default case will be set to be facing down (i.e. 90 degrees) using 
	a ternary operator, or else the sprite will break.
	- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) 
	*/
	user.changeSprite(playerToCursorAngle === undefined ? 90 : playerToCursorAngle);

	
	// Looping backwards to account for projectiles being 
	// removed and avoiding an 'out-of-range' error. 
	for (let i = (projectiles.length - 1); i >= 0; i--) {
		projectiles[i].project(ctx);
	};
		
	if (user.equip === null) {
		ammunitionBar.width = 0;
	} else {
		ammunitionBar.width = user.equip.capacity * 8;
	};

};



function activate(event) {
	if (event.type === "keydown") {
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

	if (event.type === "mousemove") {
		playerToCursorAngle = fetchPlayerToCursorAngle(event, user);
	};
	
	// Left-mouse button
	if (event.type === "mousedown") {
		if (user.equip.capacity !== 0) {
			projectiles.push(
				new Projectile({
					x: user.x + ((user.width/2)*user.scale), 
					y: user.y + ((user.height/2)*user.scale), 
					width: 10,
					height: 10,
					colour: "yellow",
					velocity: {
						x: Math.cos(fetchPlayerToClickAngle(event, user)) * 50,
						y: Math.sin(fetchPlayerToClickAngle(event, user)) * 50
					}
				})
			);

			user.equip.capacity -= 1;
		};
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
