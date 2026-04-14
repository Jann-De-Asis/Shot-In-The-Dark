// The beginning point of the game's functionalities.
import { Button } from "./../classes/interface.js";

import animatingMenu, { clicking } from "./menu.js";

export { context as default, canvas, playButton };

document.addEventListener("DOMContentLoaded", init, false);

let context, canvas, playButton;


function init() {		
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
	
	canvas.addEventListener("mousedown", clicking, false);
	// canvas.addEventListener("mousemove", fetchingCursorPosition, false);
	
	playButton = new Button({
		x: canvas.width / 2,
		y: canvas.height / 2,
		offset: {
			x: 35.5, 
			y: 0
		},
		
		// Width is not defined since font size takes
		// only the height.
		height: 40,

		colour: "black",
		
		text: "Play",
		textColour: "white"
	});

	// Perhaps make a utility that gets the text width because
	// this is ridiculous...

	console.info("Main menu successfully compiled.");	
	
	animatingMenu();
};
