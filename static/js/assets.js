import { layers } from "./map_values.js"

export { assetLoading, drawingTileset, drawingPlayerSprite };

const environmentTileset = new Image();
const playerSprite = new Image();

function assetLoading(animate) {

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

	renderingAsset([
		{ "var": environmentTileset, "url": "/static/game_images/environment_tileset.png" },
		{ "var": playerSprite, "url": "/static/game_images/player_sprite.png" }
	], animate);
};


function drawingPlayerSprite(ctx, player) {
	ctx.drawImage(playerSprite,
		(player.framePosition.x*player.size.width)+player.frameOffset.x,  (player.framePosition.y*player.size.height)+player.frameOffset.y, player.size.width, player.size.height,
		player.position.x, player.position.y, player.size.width * player.spriteScale, player.size.height * player.spriteScale);	
	/*
	Displays and delays the sprite animation cycle.
	Reference Link: (https://stackoverflow.com/questions/69059989/how-do-i-slowdown-my-sprite-animation-in-javascript-canvas)
	- Found in the verified solution.  
	*/
	if (player.animationDelay > 0) {
		player.animationDelay--;
	} else {
		player.forwardCycle ? 
		(player.framePosition.x = (player.framePosition.x+1) % 6) : (player.framePosition.x = ((player.framePosition.x+6)-1) % 6);
		player.animationDelay = 1.25;
	};
};


function drawingTileset(ctx) {
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
					ctx.drawImage(environmentTileset,
						tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
						(col*tileSize) * tileScale, (row*tileSize) * tileScale, tileSize * tileScale, tileSize * tileScale);
				};
			};
		};
	};
};
