/*
Contain miscellanous functions that can be used universally throughout
the JavaScript file
*/
import { canvas } from "./initialise.js";

export { * };

canvas.addEventListener("mousedown", fetchingClickPosition, false);


function fetchingClickPosition(event) {
	/*
	Calculating The User's Click Position Relative To The Canvas.
	- Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
	*/
	let rect = canvas.getBoundingClientRect();
	
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
};


function fetchingPlayerToClickAngle(player, clickPosition) {
	/* 
	Finding the angle and velocity using inverse trigonometry and basic trigonometry.
	- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
	- Reference Link: (https://youtu.be/HXquxWtE5vA?si=n6eukRFpBSWR7r9_&t=8459)
	- Timestamp: 2:20:59 
	*/
	return Math.atan2(
		clickPosition.y - (player.position.y + ((player.height/2)*player.sprite.scale) - 5), 
		clickPosition.x - (player.position.x + ((player.width/2)*player.sprite.scale) - 5) 
	);
};


canvas.addEventListener("mousemove", cursorMovement, false);


function fetchingCursorPosition(event) {
		let rect = canvas.getBoundingClientRect();
		
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};		
};


function fetchingPlayerToCursorAngle(cursorPosition) {
	/*
	'cursorPos' is set to 'undefined' until the mouse moves. Therefore,
	the default case will be set to be facing down (i.e. 90 degrees) using 
	a ternary operator.
	- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) 
	*/
	return cursorPosition === undefined ? 90 : Math.atan2(
			cursorPosition.y - (user.position.y + (user.height/2)*user.sprite.scale), 
			cursorPosition.x - (user.position.x + (user.width/2)*user.sprite.scale) 
			) * 180 / Math.PI;
	// (Note: atan2() has been changed to degrees!)
};


document.addEventListener("fullscreenchange", exitFullscreen, false);

let scale = false;


function scalingCanvas(width, height) {
	canvas.width = width;
	canvas.height = height;
	
	return canvas;
};	


function exitingFullscreen() {
	if (document.fullscreenElement === null) {
		return false;
	};
};




/*
function togglingDarkness() {
	isDarkMode = !isDarkMode // Toggle
};
*/


function creatingRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
