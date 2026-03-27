export class Button {
	constructor({x, y, width, height, colour}) {
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

	draw(ctx, changedCanvasWidth, changedCanvasHeight) {
		this.x.canvasWidth = changedCanvasWidth;

                ctx.fillStyle = this.colour;
                ctx.fillRect(
                        this.x.canvasWidth - this.x.difference, 
                        this.y.difference - this.y.canvasHeight, 
                        this.width, 
                        this.height
                );
	};
};


export class Bar {
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
