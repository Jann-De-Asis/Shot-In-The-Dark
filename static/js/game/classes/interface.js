export { Button, Bar };

class Button {
	constructor({x, y, offset, width, height, colour}) {
		this.x = x - offset.x;
		this.y = y - offset.y;
		this.offset = offset;

		this.width = width;
		this.height = height;
		
		this.colour = colour;		
	};

	static fetchingTextMeasurements(ctx, text, size, font) {	
	};

	drawing(ctx) {
		ctx.fillStyle = this.colour;
                ctx.fillRect(this.x, this.y, this.width, this.height);		
	};

	drawingWithText(ctx, {text, font, size, offset, colour}) {
		ctx.fillStyle = this.colour;
                ctx.fillRect(this.x, this.y, this.width, this.height);		

		ctx.textBaseline = "top";
		ctx.font = size + "px " + font;
		
		ctx.fillStyle = colour;
		ctx.fillText(text, this.x - offset.x, this.y - offset.y);
	};

	checkingInside(position) {
		return (
			position.x >= this.x && position.x <= this.x+this.width 
			&& position.y >= this.y && position.y <= this.y+this.height
		);
	};

	togglingFullscreen(canvas) {
		if (document.fullscreenElement === null) {
				canvas.requestFullscreen();		
				return true;
		} else {
				document.exitFullscreen();
				return false;
		};	
	};

};


class Bar {
	constructor({x, y, width, height, colour}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
	};

	draw(ctx, changedCanvasWidth, changedCanvasHeight) {
		this.y.canvasHeight = changedCanvasHeight;
		
		ctx.fillStyle = this.colour;
		ctx.fillRect(
			this.x.difference + this.x.canvasWidth, 
			this.y.canvasHeight - this.y.difference, 
			this.width, 
			this.height
		);
	};
};
