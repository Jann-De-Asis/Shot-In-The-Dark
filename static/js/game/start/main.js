// The beginning point of the game's functionalities.
import { Button } from "./../classes/interface.js";
import { fetchingTextWidth } from "./../utilities.js";

import animatingMenu, { clicking } from "./menu.js";

import { renderingFont, pixelFont } from "./../assets/render.js";  

export { context as default, canvas, playButton };


document.addEventListener("DOMContentLoaded", init, false);

let context, canvas, playButton;


function init() {			
	
	function declaring() {
		playButton = new Button({
			x: canvas.width / 2,
			y: canvas.height / 2,
			offset: {
				x: fetchingTextWidth("Play", 40, "pixel") / 2,
				y: 0
			},
			
			width: fetchingTextWidth("Play", 40, "pixel"),
			height: 40,

			colour: "black",

			text: "Play",
			font: "pixel",
			textColour: "white"
		});
	};
	
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
	
	canvas.addEventListener("mousedown", clicking, false);
	// canvas.addEventListener("mousemove", fetchingCursorPosition, false);
	
	renderingFont(pixelFont);

	setTimeout(declaring, 10);

	console.info("Menu successfully compiled");	
	
	animatingMenu();
};	
