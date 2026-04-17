// The beginning point of the game's functionalities.
import { Button } from "./../classes/interface.js";

import { fetchingTextMeasurements } from "./../utilities.js";

import animatingMenu, { clicking } from "./menu.js";

import { renderingFont, pixelFont } from "./../assets/render.js";  

export { context as default, canvas, playButton };


document.addEventListener("DOMContentLoaded", init, false);

let context, canvas, playButton;


function init() {			
	
	function declaring() {	
		const metrics = fetchingTextMeasurements("Play", 60, "pixel") ;

		playButton = new Button({
			x: canvas.width / 2,
			y: canvas.height / 2,
			offset: {
				x: 0,//metrics.width / 2,
				y: 0
			},
			
			width: metrics.width,
			height: metrics.height,

			colour: "black",

			text: "Play",
			textOffset: metrics.offset, 
			textSize: 60,	
			font: "pixel",
			textColour: "white"
		});

		playButton.addingText(context, "Play", "pixel", 60, metrics.offset, "white")
	};
	
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
	
	canvas.addEventListener("mousedown", clicking, false);
	// canvas.addEventListener("mousemove", fetchingCursorPosition, false);

	renderingFont(declaring, pixelFont);

	console.info("Menu successfully compiled");	
	
	animatingMenu();
};
