export class Entity {
	constructor({x, y, width, height, colour, velocity, ammunition, equip}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
		this.velocity = velocity;
		this.ammunition = ammunition;
		this.equip = equip;
	
		this.moveUp = false;
		this.moveLeft = false;
		this.moveDown = false;
		this.moveRight = false;
	
		this.sprintIncrease = 2; // Mutliplied
	};
	
	draw(ctx) {
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);

		if (this.moveUp) {
			this.y -= this.velocity.y;
		};
		
		if (this.moveLeft) {
			this.x -= this.velocity.x;
		};

		if (this.moveDown) {
			this.y += this.velocity.y;
		};
	
		if (this.moveRight) {
        	this.x += this.velocity.x;
		};
	};
}; 
