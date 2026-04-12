import { Player } from  "./classes/entities.js";
import { Firearm } from  "./classes/items.js";
import { Bar, Button } from "./classes/user_interface.js";


// (This will also change based on what is selected.)
import { layers } from "./map_values.js";

export { canvas, ctx, player, fullscreenButton, ammunitionBar };

// (This will be removed when a start-up menu is incorperated.)
document.addEventListener("DOMContentLoaded", init, false);


function init() {
	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext("2d");
	
	let player = new Player({
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
	};
};
