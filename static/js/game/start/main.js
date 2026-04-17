// The beginning point of the game's functionalities.
import { Button } from "./../classes/interface.js";

import { fetchingTextMeasurements } from "./../utilities.js";

import animatingMenu, { clicking, hovering } from "./menu.js";

import { renderingFont, pixelFont } from "./../assets/render.js";  

export { context as default, canvas, playButton, playMetrics };


document.addEventListener("DOMContentLoaded", init, false);

let context, canvas, playButton, playMetrics;


function init() {			
	
	function declaring() {	
		playMetrics = fetchingTextMeasurements("Play", 60, "pixel");

		playButton = new Button({
			x: canvas.width / 2,
			y: canvas.height / 2,
			offset: {
				x: playMetrics.textWidth / 2,
				y: playMetrics.textHeight / 2
			},
			
			width: playMetrics.textWidth,
			height: playMetrics.textHeight,

			colour: "black",
		});
		
		canvas.addEventListener("mousedown", clicking, false);
		canvas.addEventListener("mousemove", hovering, false);
		
		console.info("Menu successfully compiled");	
	};
	
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
		
	renderingFont(declaring, pixelFont);
	
	animatingMenu();
}; 
