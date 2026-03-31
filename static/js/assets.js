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
	
	// Unfortunately, you're going to have to make a Python file that subtracts this data by 1 so it's correct...

	const background = [
		[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 2], 
		[24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 24, 25, 26], 
		[48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 48, 49, 50], 
		[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 24, 25, 26], 
		[24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 48, 49, 50], 
		[48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 24, 25, 26], 
		[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 0, 1, 0, 48, 49, 50], 
		[24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 24, 25, 24, 24, 25, 26], 
		[48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 48, 49, 48, 48, 49, 50], 
		[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 24, 24, 25, 26], 
		[24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 25, 26, 48, 48, 49, 50], 
		[48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 49, 50, 48, 49, 50, 2], 
		[0, 1, 2, 1, 0, 1, 2, 0, 1, 2, 0, 1, 48, 49, 50, 26], 
		[0, 1, 2, 1, 2, 0, 1, 24, 0, 1, 24, 25, 0, 48, 49, 50], 
		[24, 25, 26, 25, 26, 24, 25, 48, 24, 25, 48, 49, 24, 48, 49, 50], 
		[48, 49, 50, 49, 50, 48, 49, 50, 48, 49, 48, 49, 48, 48, 49, 50]
	];


	/*
	for (let row = 0; row < 20; row += 1) {
		for (let col = 0; col < 32; col += 1) {
			let tile = background[row][col];
			if (tile >= 0) {
				let tileRow = Math.floor(tile / tilesPerRow)
				let tileCol = Math.floor(tile % tilesPerRow);
				ctx.drawImage(environmentTileset,
					tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
					col * tileSize, row * tileSize, tileSize, tileSize);
			};
		};
	};
	*/
};
