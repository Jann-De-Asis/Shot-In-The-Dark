// (This the first screen ran when the website is open. 
// This is where play, settings, how-to-play is kept.)
import ctx, { canvas, playButton } from "./main.js";

import { fetchingClickPosition } from "./../utilities.js";

import compilingGame from "./../engine/initialise.js";

export { animatingMenu as default, clicking };

// Framerate 
const fpsInterval = 1000 / 30;
let then = Date.now();


function animatingMenu() {
	window.requestAnimationFrame(animatingMenu);

	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	};
	then = now - (elapsed % fpsInterval);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	playButton.drawing(ctx)
};


function clicking(event) {
	console.log(playButton.checkingClick(fetchingClickPosition(event, true))) /*{
		// compilingGame();		
	};*/
};
