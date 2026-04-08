import { Player } from  "./classes/entities.js";
import { Firearm } from  "./classes/items.js";
import { Bar, Button } from "./classes/user_interface.js";

import { canvas } from "./engine.js";

export { assetLoading, user, villageMap, fullscreenButton, ammunitionBar};

let user = new Player({
		sprite: playerSprite,
		
		width: 13,
		height: 16,
		
		position: {
			x: 0,
			y: 0
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

const villageMap = new Image();
const playerSprite = {
	spriteScale: 3,
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
	movingUp: {
		image: new Image(),
		width: 13,
		height: 17
	},
	movingLeft: {
		image: new Image(),
		width: 14,
		height: 17
	},
	movingDown: {
		image: new Image(),
		width: 13,
		height: 17
	},
	movingRight: {
		image: new Image(),
		width: 14,
		height: 17
	}
};


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
		{ "var": playerSprite['idleUp']['image'], "url": "/static/game_images/player_sprites/idle_up.png" },
		{ "var": playerSprite['idleLeft']['image'], "url": "/static/game_images/player_sprites/idle_left.png" },
		{ "var": playerSprite['idleDown']['image'], "url": "/static/game_images/player_sprites/idle_down.png" },
		{ "var": playerSprite['idleRight']['image'], "url": "/static/game_images/player_sprites/idle_right.png" }
		/*{ "var": playerSprite['movingUp']['image'], "url": "/static/game_images/player_sprites/moving_up" },
		{ "var": playerSprite['movingLeft']['image'], "url": "/static/game_images/player_sprites/moving_left" },
		{ "var": playerSprite['movingDown']['image'], "url": "/static/game_images/player_sprites/moving_down" },
		{ "var": playerSprite['movingRight']['image'], "url": "/static/game_images/player_sprites/moving_right" }*/
	], animate);
};


