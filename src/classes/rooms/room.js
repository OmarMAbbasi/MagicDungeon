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

	setLayout() {}
}
