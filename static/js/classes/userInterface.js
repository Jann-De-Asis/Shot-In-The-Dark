export class inGameButton {
		constructor({type, x, y, size, colour}) {
			this.type = type;
			this.x = x;
			this.y = y;
			this.size = size;
			this.colour = colour;
		};

		isInside(pos, box) {
			return ((pos.x > (box.x.canvasWidth-box.x.difference)) 
				     && (pos.x < ((box.x.canvasWidth-box.x.difference) + box.size)) 
					 && (pos.y < ((box.y.difference-box.y.canvasHeight) + box.size)) 
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
