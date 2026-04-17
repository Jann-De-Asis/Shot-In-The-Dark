// (This the first screen ran when the website is open. 
// This is where play, settings, how-to-play is kept.)
import ctx, { canvas, playButton, playMetrics } from "./main.js";

import { fetchingClickPosition, fetchingCursorPosition, 
	 fetchingTextMeasurements } from "./../utilities.js";

import compilingGame from "./../engine/initialise.js";

export { animatingMenu as default, clicking, hovering };

// Framerate 
const fpsInterval = 1000 / 30;
let then = Date.now();

let animation;

function animatingMenu() {
	animation = window.requestAnimationFrame(animatingMenu);

	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	};
	then = now - (elapsed % fpsInterval);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	playButton.drawingWithText(ctx, {
		text: "Play", 
		font: "pixel", 
		size: 60, 
		offset: {
			x: 0,
			y: (playMetrics.fullHeight-playMetrics.textHeight) / 2
		}, 
		colour: "white"
	});	
};


function clicking(event) {
	if (playButton.checkingInside(fetchingClickPosition(event))) {
		stop();
		// compilingGame();		
	};
};


function hovering(event) {
	if (playButton.checkingInside(fetchingCursorPosition(event))) {
		playButton.colour = "gray";
	} else {
		playButton.colour = "black";
	};
};


function stop() {
	canvas.removeEventListener("mousedown", clicking);
	canvas.removeEventListener("mousemove", hovering);

	window.cancelAnimationFrame(animation);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};
