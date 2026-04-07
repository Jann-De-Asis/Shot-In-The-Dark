export class Entity {
	constructor({x, y, width, height, frame, frameOffset, spriteScale, velocity, ammunition, equip}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.frame = frame;
		this.frameOffset = frameOffset;
		this.spriteScale = spriteScale;
		this.velocity = velocity;
		this.ammunition = ammunition;
		this.equip = equip;
	
		this.moveUp = false;
		this.moveLeft = false;
		this.moveDown = false;
		this.moveRight = false;
	
		this.sprintIncrease = 2; // Mutliplied
		
		this.forwardCycle = true;
		this.animationDelay = 1.25;  // Delay By Decreasing Such By 1
	};

	animation(cursorAngle) {	
		// Entity's attributes must be updated every direction
		// to account for the difference in the sprite sheet.	
		if (cursorAngle < -45 && cursorAngle >= -135) {
			// Facing Up
			this.width = 13;
			this.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.frame.y = 3;

		} else if (cursorAngle < -135 || cursorAngle >= 135) {
			// Facing Left
			if (this.moveUp || this.moveLeft || this.moveDown) {
				this.forwardCycle = true;
				this.width = 14;
				this.height = 17;
				this.frameOffset.x = -1;
				this.frameOffset.y = -4;
				this.frame.y = 7;	
			
			} else if (this.moveRight) {	
				this.width = 14;
				this.height = 17;
				this.frameOffset.x = -1;
				this.frameOffset.y = -4;
				this.frame.y = 7;	
				this.forwardCycle = false;

			} else {
				this.forwardCycle = true;
				this.width = 12;
				this.height = 16;
				this.frameOffset.x = 0;
				this.frameOffset.y = 0;
				this.frame.y = 2;
			};

		} else if (cursorAngle < 135 && cursorAngle >= 45) {
			// Facing Down
			this.width = 13;
			this.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.frame.y = 0;

		} else if (cursorAngle < 45 && cursorAngle >= -45) {
			// Facing Right
			this.width = 12;
			this.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.frame.y = 1;
		};
	};
	
	movement() {
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

	// Player's attributes must be updated every direction
	// to account for the difference in the sprite sheet.	
	facing(direction) {
		switch (direction) {
			case "down":
				console.log("working!");
				if (this.moveDown) {	
					this.width = 13;
					this.height = 17;
					this.frameOffset.x = -1;
					this.frameOffset.y = -4;
					this.frame.y = 4;
					break;
				} else {
					this.width = 13;
					this.height = 16;
					this.frameOffset.x = 0;
					this.frameOffset.y = 0;
					this.frame.y = 0;
					break;
				};
		};
	};
	/*
	facingUp() {
		if (this.moveUp) {	
			this.width = 13;
			this.height = 17;
			this.frameOffset.x = -1;
			this.frameOffset.y = -4;
			this.frame.y = 6;
		} else {
			this.width = 13;
			this.height = 16;
			this.frameOffset.x = 0;
			this.frameOffset.y = 0;
			this.frame.y = 3;
		};
	};
	facingLeft() {	
		this.width = 12;
		this.height = 16;
		this.frameOffset.x = 0;
		this.frameOffset.y = 0;
		this.frame.y = 2;
	};
	facingDown() {
		this.width = 13;
		this.height = 16;
		this.frameOffset.x = 0;
		this.frameOffset.y = 0;
		this.frame.y = 0;
	};
	facingRight() {
		this.width = 12;
		this.height = 16;
		this.frameOffset.x = 0;
		this.frameOffset.y = 0;
		this.frame.y = 1;
	};
	*/
}; 
