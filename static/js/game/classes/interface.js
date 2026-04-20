export { Button, Bar };


class Interface {	
	constructor(x, y, offset, width, height) {
		this.x = x;
		this.y = y;
		this.offset = offset;
		
		this.width = width;
		this.height = height;	
	};


	// Applying static to allow changes to happen to every object.
	// Reference Link: (https://youtu.be/UOH4SAG3BoQ?si=Xz2jGtWzflC_ta-T&t=233);
	// - Timestamp: 3:53
	static ratio = {
		x: 1,
		y: 1
	};


	isInside(userPosition) {
		let objectPosition = {
			x: (this.x*Interface.ratio.x) - this.offset.x,
			y: (this.y*Interface.ratio.y) - this.offset.y
		};
		
		return (
			userPosition.x >= objectPosition.x 
			&& userPosition.x <= (objectPosition.x + this.width)
			
			&& userPosition.y >= objectPosition.y 
			&& userPosition.y <= (objectPosition.y + this.height)
		);
	};		
};



class Button extends Interface {
	constructor({x, y, offset, width, height, image, backgroundColour}) {
		super(x, y, offset, width, height);

		this.image = image;
		
		this.backgroundColour = backgroundColour;				
		this.backgroundOpacity = 0;	
	};


	draw(ctx, sx, sy, sWidth, sHeight) {
		let relativePosition = {
			x: (this.x*Interface.ratio.x) - this.offset.x,
			y: (this.y*Interface.ratio.y) - this.offset.y
		};

		ctx.fillStyle = `rgba(${this.backgroundColour}, ${this.backgroundOpacity})`;
                ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);		

		ctx.drawImage(this.image, 
			sx, sy, sWidth, sHeight,
			relativePosition.x, relativePosition.y, this.width, this.height)
	};


	drawWithText(ctx, {text, font, size, offset, colour}) {
		let relativePosition = {
			x: (this.x*Interface.ratio.x) - this.offset.x,
			y: (this.y*Interface.ratio.y) - this.offset.y
		};

		ctx.fillStyle = `rgba(${this.backgroundColour}, ${this.backgroundOpacity})`;
                ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);		

		ctx.textBaseline = "top";
		ctx.font = size + "px " + font;
		
		ctx.fillStyle = `rgba(${colour}, 1)`;
		ctx.fillText(text, (relativePosition.x - offset.x), (relativePosition.y - offset.y));
	};
};


class Bar extends Interface {
	constructor({x, y, offset, width, height, colour}) {
		super(x, y, offset, width, height);
		
		this.colour = colour;
	};

	
	draw(ctx) {
		let relativePosition = {
			x: (this.x*Interface.ratio.x) - this.offset.x,
			y: (this.y*Interface.ratio.y) - this.offset.y
		};

		ctx.fillStyle = this.colour;
                ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);		
	};


	drawWithText(ctx, {text, font, size, offset, colour}) {
		let relativePosition = {
			x: (this.x*Interface.ratio.x) - this.offset.x,
			y: (this.y*Interface.ratio.y) - this.offset.y
		};

		// The Bar
		ctx.fillStyle = this.colour;
                ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);		
		
		// The Text
		ctx.textBaseline = "top";
		ctx.font = size + "px " + font;
		ctx.fillStyle = colour;
		ctx.fillText(text, (relativePosition.x - offset.x), (relativePosition.y - offset.y));
	};
};
