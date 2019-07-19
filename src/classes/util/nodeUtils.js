import { roomBuilder } from "./floorUtils";
import sample from "lodash";

export const connectBossToStart = (rooms, curr) => {
	//! first curr == boss
	let x = curr.cords.x;
	let y = curr.cords.y;

	let connected = false;

	let currRoom = rooms[x][y];
	if (currRoom.type === "start") {
		return true;
	}

	let nextRoom;

	if (currRoom.north !== "wall") {
		nextRoom = rooms[x][y - 1];
		if (nextRoom.type !== "unbuilt") {
			nextRoom = buildNorth(rooms, currRoom);
			currRoom.north = nextRoom;
			nextRoom.south = currRoom;
		}
	}
};

// const nodeGenerator = (rooms, curr) => {};

export const buildNorth = prev => {
	let x = prev.cords.x;
	let y = prev.cords.y;
	x = nextRoom.cords.x;
	y = nextRoom.cords.y;
	switch (x) {
		//!North
		case 0:
			//!West
			switch (y) {
				case 0:
					//! NW_Wall
					break;
				case 5:
					//! NE_Wall
					break;
				default:
					//! North Wall
					break;
			}
			break;
		//! South
		case 5:
			//!West
			switch (y) {
				case 0:
					//! SW_Wall
					break;
				case 5:
					//! SE_Wall
					break;
				default:
					//! South Wall
					break;
			}
			break;
		default:
			switch (y) {
				case 0:
					//!WestWall
					break;
				case 5:
				//!EastWall
				default:
					//!Pure
					break;
			}
			break;
	}

	if (x === 0) {
		switch (y) {
			case 0:
				//! NW WALL
				break;
			default:
				break;
		}
		//West WALL
	}
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

//!!BUILD NORTH ^
NORTH_TO_NW = ["northDeadend", "cornerNW"];
NORTH_TO_NE = ["northDeadend", "cornerNE"];
NORTH_WALL = ["northDeadend", "cornerNE", "cornerNW", "northWall"];
NORTH_ALONG_WEST = ["northDeadend", "cornerNE", "cornerNW", "westWall"];
NORTH_ALONG_EAST = ["northDeadend", "cornerNE", "cornerNW", "eastWall"];
PURE_NORTH = [
	"deadendNorth",
	"cornerNE",
	"cornerNW",
	"verticalHallway",
	"northWall",
	"eastWall",
	"westWall",
	"open"
];

//!!BUILD SOUTH v
SOUTH_TO_SW = ["southDeadend", "cornerSW"];
SOUTH_TO_SE = ["southDeadend", "cornerSE"];
SOUTH_WALL = ["southDeadend", "cornerSE", "cornerSW", "southWall"];
SOUTH_ALONG_WEST = ["southDeadend", "cornerNE", "cornerNW", "westWall"];
SOUTH_ALONG_EAST = ["southDeadend", "cornerNE", "cornerNW", "eastWall"];
PURE_SOUTH = [
	"southDeadend",
	"cornerSW",
	"cornerSE",
	"verticalHallway",
	"southWall",
	"eastWall",
	"westWall",
	"open"
];

//!Build East >
EAST_TO_SE = ["westDeadend", "cornerSW"];
EAST_TO_SW = ["westDeadend", "cornerNW"];
EAST_WALL = ["westDeadend", "cornerSE", "cornerSW", " eastWall "];
EAST_ALONG_NORTH = ["westDeadend", "cornerNE", "cornerNW", "northWall"];
EAST_ALONG_SOUTH = ["westDeadend", "cornerNE", "cornerNW", "southWall"];
PURE_EAST = [
	"southDeadend",
	"cornerSW",
	"cornerNW",
	"horizontalHallway",
	"southWall",
	"northWall",
	"eastWall",
	"open"
];

//! Build West <
WEST_TO_SE = ["eastDeadend", "cornerSW"];
WEST_TO_SW = ["eastDeadend", "cornerNW"];
WEST_WALL = ["westDeadend", "cornerSE", "cornerSW", "westWall "];
WEST_ALONG_NORTH = ["westDeadend", "cornerNE", "cornerNW", "northWall"];
WEST_ALONG_SOUTH = ["westDeadend", "cornerNE", "cornerNW", "southWall"];
PURE_WEST = [
	"southDeadend",
	"cornerSW",
	"cornerNW",
	"horizontalHallway",
	"southWall",
	"northWall",
	"westWall",
	"open"
];
