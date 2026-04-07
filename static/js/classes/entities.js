/*
Involved inheritence to avoid rewriting the same attributes & methods
Reference Link: (https://youtu.be/DqUPa0D2N78?si=O1NNsm7qBeUs11QS&t=84)
- Timestamp: 1:24
Refernece Link: (https://youtu.be/Cto38GpvJgg?si=9wa5930EtFF268E5&t=191)i
- Timestamp: 3:11
*/

export { Player };

class Entity {
	constructor({position, size, framePosition, frameOffset, spriteScale}) {
		this.position = position;
		this.size = size;
	
		this.framePosition = framePosition;
		this.frameOffset = frameOffset;
		this.spriteScale = spriteScale;

		this.player = Player;
		
		this.forwardCycle = true;
		this.animationDelay = 1.25;  // Delay By Decreasing Such By 1
	};
};


class Player extends Entity {	
	constructor({velocity, ammunition, equip}) {
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
	

	animation(cursorAngle) {	
		// Entity's attributes must be updated every direction
		// to account for the difference in the sprite sheet.	
		if (cursorAngle < -45 && cursorAngle >= -135) {
			// Facing Up
			this.size.width = 13;
			this.size.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.framePosition.y = 3;

		} else if (cursorAngle < -135 || cursorAngle >= 135) {
			// Facing Left
			if (this.moveUp || this.moveLeft || this.moveDown) {
				this.size.width = 14;
				this.size.height = 17;
				this.frameOffset.x = -1;
				this.frameOffset.y = -4;
				this.framePosition.y = 7;	
				
				this.forwardCycle = true;
			
			} else if (this.moveRight) {	
				this.size.width = 14;
				this.size.height = 17;
				this.frameOffset.x = -1;
				this.frameOffset.y = -4;
				this.framePosition.y = 7;	
				
				this.forwardCycle = false;

			} else {
				this.size.width = 12;
				this.size.height = 16;
				this.frameOffset.x = 0;
				this.frameOffset.y = 0;
				this.framePosition.y = 2;
				
				this.forwardCycle = true;
			};

		} else if (cursorAngle < 135 && cursorAngle >= 45) {
			// Facing Down
			this.size.width = 13;
			this.size.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.framePosition.y = 0;

		} else if (cursorAngle < 45 && cursorAngle >= -45) {
			// Facing Right
			this.size.width = 12;
			this.size.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.framePosition.y = 1;
		};
	};	
};
