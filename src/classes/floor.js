import { roomBuilder, floorBuilder } from "./util/floorUtils";
import random from "lodash";
import { connectNodes } from "./util/nodeUtils";

export default class Floor {
	constructor(size) {
		//*Default = 6 x 6
		//!rooms=[x,y]
		const fBuilder = floorBuilder;

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

		this.genEndpoints();
		this.setEndpoints();

		// const conNodes = connectNodes;
		// let startNode = this.fillNodes(start);

		// connectNodes(rooms, this.startRoom, this.bossRoom);
		console.log(this.rooms);
		console.log(this.bossRoom);
		console.log(this.startRoom);
	}

	//* Generates a start room and an end room in opposite quadrents
	genEndpoints() {
		let quad = _.random(1, 4);
		this.startRoom = Object.assign(this.startRoom, this.pickCord(quad)); //new Room (props)
		quad = this.bossRoom.quad;
		this.bossRoom = Object.assign(this.bossRoom, this.pickCord(quad));
		this.setBossExit();
	}

	setBossQuad(q) {
		this.bossRoom.quad = this.bossRoom.quad || q;
	}

	setBossExit() {
		let quad = this.bossRoom.quad;
		let layouts;
		switch (quad) {
			case 1:
				layouts = ["northDeadend", "westDeadend"];
				this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 2:
				layouts = ["northDeadend", "eastDeadend"];
				this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 3:
				layouts = ["southDeadend", "westDeadend"];
				this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			case 4:
				layouts = ["southDeadend", "eastDeadend"];
				this.bossRoom.layout = layouts[_.random(0, 1)];
				break;

			default:
				break;
		}
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
				this.setBossQuad(2);
			}
		}

		//! East
		else if (quad === 3 || quad === 4) {
			cords.x = _.random(3, 4);

			if (quad === 3) {
				cords.y = _.random(1, 2);
				this.setBossQuad(3);
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
		this.startRoom = Object.assign(start, this.startRoom);
		this.rooms[x][y] = this.startRoom;
		Object.assign(roomBuilder("open", "start"));

		x = this.bossRoom.cords.x;
		y = this.bossRoom.cords.y;

		let boss = this.rooms[x][y];
		this.bossRoom = Object.assign(boss, this.bossRoom);
		this.rooms[x][y] = this.bossRoom;

		this.rooms.forEach(row => {
			row.forEach(room => {
				console.log(room.type);
			});
		});
	}
}
