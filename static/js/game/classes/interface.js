export {Button, Bar};

class Button {
	constructor({x, y, offset, width, height, colour, text, textColour}) {
		this.x = x - offset.x;
		this.y = y - offset.y;
		this.offset = offset;

		this.width = width;
		this.height = height;
		
		this.colour = colour;
		
		this.text = text;
		this.textColour = textColour;
	};

	drawing(ctx) {
		ctx.fillStyle = this.colour;
                ctx.fillRect(this.x, this.y, this.width, this.height);
		
		/* 
		Getting the exact measurements of the box around the text.
		- Reference Link: (https://stackoverflow.com/questions/18900117/write-text-on-canvas-with-background)
		- Found in verified solution
		*/
		if (this.text !== undefined) {
			ctx.textBaseline = "top";
			
			ctx.font = this.height + "px serif";	
			ctx.fillStyle = this.textColour;
			ctx.fillText(this.text, this.x, this.y);
			
			this.width = ctx.measureText(this.text).width;
			console.log(this.width)
		};
		
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
