import { roomBuilder, floorBuilder } from './util/floorUtils';
import { random, sample, merge } from 'lodash';
import { connectNodes } from './util/nodeUtils';

export default class Floor {
	constructor(size) {
		//*Default = 6 x 6
		//!rooms=[x,y]
		this.rBuilder = roomBuilder;
		const fBuilder = floorBuilder;
		const nodes = connectNodes;

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

		let curr;
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
				north = rooms[currX][currY - 1];
			}
			if (currY < rooms.length - 1) {
				south = rooms[currX][currY + 1];
			}
			if (currX < rooms.length - 1) {
				console.log(currX);
				east = rooms[currX + 1][currY];
			}
			if (currX > 0) {
				west = rooms[currX - 1][currY];
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
			if (!rooms) {
				return null;
			}
			let nextDir = _.sample(validDirections);
			switch (nextDir) {
				case 'north':
					buildStack.push(north);
					north.walls.south = 'door';
					curr.walls.north = 'door';
					break;
				case 'south':
					buildStack.push(south);
					south.walls.north = 'door';
					curr.walls.south = 'door';
					break;
				case 'east':
					buildStack.push(east);
					east.walls.west = 'door';
					curr.walls.east = 'door';
					break;
				case 'west':
					buildStack.push(west);
					west.walls.east = 'door';
					curr.walls.west = 'door';
					break;
				default:
					buildStack.pop();
					break;
			}
		}

		while (buildStack.length) {
			step(buildStack[buildStack.length - 1], this.rooms);
		}

		console.log(this.startRoom);
		console.log(this.bossRoom);

		this.currentRoom = this.startRoom;
		console.log(this.rooms);
	}

	//* Generates a start room and an end room in opposite quadrents
	genEndpoints() {
		let quad = _.random(1, 4);
		this.startRoom = Object.assign(this.startRoom, this.pickCord(quad)); //new Room (props)
		quad = this.bossRoom.quad;
		this.bossRoom = Object.assign(this.bossRoom, this.pickCord(quad));
		this.setBossExit();
		this.startRoom.walls = {
			north: 'door',
			south: 'door',
			east: 'door',
			west: 'door'
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

		switch (layouts) {
			case 'north':
				this.bossRoom.walls.north = 'door';
				break;
			case 'south':
				this.bossRoom.walls.south = 'door';
				break;
			case 'east':
				this.bossRoom.walls.east = 'door';
				break;
			case 'west':
				this.bossRoom.walls.west = 'door';
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

		let start = this.rooms[x][y];
		this.startRoom = _.merge(start, this.startRoom);
		this.rooms[x][y] = this.startRoom;
		// Object.assign(roomBuilder("open", "start"));

		x = this.bossRoom.cords.x;
		y = this.bossRoom.cords.y;

		let boss = this.rooms[x][y];
		this.bossRoom = _.merge(boss, this.bossRoom);
		this.rooms[x][y] = this.bossRoom;
	}
}
