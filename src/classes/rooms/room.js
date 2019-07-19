export default class Room {
	constructor(walls, layout, type) {
		this.north = walls.north;
		this.east = walls.east;
		this.south = walls.south;
		this.west = walls.west;
		this.type = type || "unbuilt";
		this.layout = layout;
		// this.visited = false;
		// debugger;
	}
}
