// (This is where the sprite values are kept.)
export { playerSprite, villageMap };


function renderingAsset(assets, callback) {
	let num_assets = assets.length;
	const loaded = function () {
		num_assets = num_assets - 1;
		if (num_assets === 0) {
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


function drawingTileset(map, layers) {
	const tilesPerRow = 24;
	const tileSize = 16;
	const tileScale = 2;

	// Background values were created using an application called: "Tiled"
	// and reformated using a basic python script.
	// Reference Link: (https://www.mapeditor.org/)
	for (const layer in layers) {
		for (let row = 0; row < layers[layer].length; row += 1) {
			for (let col = 0; col < layers[layer][row].length; col += 1) {
				const tile = layers[layer][row][col];
				if (tile >= 0) {
					const tileRow = Math.floor(tile / tilesPerRow)
					const tileCol = Math.floor(tile % tilesPerRow);
					ctx.drawImage(map,
						tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
						(col*tileSize) * tileScale, (row*tileSize) * tileScale, tileSize * tileScale, tileSize * tileScale);
				};
			};
		};
	};
};

const playerSprite = {
	scale: 3,
	// Entity's attributes must be updated every direction
	// to account for the difference in the sprite sheet.	
	idleUp: {
		image: new Image(),
		width: 13,
		height: 16
	},
	idleLeft: {
		image: new Image(),
		width: 12,
		height: 16
	},
	idleDown: { 	
		image: new Image(),
		width: 13,
		height: 16
	},
	idleRight: {
		image: new Image(),
		width: 12,
		height: 16
	},
	moveUp: {
		image: new Image(),
		width: 13,
		height: 17
	},
	moveLeft: {
		image: new Image(),
		width: 14,
		height: 17
	},
	moveDown: {
		image: new Image(),
		width: 13,
		height: 17
	},
	moveRight: {
		image: new Image(),
		width: 14,
		height: 17
	}
};

const villageMap = {
	image: new Image(),
	startingPosition: {
			x: canvas.width / 2,
			y: canvas.height / 2
		}
};

renderingAsset([
	{ "var": villageMap['image'], "url": "/static/game_images/environment_tileset.png" },
	{ "var": playerSprite['idleUp']['image'], "url": "/static/game_images/player_sprites/idle_up.png" },
	{ "var": playerSprite['idleLeft']['image'], "url": "/static/game_images/player_sprites/idle_left.png" },
	{ "var": playerSprite['idleDown']['image'], "url": "/static/game_images/player_sprites/idle_down.png" },
	{ "var": playerSprite['idleRight']['image'], "url": "/static/game_images/player_sprites/idle_right.png" },
	{ "var": playerSprite['moveUp']['image'], "url": "/static/game_images/player_sprites/move_up.png" },
	{ "var": playerSprite['moveLeft']['image'], "url": "/static/game_images/player_sprites/move_left.png" },
	{ "var": playerSprite['moveDown']['image'], "url": "/static/game_images/player_sprites/move_down.png" },
	{ "var": playerSprite['moveRight']['image'], "url": "/static/game_images/player_sprites/move_right.png" }
]);
