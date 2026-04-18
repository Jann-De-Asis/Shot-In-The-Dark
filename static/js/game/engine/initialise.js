import { Player } from  "./../classes/entities.js";
import { Firearm } from  "./../classes/items.js";
import { Bar, Button } from "./../classes/interface.js";

/* import { animating } from "./runtime.js"; */

import { renderingAsset, drawingMap, /*villageSprite,*/ playerSprites } from "./../assets/render.js";  
// import layers from "./../assets/village_data.js";

export { compilingGame as default };


function compilingGame() {
	// Made in the case where more unique sprites could be added to the character.
	let sprites = [];
	
	for (let sprite in playerSprites) {
		sprites.push({"container": playerSprites[sprite]['image'], "url": playerSprites[sprite]['url']});
	};
	
	// sprites.push({ "var": villageMap['image'], "url": villageMap['url']  })

	renderingAsset(sprites)

	/*
	
	let player = new Player({
			asset: playerSpritess,
			sprite: {
				frame: 0,
				/mage: playerSpritess.idleRight.image
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
		
	drawingMap(villageMap, layers);
	*/
};
