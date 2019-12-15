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
