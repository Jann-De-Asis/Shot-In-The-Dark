// The beginning point of the game's functionalities.
import { Button } from "./../classes/interface.js";

import { fetchTextMetrics, exitFullscreen, scalingCanvas } from "./../utilities.js";

import { animateMenu, interactingWithMenu, interactingWithFullscreen } from "./menu.js";

import { renderFont, renderAsset, 
	 fullscreenIcon, pixelFont } from "./../assets/render.js";  

export { context as default, canvas, originalDimension, playButton, 
	 playMetrics, fullscreenButton };


document.addEventListener("DOMContentLoaded", initalise, false);

let context, canvas, originalDimension, fullscreenButton, playButton, playMetrics;


function initalise() {			
	
	function declareMenu() {	
		playMetrics = fetchTextMetrics("Play", 60, "pixel");

		playButton = new Button({
			x: canvas.width / 2,
			y: canvas.height / 2,
			offset: {
				x: playMetrics.textWidth / 2,
				y: playMetrics.textHeight / 2
			},
			
			width: playMetrics.textWidth,
			height: playMetrics.textHeight,

			backgroundColour: "128, 128, 128",	
		});
		
		fullscreenButton = new Button({
				x: canvas.width,
				y: 0,
				offset: {
					x: canvas.width / 16,
					y: -canvas.height / 32
				},

				width: 25, 
				height: 25,

				image: fullscreenIcon.image,
				backgroundColour: "128, 128, 128"
		});
		
		document.addEventListener("fullscreenchange", exitFullscreen, false);
		window.addEventListener("resize", scalingCanvas, false);
		
		canvas.addEventListener("mousemove", interactingWithMenu, false);
		canvas.addEventListener("mousedown", interactingWithMenu, false);
		
		canvas.addEventListener("mousemove", interactingWithFullscreen, false);
		canvas.addEventListener("mousedown", interactingWithFullscreen, false);
		
		console.info("Menu successfully compiled");	
	};
	
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");

	originalDimension = {
		width: canvas.width,
		height: canvas.height
	};
	
	renderFont(declareMenu, pixelFont);

	renderAsset([{ "var": fullscreenIcon.image, "url": fullscreenIcon.url }], animateMenu);	
}; 
