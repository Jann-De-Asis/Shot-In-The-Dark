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
