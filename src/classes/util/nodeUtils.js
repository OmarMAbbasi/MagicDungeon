import { roomBuilder } from "./floorUtils";
import { sample, merge } from "lodash";

const rBuilder = roomBuilder;

export const connectNodes = (rooms, curr) => {
	//! first curr == boss
	// let x = curr.cords.x;
	// let y = curr.cords.y;

	let buildQueue = [curr];
	let visited = [];
	let found = false;
	// let currRoom = rooms[x][y];
	//TODO UPDATE BUILD POOLS
	while (buildQueue.length > 0) {
		let currRoom = buildQueue.shift();
		visited.push(currRoom);
		let nextRoom;
		if (currRoom.type === "start") {
			return true;
		}
		if (currRoom.north && currRoom.north !== "wall") {
			nextRoom = currRoom.north;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				debugger;
				let rebuilt = buildNorth(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		} else if (currRoom.south && currRoom.south !== "wall") {
			nextRoom = currRoom.south;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				debugger;
				let rebuilt = buildSouth(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		} else if (currRoom.east && currRoom.east !== "wall") {
			nextRoom = currRoom.east;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				debugger;
				let rebuilt = buildEast(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		} else if (currRoom.west && currRoom.west !== "wall") {
			nextRoom = currRoom.west;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				debugger;
				let rebuilt = buildWest(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		}
		debugger;
		if (currRoom.type === "start") {
			return true;
		} else {
			connectNodes(rooms, nextRoom);
		}
		return false;
	}
	// return false;
};

// const nodeGenerator = (rooms, curr) => {};

const sampleSet = set => {
	let layout = _.sample(set);
	return rBuilder(layout, "built");
};

const buildNorth = room => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;
	switch (x) {
		//!SOUTH > NORTH
		case 0:
			//!West
			switch (y) {
				case 0:
					//! NW_CORNER
					builtRoom = sampleSet(NORTH.NORTH_TO_NW);
					break;
				case 5:
					//! SW_CORNER
					builtRoom = sampleSet(NORTH.NORTH_TO_NE);
					break;
				default:
					//! North Wall
					builtRoom = sampleSet(NORTH.NORTH_WALL);
					break;
			}
			break;
		default:
			switch (y) {
				case 0:
					//!WestWall
					builtRoom = sampleSet(NORTH.NORTH_ALONG_WEST);
					break;
				case 5:
					//!EastWall
					builtRoom = sampleSet(NORTH.NORTH_ALONG_EAST);

				default:
					//!Pure
					builtRoom = sampleSet(NORTH.PURE_NORTH);
					break;
			}
			break;
	}
	return builtRoom;
};
//* WORKING

export const buildSouth = room => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;
	if (x === 5) {
		//!NORTH > SOUTH
		switch (y) {
			case 0:
				//! SW_CORNER
				builtRoom = sampleSet(SOUTH.SOUTH_TO_SW);
				break;
			case 5:
				//! SE_CORNER
				builtRoom = sampleSet(SOUTH.SOUTH_TO_SE);
				break;
			default:
				//! South Wall
				builtRoom = sampleSet(SOUTH.SOUTH_WALL);
				break;
		}
	} else {
		switch (y) {
			case 0:
				//!WestWall
				builtRoom = sampleSet(SOUTH.SOUTH_ALONG_WEST);
				break;
			case 5:
				//!EastWall
				builtRoom = sampleSet(SOUTH.SOUTH_ALONG_EAST);

			default:
				//!Pure
				builtRoom = sampleSet(SOUTH.PURE_SOUTH);
				break;
		}
	}
	return builtRoom;
};

export const buildEast = room => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;

	//!WEST>EAST
	if (y === 5) {
		switch (x) {
			case 0:
				//! NE_CORNER
				builtRoom = sampleSet(WEST.WEST_TO_NW);
				break;
			case 5:
				//! NW_CORNER
				builtRoom = sampleSet(WEST.WEST_TO_NE);
				break;
			default:
				//! West Wall
				builtRoom = sampleSet(WEST.WEST_WALL);
				break;
		}
	} else {
		switch (x) {
			case 0:
				//!South Wall
				builtRoom = sampleSet(WEST.WEST_ALONG_NORTH);
				break;
			case 5:
				//!East Wall
				builtRoom = sampleSet(WEST.WEST_ALONG_SOUTH);

			default:
				//!Pure
				builtRoom = sampleSet(WEST.PURE_WEST);
				break;
		}
	}
	return builtRoom;
};

export const buildWest = room => {
	let x = room.cords.x;
	let y = room.cords.y;

	let builtRoom;

	//!EAST > WEST
	if (y === 0) {
		switch (x) {
			case 0:
				//! SW_CORNER
				builtRoom = sampleSet(EAST.EAST_TO_SW);
				break;
			case 5:
				//! SE_CORNER
				builtRoom = sampleSet(EAST.EAST_TO_SE);
				break;
			default:
				//! EAST Wall
				builtRoom = sampleSet(EAST.EAST_WALL);
				break;
		}
	} else {
		switch (x) {
			case 0:
				//!North Wall
				builtRoom = sampleSet(SOUTH.SOUTH_ALONG_WEST);
				break;
			case 5:
				//!South Wall
				builtRoom = sampleSet(SOUTH.SOUTH_ALONG_EAST);

			default:
				//!Pure
				builtRoom = sampleSet(SOUTH.PURE_SOUTH);
				break;
		}
	}
	return builtRoom;
};

//! ROOM POOLS: Separated by build direction.
//TODO get pools to export to another file.
export const NORTH = {
	NORTH_TO_NW: ["northDeadend", "cornerNW"],
	NORTH_TO_NE: ["northDeadend", "cornerNE"],
	NORTH_WALL: ["northDeadend", "cornerNE", "cornerNW", "northWall"],
	NORTH_ALONG_WEST: [
		"northDeadend",
		"cornerNE",
		"cornerNW",
		"westWall",
		"verticalHallway"
	],

	NORTH_ALONG_EAST: [
		"northDeadend",
		"cornerNE",
		"cornerNW",
		"eastWall",
		"verticalHallway"
	],
	PURE_NORTH: [
		"northDeadend",
		"cornerNE",
		"cornerNW",
		"verticalHallway",
		"northWall",
		"eastWall",
		"westWall",
		"open"
	]
};

//!!BUILD SOUTH v
export const SOUTH = {
	SOUTH_TO_SW: ["southDeadend", "cornerSW"],
	SOUTH_TO_SE: ["southDeadend", "cornerSE"],
	SOUTH_WALL: ["southDeadend", "cornerSE", "cornerSW", "southWall"],
	SOUTH_ALONG_WEST: [
		"southDeadend",
		"cornerNE",
		"cornerNW",
		"westWall",
		"verticalHallway"
	],
	SOUTH_ALONG_EAST: [
		"southDeadend",
		"cornerNE",
		"cornerNW",
		"eastWall",
		"verticalHallway"
	],
	PURE_SOUTH: [
		"southDeadend",
		"cornerSW",
		"cornerSE",
		"verticalHallway",
		"southWall",
		"eastWall",
		"westWall",
		"open"
	]
};
//!Build East >
export const EAST = {
	EAST_TO_SE: ["eastDeadend", "cornerSW"],
	EAST_TO_SW: ["eastDeadend", "cornerNW"],
	EAST_WALL: ["eastDeadend", "cornerSE", "cornerSW", " eastWall "],
	EAST_ALONG_NORTH: [
		"eastDeadend",
		"cornerNE",
		"cornerNW",
		"northWall",
		"horizontalHallway"
	],
	EAST_ALONG_SOUTH: [
		"eastDeadend",
		"cornerNE",
		"cornerNW",
		"southWall",
		"horizontalHallway"
	],
	PURE_EAST: [
		"southDeadend",
		"cornerSW",
		"cornerNW",
		"horizontalHallway",
		"southWall",
		"northWall",
		"eastWall",
		"open"
	]
};
//! Build West <
export const WEST = {
	WEST_TO_SE: ["westDeadend", "cornerSW"],
	WEST_TO_SW: ["westDeadend", "cornerNW"],
	WEST_WALL: ["westDeadend", "cornerSE", "cornerSW", "westWall "],
	WEST_ALONG_NORTH: [
		"westDeadend",
		"cornerNE",
		"cornerNW",
		"northWall",
		"horizontalHallway"
	],
	WEST_ALONG_SOUTH: [
		"westDeadend",
		"cornerNE",
		"cornerNW",
		"southWall",
		"horizontalHallway"
	],
	PURE_WEST: [
		"southDeadend",
		"cornerSW",
		"cornerNW",
		"horizontalHallway",
		"southWall",
		"northWall",
		"westWall",
		"open"
	]
};

export const SCALE = {
	MIN_WALLS: ["northWall", "eastWall", "southWall", "westWall", "open"],
	CLOSE_GAPS: ["northDeadend", "southDeadend", "eastDeadend", "westDeadend"]
};
