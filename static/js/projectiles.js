// Separates the projectile's functions and values from other animations. 
// Reference Link: (https://youtu.be/HXquxWtE5vA?si=4-d0GSK-EjCLx1xr&t=8640)
// Timestamp: 2:24:00
export class PlayersProjectile {
		constructor({x, y, size, colour, velocity}) {
			this.x = x
			this.y = y
			this.size = size
			this.colour = colour
			this.velocity = velocity
		}

		draw(context) {
			context.fillStyle = this.colour
			context.fillRect(this.x, this.y, this.size, this.size)
		}

		project(context) {
			this.draw(context)
			this.x += this.velocity.x
			this.y += this.velocity.y
		}


	}
