import fill from 'lodash/fill';
import times from 'lodash/times';
import Room from '../rooms/room';
//builds out 2D array of room nodes based on size

//TODO Modularize floorBuilder
export const floorBuilder = (size) => {
	let floor = [];

	for (let y = 0; y < size; y++) {
		let row = [];
		for (let x = 0; x < size; x++) {
			row.push(new Room(x, y));
		}
		floor.push(row);
	}

	return floor;
};
//TODO Write function to send info from room class
//Randomly selects room type and generates room node from case "switch".
export const roomBuilder = (layout, type) => {
	let base = {};
	type = type || 'unbuilt';
	switch (layout) {
		case 'cornerNW':
			base = {
				north: 'wall',
				west: 'wall'
			};
			break;
		case 'cornerNE':
			base = {
				north: 'wall',
				east: 'wall'
			};
			break;
		case 'cornerSW':
			base = {
				south: 'wall',
				west: 'wall'
			};
			break;
		case 'cornerSE':
			base = {
				south: 'wall',
				east: 'wall'
			};
			break;
		case 'northWall':
			base = {
				north: 'wall'
			};
			break;

		case 'southWall':
			base = {
				south: 'wall'
			};
			break;
		case 'eastWall':
			base = {
				east: 'wall'
			};
			break;
		case 'westWall':
			base = {
				west: 'wall'
			};
			break;
		case 'verticalHallway':
			base = {
				east: 'wall',
				west: 'wall'
			};
			break;
		case 'horizontalHallway':
			base = {
				north: 'wall',
				south: 'wall'
			};
			break;
		case 'northDeadend':
			base = {
				north: 'wall',
				east: 'wall',
				west: 'wall'
			};
			break;
		case 'westDeadend':
			base = {
				north: 'wall',
				south: 'wall',
				east: 'wall'
			};
			break;
		case 'southDeadend':
			base = {
				south: 'wall',
				east: 'wall',
				west: 'wall'
			};
			break;
		case 'eastDeadend':
			base = {
				north: 'wall',
				south: 'wall',
				west: 'wall'
			};
			break;
		default:
			break;
	}
	return new Room(base, layout, type);
};
