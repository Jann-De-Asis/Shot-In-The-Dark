/*
Contain miscellanous functions that can be used universally throughout
the program.

NOTE: functions with events as parametres can only be used through eventlisteners.
*/
import { canvas } from "./start/main.js";

export { 
	fetchingClickPosition, fetchingPlayerToClickAngle, 
	fetchingCursorPosition, fetchingPlayerToCursorAngle
};


function fetchingClickPosition(event, log=false) {
	/*
	Calculating The User's Click Position Relative To The Canvas.
	- Reference Link: (https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)
	*/
	const rect = canvas.getBoundingClientRect();
	const clickPosition = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};

	if (log !== false) {
		console.log("Click x: " + clickPosition.x);
		console.log("Click y: " + clickPosition.y);
	};

	return clickPosition;
};


function fetchingPlayerToClickAngle(player, click) {
	/* 
	Finding the angle and velocity using inverse trigonometry and basic trigonometry.
	- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
	- Reference Link: (https://youtu.be/HXquxWtE5vA?si=n6eukRFpBSWR7r9_&t=8459)
	- Timestamp: 2:20:59 
	*/
	return Math.atan2(
		click.y - (player.y + ((player.height/2)*player.scale) - 5), 
		click.x - (player.x + ((player.width/2)*player.scale) - 5) 
	);
};


function fetchingCursorPosition(event, log=false) {
	const rect = canvas.getBoundingClientRect();
	const cursorPosition = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};		

	if (log !== false) {
		console.log("Cursor x: " + cursorPosition.x);
		console.log("Cursor y: " + cursorPosition.y);
	};

	return cursorPosition;
};


function fetchingPlayerToCursorAngle(cursor) {
	/*
	'cursorPos' is set to 'undefined' until the mouse moves. Therefore,
	the default case will be set to be facing down (i.e. 90 degrees) using 
	a ternary operator.
	- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) 
	*/
	return cursor === undefined ? 90 : Math.atan2(
			cursor.y - (player.y + (player.height/2)*player.scale), 
			cursor.x - (player.x + (player.width/2)*player.scale) 
			) * 180 / Math.PI;
	// (Note: atan2() has been changed to degrees!)
};


document.addEventListener("fullscreenchange", exitingFullscreen, false);


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
