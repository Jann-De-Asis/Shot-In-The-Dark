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


function drawingTileset(ctx) {
	const tilesPerRow = 24;
	const tileSize = 16;
	const tileScale = 2;

	const mapWidth = 64;
	const mapHeight = 64;

	const tilesetSize = 16;

	// Background values were created using an application called: "Tiled"
	// and reformated using a basic python script.
	// Reference Link: (https://www.mapeditor.org/)

	// Go to 'Tiled' and find a way to give you the full entire list rather them in chunks.
	const layers = {
		ground_layer: {
			chunk1: [
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
				 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
				 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[-1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
			],

			chunk2: [
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29],
				[29, 1073741829, 1073741829, 1073741829, 1073741829, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
				[29, 1073741829, 1073741829, 1073741829, 1073741829, 1073741859, 220, 221, 220, 221, 220, 221, 220, 221, 220, 221],
				[29, 1073741829, 1073741829, 1073741829, 1073741829, 1073741859, 220, 221, 220, 221, 220, 221, 220, 221, 220, 221]
			]
		},
	};

	fu

	let x_counter = 0
	let y_counter = 0

	for (const layer in layers) {
		for (const chunk in layers[layer]) {

			for (let y = 0; y < mapHeight; y += 16) {
				for (let x = 0; x < mapWidth; x += 16) {

					for (let row = 0; row < tilesetSize; row += 1) {
						for (let col = 0; col < tilesetSize; col += 1) {

							const tile = layers[layer][chunk][row][col];
								if (tile >= 0) {
									const tileRow = Math.floor(tile / tilesPerRow)
									const tileCol = Math.floor(tile % tilesPerRow);
									ctx.imageSmoothingEnabled = false;
									ctx.drawImage(environmentTileset,
										tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
										((col+x)*tileSize) * tileScale, ((row+y)*tileSize) * tileScale, tileSize * tileScale, tileSize * tileScale);
							};

						};
					};

				};
			};

		};
	};
};
