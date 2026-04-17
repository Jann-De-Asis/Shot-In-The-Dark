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

	drawingBox(ctx) {
		ctx.fillStyle = this.colour;
                ctx.fillRect(this.x, this.y, this.width, this.height);		
	};

	addingText(ctx, text, font, size, offset, colour) {
		ctx.textBaseline = "top";
		ctx.font = size + "px " + font;
		
		ctx.fillStyle = colour;
		ctx.fillText(text, this.x, this.y - offset);
	};

	checkingClick(click) {
		return (
			click.x >= this.x && click.x <= this.x+this.width 
			&& click.y >= this.y && click.y <= this.y+this.height
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
