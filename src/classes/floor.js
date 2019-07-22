import { roomBuilder, floorBuilder } from "./util/floorUtils";
import { random, sample, merge } from "lodash";
import { connectNodes } from "./util/nodeUtils";

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
			layout: "open",
			type: "start",
			found: false,
			quad: 0,
			cords: {
				x: 0,
				y: 0
			}
		};

		//! will be assigned X: and Y: cords
		this.bossRoom = {
			type: "boss",
			found: false,
			quad: 0,
			cords: {
				x: 0,
				y: 0
			}
		};

		//!Loops until a satisfactory maze has been built
		let done = true;
		while (done) {
			done = true;
			this.genEndpoints();
			this.setEndpoints();
			const conNodes = connectNodes;
			let found = true;
			if (i > 150) {
				done = false;
			}
			let i = 0;

			while (found || found !== "blocked") {
				found = true;
				this.rooms.forEach(row => {
					row.forEach(room => {
						found = conNodes(this.rooms, room, this.startRoom);
						i++;
					});
				});
				this.rooms.forEach(row => {
					row.forEach(room => {
						if (
							room.type !== "start" ||
							room.type !== "boss" ||
							room.type !== "built"
						)
							found = false;
					});
				});
				if (i > 500000) {
					break;
				} else {
					found = false;
				}
			}
			this.rooms.forEach(row => {
				row.forEach(room => {
					if (
						room.type !== "start" ||
						room.type !== "boss" ||
						room.type !== "built"
					)
						done = false;
				});
			});
			if (this.startRoom.type !== "start" || this.bossRoom.type !== "boss") {
				done = false;
			}
		}
		console.log(this.startRoom);
		console.log(this.bossRoom);
		this.cleanStart();

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
	}

	cleanStart() {
		let north = this.startRoom.north;
		north.south = this.startRoom;
		switch (north.layout) {
			case "horizontalHallway":
				north.layout = "northWall";
				break;
			case "cornerSE":
				north.layout = "eastWall";
				break;
			case "cornerSW":
				north.layout = "westWall";
				break;
			case "southWall":
				north.layout = "open";
				break;
			case "southDeadend":
				north.layout = "verticalHallway";
				break;
			case "eastDeadend":
				north.layout = "cornerNE";
				break;
			case "westDeadend":
				north.layout = "cornerNW";
				break;
			default:
				break;
		}

		let south = this.startRoom.south;
		south.north = this.startRoom;
		switch (south.layout) {
			case "horizontalHallway":
				south.layout = "southWall";
				break;
			case "cornerNE":
				south.layout = "eastWall";
				break;
			case "cornerNW":
				south.layout = "westWall";
				break;
			case "northWall":
				south.layout = "open";
				break;
			case "northDeadend":
				south.layout = "verticalHallway";
				break;
			case "eastDeadend":
				south.layout = "cornerSE";
				break;
			case "westDeadend":
				south.layout = "cornerSW";
				break;
			default:
				break;
		}

		let east = this.startRoom.east;
		east.west = this.startRoom;
		switch (east.layout) {
			case "vertical":
				east.layout = "eastWall";
				break;
			case "cornerNE":
				east.layout = "northWall";
				break;
			case "cornerSE":
				east.layout = "southWall";
				break;
			case "westWall":
				east.layout = "open";
				break;
			case "westDeadend":
				east.layout = "horizontalHighway";
				break;

			case "northDeadend":
				east.layout = "cornerNE";
				break;
			case "southDeadend":
				east.layout = "cornerSE";
				break;
			default:
				break;
		}

		let west = this.startRoom.west;
		west.east = this.startRoom;
		switch (west.layout) {
			case "vertical":
				west.layout = "westWall";
				break;
			case "cornerNW":
				west.layout = "northWall";
				break;
			case "cornerSW":
				west.layout = "southWall";
				break;
			case "eastWall":
				west.layout = "open";
				break;
			case "eastDeadend":
				west.layout = "horizontalHighway";
				break;
			case "northDeadend":
				west.layout = "cornerNE";
				break;
			case "southDeadend":
				west.layout = "cornerSW";
				break;
			default:
				break;
		}
	}

	setBossQuad(q) {
		this.bossRoom.quad = this.bossRoom.quad || q;
	}

	setCurrentRoom(room) {
		let view = document.getElementsByClassName("room-holder");

		this.currentRoom = room;
	}

	setBossExit() {
		let quad = this.bossRoom.quad;
		let layouts;
		switch (quad) {
			case 1:
				layouts = _.sample(["westDeadend", "westDeadend"]);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 2:
				layouts = _.sample(["northDeadend", "eastDeadend"]);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 3:
				layouts = _.sample(["southDeadend", "westDeadend"]);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 4:
				layouts = _.sample(["southDeadend", "eastDeadend"]);
				// this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			default:
				break;
		}
		let layout = this.rBuilder(layouts, "boss");
		this.bossRoom = _.merge(layout, this.bossRoom);
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
