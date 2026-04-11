import { Player } from  "./classes/entities.js";
import { Firearm } from  "./classes/items.js";
import { Bar, Button } from "./classes/user_interface.js";

// (This will also change based on what is selected.)
import { layers } from "./map_values.js";

export { * };

// (This will be removed when a start-up menu is incorperated.)
document.addEventListener("DOMContentLoaded", init, false);


function init() {
	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext("2d");
	
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

	let user = new Player({
			asset: playerSprite,
			sprite: {
				frame: 0,
				image: playerSprite.idleRight.image
			},

			width: 13,
			height: 16,
		

			position: {
				x: villageMap.startingPosition.x,
				y: villageMap.startingPosition.y
			},	
			velocity: {
				x: 5,
				y: 5
			},

			ammunition: 3,
			
			equip: new Firearm({
				type: "glock19",
				magazineType: "9mm",
				maxCapacity: 15,
				capacity: 15
			})
	});

	let fullscreenButton = new Button({
					x: {
						canvasWidth: canvas.width,
						difference: 20
					}, 
					y: {
						canvasHeight: 0,
						difference: 10
					},  
					width: 10, 
					height: 10, 
					colour: "gray",
	});

	let ammunitionBar = new Bar({
				x: {
					canvasWidth: 0,
					difference: 140
				}, 
				y: {
					canvasHeight: canvas.height,
					difference: 20
				},  
				width: 0,
				height: 15,
				colour: "yellow",

	});

	
	drawingTileset(villageMap);
	
	assetLoading(initiating(canvas, ctx, user, fullscreenButton, ammunitionBar));
	
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
			{ "var": villageMap['image'], "url": "/static/game_images/environment_tileset.png" },
			{ "var": playerSprite['idleUp']['image'], "url": "/static/game_images/player_sprites/idle_up.png" },
			{ "var": playerSprite['idleLeft']['image'], "url": "/static/game_images/player_sprites/idle_left.png" },
			{ "var": playerSprite['idleDown']['image'], "url": "/static/game_images/player_sprites/idle_down.png" },
			{ "var": playerSprite['idleRight']['image'], "url": "/static/game_images/player_sprites/idle_right.png" },
			{ "var": playerSprite['moveUp']['image'], "url": "/static/game_images/player_sprites/move_up.png" },
			{ "var": playerSprite['moveLeft']['image'], "url": "/static/game_images/player_sprites/move_left.png" },
			{ "var": playerSprite['moveDown']['image'], "url": "/static/game_images/player_sprites/move_down.png" },
			{ "var": playerSprite['moveRight']['image'], "url": "/static/game_images/player_sprites/move_right.png" }
		], initiating);
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

	initiating(canvas, ctx, user, fullscreenButton, ammunitionBar);
};



