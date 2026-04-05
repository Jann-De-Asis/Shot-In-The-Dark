export class Entity {
	constructor({x, y, width, height, frameX, frameY, velocity, ammunition, equip}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.frameX = frameX;
		this.frameY = frameY;
		this.velocity = velocity;
		this.ammunition = ammunition;
		this.equip = equip;
	
		this.moveUp = false;
		this.moveLeft = false;
		this.moveDown = false;
		this.moveRight = false;
	
		this.sprintIncrease = 2; // Mutliplied
		this.animationDelay = 1.25;
	};
	
	movement() {

		// Delays the sprite animation cycle.
		// Reference Link: (https://stackoverflow.com/questions/69059989/how-do-i-slowdown-my-sprite-animation-in-javascript-canvas)
		// Found in the verified solution.  
		if (this.animationDelay > 0) {
			this.animationDelay--;
		} else {
			this.frameX = (this.frameX + 1) % 6;
			this.animationDelay = 1.25;
		};

		// Keep needing to specifiy the width since
		// the players sprite in each row is different.
		if (this.moveUp) {
			this.width = 11;  
			this.frameY = 3;
			this.y -= this.velocity.y;
		};
		
		if (this.moveLeft) {
			this.width = 12;
			this.frameY = 2;
			this.x -= this.velocity.x;
		};

		if (this.moveDown) {
			this.width = 13;  
			this.frameY = 0;
			this.y += this.velocity.y;
		};
	
		if (this.moveRight) {
			this.width = 12;
			this.frameY = 1;
        		this.x += this.velocity.x;
		};
	};
}; 
