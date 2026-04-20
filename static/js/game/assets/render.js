import ctx, { canvas } from "./../start/main.js";

export { renderAsset, renderFont, drawMap, 
	 playerSprites, villageMap, pixelFont,
	 fullscreenIcon };


function renderAsset(assets, callback) {	
	let numAssets = assets.length;
	const loaded = function () {
		console.info("Asset successfully rendered");
		numAssets = numAssets - 1;
		if (numAssets === 0) {
			callback();
		};
	};

	for (const asset of assets) {
		const element = asset.var;
		if (element instanceof HTMLImageElement) {
			element.addEventListener("load", loaded, false);
		} else if (element instanceof HTMLAudioElement) {
			element.addEventListener("canplaythrough", loaded, false);
		};
		element.src = asset.url;
	};
};

/* 
Rendering fonts separately since they are not elements and have no event listeners. 
As well, they are an asynchonous operation from the '.load()' method in which callbacks
must be used to execute functions at the correct time.

- Reference Link: (https://www.w3tutorials.net/blog/how-can-i-use-custom-fonts-in-an-html5-canvas-element/#core-concepts-font-loading-and-canvas-text-apis)
- Found in 'Step 1: Loading Custom Fonts Reliably', '3.2 Programmatic Loading with the FontFace API'.

- Reference Link: (https://developer.mozilla.org/en-US/docs/Web/API/FontFace)
- Found in 'Examples'

- Reference Link: (https://youtu.be/i2SPq-nb3NQ?si=2jBwJCTKqCNnzwGL&t=140)
- Timestamp: 2:20 
*/
function renderFont(callback, font) {
	font.load().then(
		function(loadedFont) {
			// Add the font to the document's font set
  			document.fonts.add(loadedFont);
			console.info("Font successfully rendered");
			callback();
		}
	);
};


function drawMap(image, layers, tilesPerRow, tileSize, tileScale) {
	/*
	Background values were created using an application called: "Tiled"
	and reformated using self-made python script.
	- Reference Link: (https://www.mapeditor.org/)
	*/
	for (const layer in layers) {
		for (let row = 0; row < (layers[layer].length); row += 1) {
			for (let col = 0; col < (layers[layer][row].length); col += 1) {
				const tile = layers[layer][row][col];
				if (tile >= 0) {
					const tileRow = Math.floor(tile / tilesPerRow)
					const tileCol = Math.floor(tile % tilesPerRow);
					ctx.drawImage(image,
						tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
						(col*tileSize) * tileScale, (row*tileSize) * tileScale, tileSize * tileScale, tileSize * tileScale);
				};
			};
		};
	};
};

const fullscreenIcon = {
	image: new Image(),
	url: "static/assets/game/images/fullscreen_icon.png",
	x: 0,
	y: 0,
	width: 488,
	height: 488
};

const pixelFont = new FontFace("pixel", "url(static/assets/game/images/arcade_pixel_font.ttf)");

const playerSprites = {
	// Entity's attributes must be updated every direction
	// to account for the difference in the sprite sheet.	
	idleUp: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/idle_up.png", 
		width: 11,
		height: 16
	},
	idleLeft: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/idle_left.png", 
		width: 12,
		height: 16
	},
	idleDown: { 	
		image: new Image(),
		url: "static/assets/game/images/player_sprites/idle_down.png", 
		width: 13,
		height: 16
	},
	idleRight: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/idle_right.png", 
		width: 12,
		height: 16
	},
	moveUp: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/move_up.png",
		width: 13,
		height: 17
	},
	moveLeft: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/move_left.png", 
		width: 14,
		height: 17
	},
	moveDown: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/move_down.png", 
		width: 13,
		height: 17
	},
	moveRight: {
		image: new Image(),
		url: "static/assets/game/images/player_sprites/move_right.png",
		width: 14,
		height: 17
	}
};

const villageMap = {
	image: new Image(),
	url: "static/assets/game/images/village_tileset.png", 
	startingPosition: {
		x: 300,
		y: 150
	}
};
