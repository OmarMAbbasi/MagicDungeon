import fill from "lodash/fill";
import times from "lodash/times";
import Room from "../rooms/room";
//builds out 2D array of room nodes based on size

//TODO Modularize floorBuilder
export const floorBuilder = size => {
	let floor = [];
	// let top = []
	// debugger;
	let top = [];
	_.times(size - 2, () => {
		top.push(roomBuilder("northWall"));
	});
	// let top = _.fill(Array(size - 2));
	top.push(roomBuilder("cornerNE"));
	top.unshift(roomBuilder("cornerNW"));
	floor.push(top);

	times(size - 2, () => {
		let row = [];
		_.times(size - 2, () => {
			row.push(roomBuilder("openRoom"));
		});
		row.push(roomBuilder("eastWall"));
		row.unshift(roomBuilder("westWall"));
		floor.push(row);
	});

	let bottom = [];
	_.times(size - 2, () => {
		bottom.push(roomBuilder("northWall"));
	});
	bottom.push(roomBuilder("cornerSE"));
	bottom.unshift(roomBuilder("cornerSW"));

	floor.push(bottom);

	//! Connect first row
	let room = floor[0][5];
	let next = floor[1][5];

	for (let y = 0; y < floor.length - 1; y++) {
		room = floor[0][y];
		next = floor[0][y + 1];

		room.east = next;
		next.west = room;
	}

	//! Connect middle rows
	let above;
	for (let x = 1; x < floor.length; x++) {
		for (let y = 0; y < floor.length - 1; y++) {
			room = floor[x][y];

			above = floor[x - 1][y];
			room.north = above;
			above.south = room;

			next = floor[x][y + 1];
			room.east = next;
			next.west = room;
		}
		room = floor[x][5];
		above = floor[x - 1][5];
		room.north = above;
		above.south = room;
	}

	//! Assign cords to room nodes
	for (let x = 0; x < floor.length; x++) {
		for (let y = 0; y < floor.length; y++) {
			floor[x][y].cords = { x: x, y: y };
		}
	}

	return floor;
};
//TODO Write function to send info from room class
//Randomly selects room type and generates room node from case "switch".
export const roomBuilder = (layout, type) => {
	let base = {};
	type = type || "unbuilt";
	switch (layout) {
		case "cornerNW":
			base = {
				north: "wall",
				west: "wall"
			};
			break;
		case "cornerNE":
			base = {
				north: "wall",
				east: "wall"
			};
			break;
		case "cornerSW":
			base = {
				south: "wall",
				west: "wall"
			};
			break;
		case "cornerSE":
			base = {
				south: "wall",
				east: "wall"
			};
			break;
		case "northWall":
			base = {
				north: "wall"
			};
			break;

		case "southWall":
			base = {
				south: "wall"
			};
			break;
		case "eastWall":
			base = {
				east: "wall"
			};
			break;
		case "westWall":
			base = {
				west: "wall"
			};
			break;
		case "verticalHallway":
			base = {
				east: "wall",
				west: "wall"
			};
			break;
		case "horizontalHallway":
			base = {
				north: "wall",
				south: "wall"
			};
			break;
		case "northDeadend":
			base = {
				north: "wall",
				east: "wall",
				west: "wall"
			};
			break;
		case "westDeadend":
			base = {
				north: "wall",
				south: "wall",
				east: "wall"
			};
			break;
		case "southDeadend":
			base = {
				south: "wall",
				east: "wall",
				west: "wall"
			};
			break;
		case "eastDeadend":
			base = {
				north: "wall",
				south: "wall",
				west: "wall"
			};
			break;
		default:
			break;
	}
	return new Room(base, layout, type);
};
