// Separates the projectile's functions and values from other animations. 
// Reference Link: (https://youtu.be/HXquxWtE5vA?si=4-d0GSK-EjCLx1xr&t=8640)
// Timestamp: 2:24:00
export class PlayersProjectile {
		constructor({x, y, size, colour, velocity}) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.colour = colour;
			this.velocity = velocity;
		};

		draw(ctx) {
			ctx.fillStyle = this.colour;
			ctx.fillRect(this.x, this.y, this.size, this.size);
		};

		project(ctx) {
			this.draw(ctx);
			this.x += this.velocity.x;
			this.y += this.velocity.y;
		};
	};
