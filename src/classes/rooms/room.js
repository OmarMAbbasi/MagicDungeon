export default class Room {
	constructor(walls, layout, type) {
		this.north = walls.north;
		this.south = walls.south;
		this.east = walls.east;
		this.west = walls.west;
		this.type = type || "unbuilt";
		this.layout = layout;
		// this.visited = false;
		// debugger;
	}
}
