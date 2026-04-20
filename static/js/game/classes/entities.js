/*
Involved inheritence to avoid rewriting the same attributes & methods.
Reference Link: (https://youtu.be/DqUPa0D2N78?si=O1NNsm7qBeUs11QS&t=84)
- Timestamp: 1:24
Refernece Link: (https://youtu.be/Cto38GpvJgg?si=9wa5930EtFF268E5&t=191)i
- Timestamp: 3:11
*/
export { Player, /* Enemy */ };


class Entity {
	constructor(asset, sprite, scale, x, y, width, height, velocity) {
		this.asset = asset;
		this.sprite = sprite;
		this.scale = scale;
		
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;
	
		this.velocity = velocity;
		
		this.moveUp = false;
		this.moveLeft = false;
		this.moveDown = false;
		this.moveRight = false;
		
		this.forwardCycle = true;
		this.animationDelay = 1.25;  // Delay By Decreasing Such By 1	
	};


	move() {
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
	

	drawSprite(ctx) {
		ctx.imageSmoothingEnabled = false;

		ctx.drawImage(this.sprite.image,
			this.sprite.frame * this.width, 0, this.width, this.height,
			this.x, this.y, this.width * this.scale, this.height * this.scale
		);	
		
		/*
		Displays and delays the sprite animation cycle.
		Reference Link: (https://stackoverflow.com/questions/69059989/how-do-i-slowdown-my-sprite-animation-in-javascript-canvas)
		- Found in the verified solution.  
		*/
		
		if (this.animationDelay > 0) {
			this.animationDelay--;
		} else {
			this.forwardCycle ? 
			(this.sprite.frame = (this.sprite.frame+1) % 6) : (this.sprite.frame = ((this.sprite.frame+6)-1) % 6);
			this.animationDelay = 1.25;
		};
	};
};


class Player extends Entity {	
	constructor({asset, sprite, scale, x, y, width, height, velocity, ammunition, equip}) {
		super(asset, sprite, scale, x, y, width, height, velocity);
		
		this.ammunition = ammunition;
		
		this.equip = equip;
		
		this.sprintIncrease = 2; // Mutliplied
	};
	
	
	changeSprite(cursorAngle) {	
		// Entity's attributes must be updated every direction
		// to account for the difference in the sprite sheet.	
		if (cursorAngle < -45 && cursorAngle >= -135) {
			// Facing Up	
			if (this.moveUp || this.moveLeft || this.moveRight) {
				this.sprite.image = this.asset.moveUp.image;
				this.width = this.asset.moveUp.width;
				this.height = this.asset.moveUp.height;

				this.forwardCycle = true;
			
			} else if (this.moveDown) {	
				this.sprite.image = this.asset.moveUp.image;
				this.width = this.asset.moveUp.width;
				this.height = this.asset.moveUp.height;
				
				this.forwardCycle = false;

			} else {
				this.sprite.image = this.asset.idleUp.image;
				this.width = this.asset.idleUp.width;
				this.height = this.asset.idleUp.height;
				
				this.forwardCycle = true;
			}

		} else if (cursorAngle < -135 || cursorAngle >= 135) {
			// Facing Left
			if (this.moveUp || this.moveLeft || this.moveDown) {
				this.sprite.image = this.asset.moveLeft.image;
				this.width = this.asset.moveLeft.width;
				this.height = this.asset.moveLeft.height;
				
				this.forwardCycle = true;
			
			} else if (this.moveRight) {	
				this.sprite.image = this.asset.moveLeft.image;
				this.width = this.asset.moveLeft.width;
				this.height = this.asset.moveLeft.height;
				
				this.forwardCycle = false;

			} else {
				this.sprite.image = this.asset.idleLeft.image;
				this.width = this.asset.idleLeft.width;
				this.height = this.asset.idleLeft.height;
				
				this.forwardCycle = true;
			};

		} else if (cursorAngle < 135 && cursorAngle >= 45) {
			// Facing Down
			if (this.moveDown || this.moveLeft || this.moveRight) {
				this.sprite.image = this.asset.moveDown.image;
				this.width = this.asset.moveDown.width;
				this.height = this.asset.moveDown.height;
				
				this.forwardCycle = true;
			
			} else if (this.moveUp) {	
				this.sprite.image = this.asset.moveDown.image;
				this.width = this.asset.moveDown.width;
				this.height = this.asset.moveDown.height;
				
				this.forwardCycle = false;

			} else {
				this.sprite.image = this.asset.idleDown.image;
				this.width = this.asset.idleDown.width;
				this.height = this.asset.idleDown.height;
				
				this.forwardCycle = true;
			};

		} else if (cursorAngle < 45 && cursorAngle >= -45) {
			// Facing Right
			if (this.moveRight || this.moveUp || this.moveDown) {
				this.sprite.image = this.asset.moveRight.image;
				this.width = this.asset.moveRight.width;
				this.height = this.asset.moveRight.height;
				
				this.forwardCycle = true;
			
			} else if (this.moveLeft) {	
				this.sprite.image = this.asset.moveRight.image;
				this.width = this.asset.moveRight.width;
				this.height = this.asset.moveRight.height;
				
				this.forwardCycle = false;

			} else {
				this.sprite.image = this.asset.idleRight.image;
				this.width = this.asset.idleRight.width;
				this.height = this.asset.idleRight.height;
				
				this.forwardCycle = true;
			};
		};
	};	
};


/*
class Enemy extends Entity {
	constructor({sprite, width, height, position, velocity}) {
		super(sprite, width, height, position, velocity);	
	};
};
*/
