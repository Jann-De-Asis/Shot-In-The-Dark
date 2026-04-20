import { Player } from  "./../classes/entities.js";
import { Firearm } from  "./../classes/items.js";
import { Bar, Button } from "./../classes/interface.js";

import ctx, { canvas } from "./../start/main.js";

import { animateGame, activate, deactivate } from "./runtime.js"; 
import { fetchCursorPosition } from "./../utilities.js";

import { renderAsset, drawMap, villageMap, playerSprites } from "./../assets/render.js";  

export { compileGame, ammunitionBar, user };


let user, ammunitionBar

function compileGame() {
	
	function declare() {
		user = new Player({
			asset: playerSprites,
			sprite: {
				frame: 0,
				image: playerSprites.idleRight.image
			},
			scale: 3,

			width: playerSprites.idleRight.width,
			height: playerSprites.idleRight.height,
				
			x: villageMap.startingPosition.x,	
			y: villageMap.startingPosition.y,

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

		ammunitionBar = new Bar({
			x: 0, 
			y: canvas.height,  
			offset: {
				x: -canvas.width / 32,
				y: canvas.height / 8
			},

			width: 0,
			height: 30,
			
			colour: "yellow",
		});
		
		window.addEventListener("keydown", activate, false);
		window.addEventListener("keyup", deactivate, false);
		
		window.addEventListener("mousemove", activate, false);
		window.addEventListener("mousedown", activate, false);
		
		animateGame();
	};

	// Made in the case where more unique sprites could be added to the character.
	let sprites = [];
	
	for (let sprite in playerSprites) {
		sprites.push({"var": playerSprites[sprite]['image'], "url": playerSprites[sprite]['url']});
	};
	
	sprites.push({ "var": villageMap['image'], "url": villageMap['url']  });

	renderAsset(sprites, declare);
				
	console.info("Game successfully compiled")
};
