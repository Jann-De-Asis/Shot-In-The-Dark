export { Button, Bar };

class Button {	
	// Applying static to allow changes to happen to every object.
	// Reference Link: (https://youtu.be/UOH4SAG3BoQ?si=Xz2jGtWzflC_ta-T&t=233);
	// - Timestamp: 3:53
	static scale = 0;

	constructor({x, y, offset, width, height, image, backgroundColour}) {
		this.x = x - offset.x;
		this.y = y - offset.y;
		this.offset = offset;

		this.width = width;
		this.height = height;
		
		this.image = image;
		this.backgroundColour = backgroundColour;		
		
		this.backgroundOpacity = 0;
	};

	draw(ctx, sx, sy, sWidth, sHeight) {
		ctx.fillStyle = `rgba(${this.backgroundColour}, ${this.backgroundOpacity})`;
                ctx.fillRect(this.x + Button.scale, this.y, this.width, this.height);		

		ctx.drawImage(this.image, 
			sx, sy, sWidth, sHeight,
			this.x + Button.scale, this.y, this.width, this.height)
	};

	drawWithText(ctx, {text, font, size, offset, colour}) {
		console.log("PlayButton x: " + (this.x + Button.scale));
		ctx.fillStyle = `rgba(${this.backgroundColour}, ${this.backgroundOpacity})`;
                ctx.fillRect(this.x + Button.scale, this.y, this.width, this.height);		

		console.log("Scale: " + Button.scale);
		
		ctx.textBaseline = "top";
		ctx.font = size + "px " + font;
		
		ctx.fillStyle = `rgba(${colour}, 1)`;
		ctx.fillText(text, (this.x - offset.x) + Button.scale, this.y - offset.y);
	};

	isInside(position) {
		return (
			position.x >= this.x && position.x <= this.x+this.width 
			&& position.y >= this.y && position.y <= this.y+this.height
		);
	};		
};


class Bar {
	constructor({x, y, offset, width, height, backgroundColour}) {
		this.x = x - offset.x;
		this.y = y - offset.y;
		this.offset = offset;

		this.width = width;
		this.height = height;
		
		this.backgroundColour = backgroundColour;
	};

	draw(ctx) {
		ctx.fillStyle = this.backgroundColour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
};
