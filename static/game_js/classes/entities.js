/*
Involved inheritence to avoid rewriting the same attributes & methods.
Reference Link: (https://youtu.be/DqUPa0D2N78?si=O1NNsm7qBeUs11QS&t=84)
- Timestamp: 1:24
Refernece Link: (https://youtu.be/Cto38GpvJgg?si=9wa5930EtFF268E5&t=191)i
- Timestamp: 3:11
*/
export { Player, Enemy };


class Entity {
	constructor({sprite, width, height, position, velocity}) {
		this.sprite = sprite;
		
		this.width = width;
		this.height = height;
	
		this.position = position;
		this.velocity = velocity;
		this.moveUp = false;
		this.moveLeft = false;
		this.moveDown = false;
		this.moveRight = false;
		
		this.forwardCycle = true;
		this.animationDelay = 1.25;  // Delay By Decreasing Such By 1	
	};

	movement() {
		if (this.moveUp) {
			this.position.y -= this.velocity.y;
		};
		
		if (this.moveLeft) {
			this.position.x -= this.velocity.x;
		};

		if (this.moveDown) {
			this.position.y += this.velocity.y;
		};
	
		if (this.moveRight) {
        		this.position.x += this.velocity.x;
		};
	};
};


class Player extends Entity {	
	constructor({sprite, width, height, position, velocity, ammunition, equip}) {
		super(sprite, width, height, position, velocity);
		
		this.ammunition = ammunition;
		
		this.equip = equip;
		
		this.sprintIncrease = 2; // Mutliplied
	};

	super.movement();
	
	animation(cursorAngle) {	
		// Entity's attributes must be updated every direction
		// to account for the difference in the sprite sheet.	
		if (cursorAngle < -45 && cursorAngle >= -135) {
			// Facing Up	
			if (this.moveUp || this.moveLeft || this.moveDown) {
				
				this.forwardCycle = true;
			
			} else if (this.moveRight) {	
				
				this.forwardCycle = false;

			} else {
				
				this.forwardCycle = true;
			};

		} else if (cursorAngle < -135 || cursorAngle >= 135) {
			// Facing Left
			if (this.moveUp || this.moveLeft || this.moveDown) {
				
				this.forwardCycle = true;
			
			} else if (this.moveRight) {	
				
				this.forwardCycle = false;

			} else {
				
				this.forwardCycle = true;
			};

		} else if (cursorAngle < 135 && cursorAngle >= 45) {
			// Facing Down
			if (this.moveUp || this.moveLeft || this.moveDown) {
				
				this.forwardCycle = true;
			
			} else if (this.moveRight) {	
				
				this.forwardCycle = false;

			} else {
				
				this.forwardCycle = true;
			};

		} else if (cursorAngle < 45 && cursorAngle >= -45) {
			// Facing Right
			if (this.moveUp || this.moveLeft || this.moveDown) {
				
				this.forwardCycle = true;
			
			} else if (this.moveRight) {	
				
				this.forwardCycle = false;

			} else {
				
				this.forwardCycle = true;
			};
		};
	};	
};


class Enemy extends Entity {
	constructor({sprite, width, height, position, velocity}) {
		super(sprite, width, height, position, velocity);	
	};
};
