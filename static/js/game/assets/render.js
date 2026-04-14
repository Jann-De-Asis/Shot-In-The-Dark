// import { canvas } from "./../start/main.js";

export { renderingAssets, drawingMap, playerSprites, /*villageSprite*/ };


function renderingAssets(assets /*, callback*/) {	
	let numAssets = assets.length;
	const loaded = function () {
		numAssets = numAssets - 1;
		if (numAssets === 0) {
			// callback();
		};
	};

	for (const asset of assets) {
		const element = asset.container;
		if (element instanceof HTMLImageElement) {
			element.addEventListener("load", loaded, false);
		} else if (element instanceof HTMLAudioElement) {
			element.addEventListener("canplaythrough", loaded, false);
		};
		element.src = asset.url;
	};
};


function drawingMap(image, layers) {
	const tilesPerRow = 24;
	const tileSize = 16;
	const tileScale = 2;

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


const playerSprites = {
	// Entity's attributes must be updated every direction
	// to account for the difference in the sprite sheet.	
	idleUp: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/idle_up.png", 
		width: 13,
		height: 16
	},
	idleLeft: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/idle_left.png", 
		width: 12,
		height: 16
	},
	idleDown: { 	
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/idle_down.png", 
		width: 13,
		height: 16
	},
	idleRight: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/idle_right.png", 
		width: 12,
		height: 16
	},
	moveUp: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/move_up.png",
		width: 13,
		height: 17
	},
	moveLeft: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/move_left.png", 
		width: 14,
		height: 17
	},
	moveDown: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/move_down.png", 
		width: 13,
		height: 17
	},
	moveRight: {
		image: new Image(),
		url: "/static/assets/game/images/player_sprites/move_right.png",
		width: 14,
		height: 17
	}
};

/*
const villageSprite = {
	image: new Image(),
	url: "/static/assets/game/images/village_tileset.png", 
	startingPosition: {
		x: canvas.width / 2,
		y: canvas.height / 2
	}
};
*/
