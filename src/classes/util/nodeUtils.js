import { roomBuilder } from "./floorUtils";
import sample from "lodash";

export const connectBossToStart = (rooms, curr) => {
	//! first curr == boss
	let x = curr.cords.x;
	let y = curr.cords.y;

	let buildQueue = [curr];
	// let currRoom = rooms[x][y];

	while (buildQueue.length > 0) {
		if (currRoom.type === "start") {
			return true;
		} else if (currRoom.north !== "wall") {
			nextRoom = rooms[x][y - 1];
			if (nextRoom.type !== "unbuilt") {
				rooms[x][y - 1] = nextRoom = buildNorth(rooms, currRoom);
				currRoom.north = nextRoom;
				nextRoom.south = currRoom;
			}
		} else if (currRoom.north !== "wall") {
			nextRoom = rooms[x][y - 1];
			if (nextRoom.type !== "unbuilt") {
				rooms[x][y - 1] = nextRoom = buildNorth(rooms, currRoom);
				currRoom.north = nextRoom;
				nextRoom.south = currRoom;
			}
		} else if (currRoom.north !== "wall") {
			nextRoom = rooms[x][y - 1];
			if (nextRoom.type !== "unbuilt") {
				rooms[x][y - 1] = nextRoom = buildNorth(rooms, currRoom);
				currRoom.north = nextRoom;
				nextRoom.south = currRoom;
			}
		}
	}
};

// const nodeGenerator = (rooms, curr) => {};

const sampleSet = set => {
	let layout = _.sample(set);
	return roomBuilder(layout, "built");
};

const buildNorth = prev => {
	let x = prev.cords.x;
	let y = prev.cords.y - 1;
	let type = "open";
	let newRoom;
	switch (x) {
		//!North
		case 0:
			//!West
			switch (y) {
				case 0:
					//! NW_Wall
					newRoom = sampleSet(NORTH_TO_NW);
					break;
				case 5:
					//! NE_Wall
					newRoom = sampleSet(NORTH_TO_NE);
					break;
				default:
					//! North Wall
					newRoom = sampleSet(NORTH_WALL);
					break;
			}
			break;
		// case 5:
		// 	//!West
		// 	switch (y) {
		// 		case 0:
		// 			newRoom = sampleSet(NORTH_WALL);
		// 			//! SW_Wall
		// 			break;
		// 		case 5:
		// 			//! SE_Wall
		// 			break;
		// 		default:
		// 			//! South Wall
		// 			break;
		// 	}
		// 	break;
		default:
			switch (y) {
				case 0:
					//!WestWall
					newRoom = sampleSet(NORTH_ALONG_WEST);
					break;
				case 5:
					//!EastWall
					newRoom = sampleSet(NORTH_ALONG_EAST);

				default:
					//!Pure
					newRoom = sampleSet(PURE_NORTH);
					break;
			}
			break;
	}

	nextRoom.cords.x = x;
	nextRoom.cords.y = y;
};

export const buildSouth = room => {
	walls = {
		north: room
	};
};
export const buildEast = room => {
	walls = {
		west: room
	};
};
export const buildWest = room => {
	walls = {
		east: room
	};
};

//! ROOM POOLS: Separated by build direction.
const NORTH = {
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
		"deadendNorth",
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
const SOUTH = {
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
const EAST = {
	EAST_TO_SE: ["westDeadend", "cornerSW"],
	EAST_TO_SW: ["westDeadend", "cornerNW"],
	EAST_WALL: ["westDeadend", "cornerSE", "cornerSW", " eastWall "],
	EAST_ALONG_NORTH: [
		"westDeadend",
		"cornerNE",
		"cornerNW",
		"northWall",
		"horizontalHallway"
	],
	EAST_ALONG_SOUTH: [
		"westDeadend",
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
const WEST = {
	WEST_TO_SE: ["eastDeadend", "cornerSW"],
	WEST_TO_SW: ["eastDeadend", "cornerNW"],
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

const SCALE = {
	MIN_WALLS: ["northWall", "eastWall", "southWall", "westWall", "open"],
	CLOSE_GAPS: ["northDeadend", "southDeadend", "eastDeadend", "westDeadend"]
};
