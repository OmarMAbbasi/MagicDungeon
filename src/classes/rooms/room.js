export default class Room {
	constructor(x, y) {
		this.walls = {
			north: 'wall',
			south: 'wall',
			east: 'wall',
			west: 'wall'
		};

		this.cords = {
			x: x,
			y: y
		};

		this.type = 'normal';

		this.visited = false;
		this.layout = null;
		// this.visited = false;
		// debugger;
	}

	setLayout() {
		if (this.type === 'start') {
			this.type === 'start';
		} else if (this.type === 'boss') {
		} else if (this.type === 'normal') {
			this.layout = '';
			if (this.walls.north !== 'wall') {
				this.layout += 'N';
			}
			if (this.walls.south !== 'wall') {
				this.layout += 'S';
			}
			if (this.walls.east !== 'wall') {
				this.layout += 'E';
			}
			if (this.walls.west !== 'wall') {
				this.layout += 'W';
			}
		}
	}
}
