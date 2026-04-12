/*
Contain miscellanous functions that can be used universally throughout
the JavaScript file
*/
import { canvas } from "./initialise.js";

export { exitFullscreen, creatingRandomInt, scalingCanvas, fetching };

let clickPos;

canvas.addEventListener("mousedown", fetchingClickPosition, false);


function fetchingClickPosition(event) {
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

		
	if (fullscreenButton.isInside(clickPos, fullscreenButton)) {
		// The 'toggleFullscreen' method returns 
		// either true or false for scale.
		scale = fullscreenButton.toggleFullscreen(canvas);
	};
};


let cursorPos;

canvas.addEventListener("mousemove", cursorMovement, false);


function fetchingCursorPosition(event) {
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


document.addEventListener("fullscreenchange", exitFullscreen, false);

let scale = false;


function scalingCanvas(width, height) {
	canvas.width = width;
	canvas.height = height;
	
	return canvas;
};	


function exitFullscreen() {
	if (document.fullscreenElement === null) {
		scale = false;
	};
};


function fetchingCursorAngle(cursorPos) {
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
function togglingDarkness() {
	isDarkMode = !isDarkMode // Toggle
};
*/


function creatingRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
