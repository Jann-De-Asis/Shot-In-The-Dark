export class Button {
	constructor({type, x, y, width, height, colour}) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
	};

	isInside(pos, box) {
		return ((pos.x > (box.x.canvasWidth-box.x.difference)) 
			 && (pos.x < ((box.x.canvasWidth-box.x.difference) + box.width)) 
			 && (pos.y < ((box.y.difference-box.y.canvasHeight) + box.height)) 
			 && (pos.y > (box.y.difference-box.y.canvasHeight)));
};

	toggleFullscreen(canvas) {
		if (document.fullscreenElement === null) {
				canvas.requestFullscreen();		
				return true;
		} else {
				document.exitFullscreen();
				return false;
		};	
	};	
};


export class Bar {
	constructor({type, x, y, width, height, colour}) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
	};

	draw(ctx) {
		ctx.fillStyle = this.colour;
		ctx.fillRect(
			this.x.difference + this.x.canvasWidth, 
			this.y.canvasHeight - this.y.difference, 
			this.width, 
			this.height);
	};
};
