import { floorBuilder } from './util/floorUtils';
import { random, sample, merge } from 'lodash';

export default class Floor {
	constructor(size) {
		//*Default = 6 x 6
		//!rooms=[x,y]
		const fBuilder = floorBuilder;

		this.rooms = fBuilder(size);

		//! will be assigned X: and Y: cords
		this.startRoom = {
			type: 'start',
			quad: 0,
			cords: {
				x: 0,
				y: 0
			}
		};

		//! will be assigned X: and Y: cords
		this.bossRoom = {
			quad: 0,
			cords: {
				x: 0,
				y: 0
			}
		};

		//!Loops until a satisfactory maze has been built

		this.genEndpoints();
		this.setEndpoints();

		let buildStack = [this.startRoom];

		function step(curr, rooms) {
			curr.visited = true;
			let currX = curr.cords.x;
			let currY = curr.cords.y;

			let north = null;
			let south = null;
			let east = null;
			let west = null;
			if (currY > 0) {
				north = rooms[currY - 1][currX];
			}
			if (currY < rooms.length - 1) {
				south = rooms[currY + 1][currX];
			}
			if (currX < rooms.length - 1) {
				east = rooms[currY][currX + 1];
			}
			if (currX > 0) {
				west = rooms[currY][currX - 1];
			}

			let validDirections = [];
			if (north && !!!north.visited) {
				validDirections.push('north');
			}
			if (south && !!!south.visited) {
				validDirections.push('south');
			}
			if (east && !!!east.visited) {
				validDirections.push('east');
			}
			if (west && !!!west.visited) {
				validDirections.push('west');
			}

			let nextDir = _.sample(validDirections);
			switch (nextDir) {
				case 'north':
					buildStack.push(north);
					north.walls.south = curr;
					curr.walls.north = north;
					break;
				case 'south':
					buildStack.push(south);
					south.walls.north = curr;
					curr.walls.south = south;
					break;
				case 'east':
					buildStack.push(east);
					east.walls.west = curr;
					curr.walls.east = east;
					break;
				case 'west':
					buildStack.push(west);
					west.walls.east = curr;
					curr.walls.west = west;
					break;
				default:
					buildStack.pop();
					return null;
			}
		}

		while (buildStack.length) {
			step(buildStack[buildStack.length - 1], this.rooms);
		}

		console.log(this.startRoom);
		console.log(this.bossRoom);

		this.currentRoom = this.startRoom;
		console.log(this.rooms);
		for (let y = 0; y < this.rooms.length; y++) {
			for (let x = 0; x < this.rooms.length; x++) {
				let curr = this.rooms[y][x];
				console.log(curr.type);
			}
		}
	}

	//* Generates a start room and an end room in opposite quadrents
	genEndpoints() {
		let quad = _.random(1, 4);
		this.startRoom = Object.assign(this.startRoom, this.pickCord(quad)); //new Room (props)
		quad = this.bossRoom.quad;
		this.bossRoom = Object.assign(this.bossRoom, this.pickCord(quad));
		this.setBossExit();

		let sY = this.startRoom.cords.y;
		let sX = this.startRoom.cords.x;

		let north = this.rooms[sY - 1][sX];
		// this.startRoom.walls.north = north;
		north.walls.south = this.startRoom;

		let south = this.rooms[sY + 1][sX];
		// this.startRoom.walls.south = south;
		south.walls.north = this.startRoom;

		let east = this.rooms[sY][sX + 1];
		// this.startRoom.walls.east = east;
		east.walls.west = this.startRoom;

		let west = this.rooms[sY][sX - 1];
		// this.startRoom.walls.west = west;
		west.walls.east = this.startRoom;

		this.startRoom.walls = {
			north: north,
			south: south,
			east: east,
			west: west
		};
	}

	setBossQuad(q) {
		this.bossRoom.quad = this.bossRoom.quad || q;
	}

	setCurrentRoom(room) {
		let view = document.getElementsByClassName('room-holder');
		this.currentRoom = room;
	}

	setBossExit() {
		let quad = this.bossRoom.quad;
		let layouts;
		switch (quad) {
			case 1:
				layouts = _.sample(['south', 'east']);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 2:
				layouts = _.sample(['south', 'west']);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;
			case 3:
				layouts = _.sample(['north', 'east']);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 4:
				layouts = _.sample(['north', 'west']);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;
			default:
				break;
		}

		this.bossRoom.walls = {
			north: 'wall',
			south: 'wall',
			east: 'wall',
			west: 'wall'
		};

		let bX = this.bossRoom.cords.x;
		let bY = this.bossRoom.cords.y;

		switch (layouts) {
			case 'north':
				let north = this.rooms[bY - 1][bX];
				this.bossRoom.walls.north = north;
				north.walls.south = this.bossRoom;
				break;
			case 'south':
				let south = this.rooms[bY + 1][bX];
				this.bossRoom.walls.south = south;
				south.walls.north = this.bossRoom;
				break;
			case 'east':
				let east = this.rooms[bY][bX + 1];
				this.bossRoom.walls.east = east;
				east.walls.west = this.bossRoom;
				break;
			case 'west':
				let west = this.rooms[bY][bX - 1];
				this.bossRoom.walls.west = west;
				west.walls.east = this.bossRoom;
				break;
			default:
				break;
		}

		// let layout = this.rBuilder(layouts, 'boss');
		// this.bossRoom = _.merge(layout, this.bossRoom);

		this.bossRoom.visited = true;
		this.bossRoom.type = 'boss';
	}

	//! Quadrents   1  2
	//!             3  4
	pickCord(quad) {
		let cords = {};
		//!West
		if (quad === 1 || quad === 2) {
			cords.x = _.random(1, 2);
			if (quad === 1) {
				cords.y = _.random(1, 2);
				this.setBossQuad(4);
			} else if (quad === 2) {
				cords.y = _.random(3, 4);
				this.setBossQuad(3);
			}
		}

		//! East
		else if (quad === 3 || quad === 4) {
			cords.x = _.random(3, 4);

			if (quad === 3) {
				cords.y = _.random(1, 2);
				this.setBossQuad(2);
			} else if (quad === 4) {
				cords.y = _.random(2, 3);
				this.setBossQuad(1);
			}
		}
		return { cords: cords, quad: quad };
	}

	setEndpoints() {
		let x = this.startRoom.cords.x;
		let y = this.startRoom.cords.y;

		let start = this.rooms[y][x];
		this.startRoom = _.merge(start, this.startRoom);
		this.rooms[y][x] = this.startRoom;
		// Object.assign(roomBuilder("open", "start"));

		x = this.bossRoom.cords.x;
		y = this.bossRoom.cords.y;

		let boss = this.rooms[y][x];
		this.bossRoom = _.merge(boss, this.bossRoom);
		this.rooms[y][x] = this.bossRoom;
	}
}
