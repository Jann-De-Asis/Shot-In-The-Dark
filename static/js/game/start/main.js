// The beginning point of the game's functionalities.
import { Button } from "./../classes/interface.js";

import { fetchingTextMeasurements } from "./../utilities.js";

import animatingMenu, { clicking, hovering } from "./menu.js";

import { renderingFont, renderingAsset, 
	 fullscreenIcon, pixelFont } from "./../assets/render.js";  

export { context as default, canvas, playButton, playMetrics,
	 fullscreenButton };


document.addEventListener("DOMContentLoaded", init, false);

let context, canvas, fullscreenButton, playButton, playMetrics;


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
		
		canvas.addEventListener("mousedown", clicking, false);
		canvas.addEventListener("mousemove", hovering, false);
		
		console.info("Menu successfully compiled");	
	};
	
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
	
	renderingFont(declaring, pixelFont);

	renderingAsset([{ "var": fullscreenIcon.image, "url": fullscreenIcon.url }], animatingMenu);	
}; 
