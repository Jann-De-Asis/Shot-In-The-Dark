// (This the first screen ran when the website is open. 
// This is where play, settings, how-to-play is kept.)

import ctx, { canvas, playButton, playMetrics, 
	      fullscreenButton } from "./main.js";

import { fetchClickPosition, fetchCursorPosition, 
	 toggleFullscreen, scalingCanvas } from "./../utilities.js";

import { fullscreenIcon } from "./../assets/render.js";

import { compileGame } from "./../engine/initialise.js";

export { animateMenu, interactingWithMenu, interactingWithFullscreen };


const fpsInterval = 1000 / 30;
let then = Date.now();

let menuAnimation; 


function animateMenu() {
	menuAnimation = window.requestAnimationFrame(animateMenu);

	let now = Date.now();
	let elapsed = now - then;
	if (elapsed <= fpsInterval) {
		return;
	};
	then = now - (elapsed % fpsInterval);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	playButton.drawWithText(ctx, {
		text: "Play", 
		font: "pixel", 
		size: 60, 
		offset: {
			x: 0,
			y: (playMetrics.fullHeight-playMetrics.textHeight) / 2
		}, 
		colour: "255, 255, 255"
		
	});	
	
	fullscreenButton.draw(ctx, 
		fullscreenIcon.x, fullscreenIcon.y, fullscreenIcon.width, fullscreenIcon.height
	);	

	console.log(canvas.width / 16);
};


function interactingWithMenu(event) {
	if (playButton.isInside(fetchClickPosition(event)) 
		&& event.type === "mousedown") {
		
		// terminateMenu();
		// compileGame();		
	};

	if (playButton.isInside(fetchCursorPosition(event, true))) {
		playButton.backgroundOpacity = 1;
	} else {
		playButton.backgroundOpacity = 0;
	};
};


function interactingWithFullscreen(event) {	
	if (fullscreenButton.isInside(fetchClickPosition(event)) 
		&& event.type === "mousedown") {
		toggleFullscreen();
	};

	if (fullscreenButton.isInside(fetchCursorPosition(event))) {
		fullscreenButton.backgroundOpacity = 1;
	} else {
		fullscreenButton.backgroundOpacity = 0;
	};
};


function terminateMenu() {
	canvas.removeEventListener("mousedown", interactingWithMenu);
	canvas.removeEventListener("mousemove", interactingWithMenu);

	window.cancelAnimationFrame(menuAnimation);
};
