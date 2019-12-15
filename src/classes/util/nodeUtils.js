import { roomBuilder } from './floorUtils';
import { sample, method, some, pull } from 'lodash';

const rBuilder = roomBuilder;

export const connectNodes = (rooms, curr, next) => {
	//! first curr == boss
	let buildQueue = [curr];
	let visited = [];
	//TODO UPDATE BUILD POOLS

	while (buildQueue.length > 0) {
		let currRoom = buildQueue.shift();
		visited.push(currRoom);
		let nextRoom;

		// debugger;

		// debugger;
	}
};

// const nodeGenerator = (rooms, curr) => {};

const sampleSet = (set, prev) => {
	let regex = /Deadend/i;
	let safe = set;
	if (prev.layout.match(regex)) {
		safe = set
			.map((pool) => {
				if (!pool.match(regex)) {
					return pool;
				}
			})
			.filter((ele) => ele);
	}

	let layout = _.sample(safe);
	return rBuilder(layout, 'built');
};

export const buildNorth = (room, prev) => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;
	prev = prev;
	if (x) {
		//!SOUTH > NORTH
		//!West
		switch (y) {
			case 0:
				//! NW_CORNER
				builtRoom = sampleSet(NORTH.NORTH_TO_NW, prev);
				break;
			case 5:
				//! NE_CORNER
				builtRoom = sampleSet(NORTH.NORTH_TO_NE, prev);
				break;
			default:
				//! North Wall
				builtRoom = sampleSet(NORTH.NORTH_WALL, prev);
				break;
		}
	} else {
		switch (y) {
			case 0:
				//!WestWall
				builtRoom = sampleSet(NORTH.NORTH_ALONG_WEST, prev);
				break;
			case 5:
				//!EastWall
				builtRoom = sampleSet(NORTH.NORTH_ALONG_EAST, prev);
				break;
			default:
				//!Pure
				builtRoom = sampleSet(NORTH.PURE_NORTH, prev);
				break;
		}
	}
	return builtRoom;
};

//* WORKING

export const buildSouth = (room, prev) => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;
	if (x === 5) {
		//!NORTH > SOUTH
		switch (y) {
			case 0:
				//! SW_CORNER
				builtRoom = sampleSet(SOUTH.SOUTH_TO_SW, prev);
				break;
			case 5:
				//! SE_CORNER
				builtRoom = sampleSet(SOUTH.SOUTH_TO_SE, prev);
				break;
			default:
				//! South Wall
				builtRoom = sampleSet(SOUTH.SOUTH_WALL, prev);
				break;
		}
	} else {
		switch (y) {
			case 0:
				//!WestWall
				builtRoom = sampleSet(SOUTH.SOUTH_ALONG_WEST, prev);
				break;
			case 5:
				//!EastWall
				builtRoom = sampleSet(SOUTH.SOUTH_ALONG_EAST, prev);

			default:
				//!Pure
				builtRoom = sampleSet(SOUTH.PURE_SOUTH, prev);
				break;
		}
	}
	return builtRoom;
};

export const buildWest = (room, prev) => {
	let x = room.cords.x;
	let y = room.cords.y;
	let builtRoom;

	//!EAST > WEST
	if (y === 5) {
		switch (x) {
			case 0:
				//! NW_CORNER
				builtRoom = sampleSet(WEST.WEST_TO_NW, prev);
				break;
			case 5:
				//! SW_CORNER
				builtRoom = sampleSet(WEST.WEST_TO_SW, prev);
				break;
			default:
				//! West Wall
				builtRoom = sampleSet(WEST.WEST_WALL, prev);
				break;
		}
	} else {
		switch (x) {
			case 0:
				//!South Wall
				builtRoom = sampleSet(WEST.WEST_ALONG_NORTH, prev);
				break;
			case 5:
				//!East Wall
				builtRoom = sampleSet(WEST.WEST_ALONG_SOUTH, prev);

			default:
				//!Pure
				builtRoom = sampleSet(WEST.PURE_WEST, prev);
				break;
		}
	}
	return builtRoom;
};

export const buildEast = (room, prev) => {
	let x = room.cords.x;
	let y = room.cords.y;

	let builtRoom;

	//!WEST>EAST
	if (y === 0) {
		switch (x) {
			case 0:
				//! NE_CORNER
				builtRoom = sampleSet(EAST.EAST_TO_NE, prev);
				break;
			case 5:
				//! SE_CORNER
				builtRoom = sampleSet(EAST.EAST_TO_SE, prev);
				break;
			default:
				//! EAST Wall
				builtRoom = sampleSet(EAST.EAST_WALL, prev);
				break;
		}
	} else {
		switch (x) {
			case 0:
				//!North Wall
				builtRoom = sampleSet(EAST.EAST_ALONG_NORTH, prev);
				break;
			case 5:
				//!South Wall
				builtRoom = sampleSet(EAST.EAST_ALONG_SOUTH, prev);

			default:
				//!Pure
				builtRoom = sampleSet(EAST.PURE_EAST, prev);
				break;
		}
	}
	return builtRoom;
};

//! ROOM POOLS: Separated by build direction.
//TODO get pools to export to another file.

//!!BUILD SOUTH>NORTH
export const NORTH = {
	NORTH_TO_NW: ['northDeadend', 'cornerNW'],
	NORTH_TO_NE: ['northDeadend', 'cornerNE'],
	NORTH_WALL: ['northDeadend', 'cornerNE', 'cornerNW', 'northWall'],
	NORTH_ALONG_WEST: ['northDeadend', 'cornerNW', 'westWall', 'verticalHallway'],
	NORTH_ALONG_EAST: ['northDeadend', 'cornerNE', 'eastWall', 'verticalHallway'],
	PURE_NORTH: ['northDeadend', 'cornerNE', 'cornerNW', 'verticalHallway', 'northWall', 'eastWall', 'westWall', 'open']
};

//!!BUILD NORTH>SOUTH
export const SOUTH = {
	SOUTH_TO_SW: ['southDeadend', 'cornerSW'],
	SOUTH_TO_SE: ['southDeadend', 'cornerSE'],
	SOUTH_WALL: ['southDeadend', 'cornerSE', 'cornerSW', 'southWall'],
	SOUTH_ALONG_WEST: ['southDeadend', 'cornerSW', 'westWall', 'verticalHallway'],
	SOUTH_ALONG_EAST: ['southDeadend', 'cornerSE', 'eastWall', 'verticalHallway'],
	PURE_SOUTH: ['southDeadend', 'cornerSW', 'cornerSE', 'verticalHallway', 'southWall', 'eastWall', 'westWall', 'open']
};
//!Build WEST > EAST
export const EAST = {
	EAST_TO_SE: ['eastDeadend', 'cornerSE'],
	EAST_TO_SW: ['eastDeadend', 'cornerSW'],
	EAST_WALL: ['eastDeadend', 'cornerSE', 'cornerSW', ' eastWall '],
	EAST_ALONG_NORTH: ['eastDeadend', 'cornerNE', 'northWall', 'horizontalHallway'],
	EAST_ALONG_SOUTH: ['eastDeadend', 'cornerSE', 'southWall', 'horizontalHallway'],
	PURE_EAST: ['eastDeadend', 'cornerSW', 'cornerNW', 'horizontalHallway', 'southWall', 'northWall', 'eastWall', 'open']
};
//! Build EAST>WEST
export const WEST = {
	WEST_TO_NW: ['westDeadend', 'cornerNW'],
	WEST_TO_SW: ['westDeadend', 'cornerSW'],
	WEST_WALL: ['westDeadend', 'cornerNW', 'cornerSW', 'westWall'],
	WEST_ALONG_NORTH: ['westDeadend', 'cornerNW', 'horizontalHallway', 'northWall'],
	WEST_ALONG_SOUTH: ['westDeadend', 'cornerSW', 'horizontalHallway', 'southWall'],
	PURE_WEST: ['westDeadend', 'cornerSW', 'cornerNW', 'horizontalHallway', 'southWall', 'northWall', 'westWall', 'open']
};

export const SCALE = {
	MIN_WALLS: ['northWall', 'eastWall', 'southWall', 'westWall', 'open'],
	CLOSE_GAPS: ['northDeadend', 'southDeadend', 'eastDeadend', 'westDeadend']
};
