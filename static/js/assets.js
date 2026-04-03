import { layers } from "./map_values.js"

export { assetLoading, drawingTileset };

const environmentTileset = new Image();


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
		{ "var": environmentTileset, "url": "/static/images/game/environment_tileset.png" },
	], animate);
};

console.log(layers)

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
						ctx.imageSmoothingEnabled = false;
						ctx.drawImage(environmentTileset,
							tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
							(col*tileSize) * tileScale, (row*tileSize) * tileScale, tileSize * tileScale, tileSize * tileScale);
					};

			};

		};
	};
};
