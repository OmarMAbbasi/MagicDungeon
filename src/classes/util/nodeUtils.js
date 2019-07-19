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
		let rebuilt;
		if (currRoom.north && currRoom.north !== "wall") {
			nextRoom = currRoom.north;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				// debugger;
				rebuilt = buildNorth(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		}
		if (currRoom.south && currRoom.south !== "wall") {
			nextRoom = currRoom.south;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				// debugger;
				rebuilt = buildSouth(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		}
		if (currRoom.east && currRoom.east !== "wall") {
			nextRoom = currRoom.east;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				// debugger;
				rebuilt = buildEast(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		}
		if (currRoom.west && currRoom.west !== "wall") {
			nextRoom = currRoom.west;
			if (
				nextRoom.type === "unbuilt" &&
				(nextRoom.type !== "start" || nextRoom.type !== "boss")
			) {
				// debugger;rooms
				rebuilt = buildWest(nextRoom);
				nextRoom = _.merge(nextRoom, rebuilt);
				buildQueue.unshift(nextRoom);
			}
		}
		if (!nextRoom) {
			connectNodes(rooms, currRoom);
		}
	}
	// return false;
};

// const nodeGenerator = (rooms, curr) => {};

const sampleSet = set => {
	let layout = _.sample(set);
	return rBuilder(layout, "built");
};

export const buildNorth = room => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;
	if (x) {
		//!SOUTH > NORTH
		//!West
		switch (y) {
			case 0:
				//! NW_CORNER
				builtRoom = sampleSet(NORTH.NORTH_TO_NW);
				break;
			case 5:
				//! NE_CORNER
				builtRoom = sampleSet(NORTH.NORTH_TO_NE);
				break;
			default:
				//! North Wall
				builtRoom = sampleSet(NORTH.NORTH_WALL);
				break;
		}
	} else {
		switch (y) {
			case 0:
				//!WestWall
				builtRoom = sampleSet(NORTH.NORTH_ALONG_WEST);
				break;
			case 5:
				//!EastWall
				builtRoom = sampleSet(NORTH.NORTH_ALONG_EAST);
				break;
			default:
				//!Pure
				builtRoom = sampleSet(NORTH.PURE_NORTH);
				break;
		}
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

export const buildWest = room => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;

	//!EAST > WEST
	if (y === 5) {
		switch (x) {
			case 0:
				//! NW_CORNER
				builtRoom = sampleSet(WEST.WEST_TO_NW);
				break;
			case 5:
				//! SW_CORNER
				builtRoom = sampleSet(WEST.WEST_TO_SW);
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

export const buildEast = room => {
	let x = room.cords.x;
	let y = room.cords.y;

	let builtRoom;

	//!WEST>EAST
	if (y === 0) {
		switch (x) {
			case 0:
				//! NE_CORNER
				builtRoom = sampleSet(EAST.EAST_TO_NE);
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
				builtRoom = sampleSet(EAST.EAST_ALONG_NORTH);
				break;
			case 5:
				//!South Wall
				builtRoom = sampleSet(EAST.EAST_ALONG_SOUTH);

			default:
				//!Pure
				builtRoom = sampleSet(EAST.PURE_EAST);
				break;
		}
	}
	return builtRoom;
};

//! ROOM POOLS: Separated by build direction.
//TODO get pools to export to another file.

//!!BUILD SOUTH>NORTH
export const NORTH = {
	NORTH_TO_NW: ["northDeadend", "cornerNW"],
	NORTH_TO_NE: ["northDeadend", "cornerNE"],
	NORTH_WALL: ["northDeadend", "cornerNE", "cornerNW", "northWall"],
	NORTH_ALONG_WEST: ["northDeadend", "cornerNW", "westWall", "verticalHallway"],
	NORTH_ALONG_EAST: ["northDeadend", "cornerNE", "eastWall", "verticalHallway"],
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

//!!BUILD NORTH>SOUTH
export const SOUTH = {
	SOUTH_TO_SW: ["southDeadend", "cornerSW"],
	SOUTH_TO_SE: ["southDeadend", "cornerSE"],
	SOUTH_WALL: ["southDeadend", "cornerSE", "cornerSW", "southWall"],
	SOUTH_ALONG_WEST: ["southDeadend", "cornerSW", "westWall", "verticalHallway"],
	SOUTH_ALONG_EAST: ["southDeadend", "cornerSE", "eastWall", "verticalHallway"],
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
//!Build WEST > EAST
export const EAST = {
	EAST_TO_SE: ["eastDeadend", "cornerSE"],
	EAST_TO_SW: ["eastDeadend", "cornerSW"],
	EAST_WALL: ["eastDeadend", "cornerSE", "cornerSW", " eastWall "],
	EAST_ALONG_NORTH: [
		"eastDeadend",
		"cornerNE",
		"northWall",
		"horizontalHallway"
	],
	EAST_ALONG_SOUTH: [
		"eastDeadend",
		"cornerSE",
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
//! Build EAST>WEST
export const WEST = {
	WEST_TO_NW: ["westDeadend", "cornerNW"],
	WEST_TO_SW: ["westDeadend", "cornerSW"],
	WEST_WALL: ["westDeadend", "cornerNW", "cornerSW", "westWall"],
	WEST_ALONG_NORTH: [
		"westDeadend",
		"cornerNW",
		"horizontalHallway",
		"northWall"
	],
	WEST_ALONG_SOUTH: [
		"westDeadend",
		"cornerSW",
		"horizontalHallway",
		"southWall"
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
