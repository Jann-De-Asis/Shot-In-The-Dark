export {assetLoading, drawingTileset};


const environmentTileset = new Image();


function assetLoading(animate) { 
	
	function renderingAsset(assets, callback) {
		let num_assets = assets.length;
		const loaded = function() {
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
		{"var": environmentTileset, "url": "/static/images/game/environment_tileset.png"},
	], animate);
};	


function drawingTileset(ctx) {
	const tilesPerRow = 24;
	const tileSize = 16;
	const tileScale = 2;

	// Background values were created using an application called: "Tiled"
	// and reformated using a basic python script.
	// Reference Link: (https://www.mapeditor.org/)
	const layers = {
		ground_layer : [
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		],

		structure_layer : [
			[-1, -1, -1, -1, 474, 475, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, 498, 499, -1, -1, 474, 475, -1, -1, -1, -1, -1, -1],
			[-1, -1, 474, 475, 522, 523, 474, 475, 498, 499, -1, -1, -1, -1, -1, -1],
			[-1, -1, 498, 499, 546, 547, 498, 499, 522, 523, -1, -1, -1, -1, -1, -1],
			[-1, -1, 522, 523, -1, -1, 522, 523, 546, 547, -1, -1, -1, -1, -1, -1],
			[-1, -1, 546, 547, -1, -1, 546, 547, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		]
	};
	
	for (let row = 0; row < layers.ground_layer.length; row += 1) {
		for (let col = 0; col < layers.ground_layer[0].length; col += 1) {
			for (const layer in layers) {
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
