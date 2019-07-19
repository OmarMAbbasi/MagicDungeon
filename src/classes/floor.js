import { roomBuilder, floorBuilder } from "./util/floorUtils";
import random from "lodash";

export default class Floor {
	constructor(size) {
		//*Default = 6 x 6
		debugger;
		//!rooms=[x,y]
		this.rooms = floorBuilder(size);

		//! will be assigned X: and Y: cords
		this.startRoom = {
			layout: "open"
		};

		//! will be assigned X: and Y: cords
		this.bossRoom = {
			type: "boss"
		};

		this.genEndpoints();
		this.setEndpoints();
		
		let startNode =
		this.fillNodes(start);
		console.log(this.rooms);

		console.log(this.bossRoom);
		console.log(this.startRoom);
	}

	scaffoldRooms(rooms, this.startNode, this.bossNode)
	

	//* Generates a start room and an end room in opposite quadrents
	genEndpoints() {
		let quad = _.random(1, 4);
		Object.assign(this.startRoom, this.pickCord(quad)); //new Room (props)
		quad = this.bossRoom.quad;
		this.bossRoom = this.pickCord(quad);
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
		let cord = {
			quad: quad
		};
		//!West
		if (quad === 1 || quad === 2) {
			cord.x = _.random(1, 2);
			if (quad === 1) {
				cord.y = _.random(1, 2);
				this.setBossQuad(4);
			} else if (quad === 2) {
				cord.y = _.random(3, 4);
				this.setBossQuad(2);
			}
		}

		//! East
		else if (quad === 3 || quad === 4) {
			cord.x = _.random(3, 4);

			if (quad === 3) {
				cord.y = _.random(1, 2);
				this.setBossQuad(3);
			} else if (quad === 4) {
				cord.y = _.random(2, 3);
				this.setBossQuad(1);
			}
		}
		return cord;
	}

	setEndpoints() {
		let x = this.startRoom.x;
		let y = this.startRoom.y;
		this.startRoom.cords = { x, y };
		this.rooms[x][y] = roomBuilder("open", "start");
		this.startRoom.node = {}
		x = this.bossRoom.x;
		y = this.bossRoom.y;
		this.bossRoom.cords = { x, y };
		this.rooms[x][y] = roomBuilder(this.bossRoom.layout, "boss");
	}
}
