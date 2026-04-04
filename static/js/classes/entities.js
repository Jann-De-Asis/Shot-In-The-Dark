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
	};
	
	movement() {
		if (this.moveUp) {
			this.y -= this.velocity.y;
		};
		
		if (this.moveLeft) {
			this.frameY = 1;
			this.x -= this.velocity.x;
		};

		if (this.moveDown) {
			this.y += this.velocity.y;
		};
	
		if (this.moveRight) {
			this.frameY = 2;
        		this.x += this.velocity.x;
		};
	};
}; 
