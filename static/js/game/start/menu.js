// (This the first screen ran when the website is open. 
// This is where play, settings, how-to-play is kept.)
import ctx, { canvas, playButton, playMetrics, 
	      fullscreenButton } from "./main.js";

import { fetchingClickPosition, fetchingCursorPosition, 
	 fetchingTextMeasurements } from "./../utilities.js";

import { fullscreenIcon } from "./../assets/render.js";

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
		colour: "255, 255, 255"
	});	

	fullscreenButton.drawing(ctx, 
		fullscreenIcon.x, fullscreenIcon.y, fullscreenIcon.width, fullscreenIcon.height
	);
};


function clicking(event) {
	if (playButton.checkingInside(fetchingClickPosition(event))) {
		stop();
		// compilingGame();		
	};
};


function hovering(event) {
	if (playButton.checkingInside(fetchingCursorPosition(event))) {
		playButton.backgroundOpacity = 1;
	} else {
		playButton.backgroundOpacity = 0;
	};
	
	if (fullscreenButton.checkingInside(fetchingCursorPosition(event))) {
		fullscreenButton.backgroundOpacity = 1;
	} else {
		fullscreenButton.backgroundOpacity = 0;
	};
};


function stop() {
	canvas.removeEventListener("mousedown", clicking);
	canvas.removeEventListener("mousemove", hovering);

	window.cancelAnimationFrame(animation);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};
