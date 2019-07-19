import fill from "lodash/fill";
import times from "lodash/times";
import Room from "../rooms/room";
//builds out 2D array of room nodes based on size
export const floorBuilder = size => {
	let floor = [];
	// let top = []
	// debugger;
	let top = _.fill(Array(size - 2), roomBuilder("northWall"));
	top.push(roomBuilder("cornerNE"));
	top.unshift(roomBuilder("cornerNW"));
	floor.push(top);

	times(size - 2, () => {
		let row = _.fill(Array(size - 2), roomBuilder("openRoom"));
		row.push(roomBuilder("eastWall"));
		row.unshift(roomBuilder("westWall"));
		floor.push(row);
	});

	let bottom = _.fill(Array(size - 2), roomBuilder("bottomWall"));
	bottom.push(roomBuilder("cornerSE"));
	bottom.unshift(roomBuilder("cornerSW"));

	floor.push(bottom);
	return floor;
};
//TODO Write function to send info from room class
//Randomly selects room type and generates room node from case "switch".
export const roomBuilder = (layout, type) => {
	let base = {
		north: "open",
		south: "open",
		east: "open",
		west: "open"
	};
	type = type || "unbuilt";
	switch (layout) {
		case "cornerNE":
			base = {
				north: "wall",
				south: "open",
				east: "open",
				west: "wall"
			};
			break;
		case "cornerNW":
			base = {
				north: "wall",
				south: "open",
				east: "wall",
				west: "open"
			};
			break;
		case "cornerSE":
			base = {
				north: "wall",
				south: "open",
				east: "open",
				west: "wall"
			};
			break;
		case "cornerSW":
			base = {
				north: "wall",
				south: "open",
				east: "wall",
				west: "open"
			};
			break;
		case "northWall":
			base = {
				north: "wall",
				south: "open",
				east: "open",
				west: "open"
			};
		case "southWall":
			base = {
				north: "open",
				south: "wall",
				east: "open",
				west: "open"
			};
			break;
		case "eastWall":
			base = {
				north: "open",
				south: "open",
				east: "wall",
				west: "open"
			};
			break;
		case "westWall":
			base = {
				north: "open",
				south: "open",
				east: "open",
				west: "wall"
			};
			break;
		case "verticalHallway":
			base = {
				north: "open",
				south: "open",
				east: "wall",
				west: "wall"
			};
			break;
		case "horizontalHallway":
			base = {
				north: "wall",
				south: "wall",
				east: "open",
				west: "open"
			};
			break;
		case "northDeadend":
			base = {
				north: "wall",
				south: "open",
				east: "wall",
				west: "wall"
			};
			break;
		case "westDeadend":
			base = {
				north: "wall",
				south: "wall",
				east: "open",
				west: "wall"
			};
			break;
		case "southDeadend":
			base = {
				north: "wall",
				south: "opem",
				east: "wall",
				west: "wall"
			};
			break;
		case "eastDeadend":
			base = {
				north: "wall",
				south: "wall",
				east: "wall",
				west: "open"
			};
			break;
		default:
			break;
	}
	return new Room(base, layout, type);
};


