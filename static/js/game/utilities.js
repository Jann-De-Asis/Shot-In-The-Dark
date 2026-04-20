/*
Contain miscellanous functions that can be used universally throughout
the program.

NOTE: functions with events as parametres can only be used through eventlisteners.
*/
import { Button } from "./classes/interface.js";

import ctx, { canvas, originalDimension } from "./start/main.js";

export { 
	fetchClickPosition, fetchPlayerToClickAngle, 
	fetchCursorPosition, fetchPlayerToCursorAngle,
	fetchTextMetrics, toggleFullscreen, exitFullscreen,
	scalingCanvas
};


// USER DATA


function fetchClickPosition(event, log=false) {
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


function fetchPlayerToClickAngle(event, user, log=false) {
	/* 
	Finding the angle and velocity using inverse trigonometry and basic trigonometry.
	- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
	- Reference Link: (https://youtu.be/HXquxWtE5vA?si=n6eukRFpBSWR7r9_&t=8459)
	- Timestamp: 2:20:59 
	*/
	const rect = canvas.getBoundingClientRect();
	const clickPosition = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};		

	const angle = Math.atan2(
		clickPosition.y - (user.y + (user.height/2)*user.scale), 
		clickPosition.x - (user.x + (user.width/2)*user.scale) 
	);

	if (log !== false) {
		console.log("Player-to-click: " + angle);
	};

	return angle;
};


function fetchCursorPosition(event, log=false) {
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


function fetchPlayerToCursorAngle(event, user, log=false) {
	const rect = canvas.getBoundingClientRect();
	const cursorPosition = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};		

	// Note: atan2() has been changed to degrees!
	const angle = Math.atan2(
		cursorPosition.y - (user.y + (user.height/2)*user.scale), 
		cursorPosition.x - (user.x + (user.width/2)*user.scale) 
	) * 180 / Math.PI;

	if (log !== false) {
		console.log("Player-to-Cursor: " + angle);
	};

	return angle;
};


function fetchTextMetrics(text, size, font, log=false) {	
	/* 
	Getting the exact measurements of the box around the text.
	- Reference Link: (https://stackoverflow.com/questions/18900117/write-text-on-canvas-with-background)
	- Found in verified solution
	*/	
	ctx.font = size + "px " + font;
	
	const metrics = ctx.measureText(text);
		
	if (log !== false) {
		console.log(metrics);
	};

	return {
		fullWidth: metrics.width,
		fullHeight: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
		textWidth: metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
		textHeight: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
	};
};


// USER INTERFACE

let fullscreen = false;


function scalingCanvas() {
	if (fullscreen) {
		canvas.width = canvas.getBoundingClientRect().width, 
		canvas.height = canvas.getBoundingClientRect().height
	
		Button.ratio.x = canvas.width / originalDimension.width;
		Button.ratio.y = canvas.height / originalDimension.height;
	} else {
		canvas.width = originalDimension.width;
		canvas.height = originalDimension.height;
		
		Button.ratio.x = canvas.width / originalDimension.width;
		Button.ratio.y = canvas.height / originalDimension.height;
	};
};


// Handles other cases of exiting fullscreen, such as the 'esc' button.
function exitFullscreen() {
	if (document.fullscreenElement === null) {
		canvas.width = originalDimension.width;
		canvas.height = originalDimension.height;
		
		Button.ratio.x = originalDimension.positionRatio.x;
		Button.ratio.y = originalDimension.positionRatio.y;
		fullscreen = false;
	};
};


function toggleFullscreen() {
	fullscreen = !fullscreen;

	if (fullscreen) {
		canvas.requestFullscreen();		
	} else {
		document.exitFullscreen();
	};	
};


// MATH


function createRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
