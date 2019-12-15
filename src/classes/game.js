import { throttle, debounce, random, delay } from "lodash";
import Floor from "./floor";
import Room from "./rooms/room";

let TRANSITIONS_IN = [
	"scale-in-top",
	"rotate-in-center",
	"roll-in-blurred-left",
	"swirl-in-fwd",
	"puff-in-center"
];

let TRANSITIONS_OUT = [
	"scale-out-top",
	"rotate-out-center",
	"roll-out-blurred",
	"swirl-out-fwd",
	"puff-out-center"
];

export default class Game {
	constructor({ grid, view }, floor) {
		this.grid = grid;
		this.floor = new Floor(6);

		//!!Player Management
		//TODO Move logic to player class after building spells
		this.bindKeys = this.bindKeys.bind(this);
		this.bindKeys();
		this.keys = {
			up: false,
			down: false,
			right: false,
			left: false
		};

		// view = document.getElementsByClassName("room-holder");

		// this.view.className = "room-holder";
		// this.view.classList.toggle("start-room");
		this.view = view;
		this.view.classList.add("start");
		this.charPos = {
			square: this.grid[12][11],
			row: 12,
			col: 11
		};
		this.facing = "right";

		this.grid[12][11].className = "wiz";
		this.grid[12][11].classList.add("idle-right");

		this.throttledMove = _.throttle(this.move, 751);

		this.bouncedIdle = _.debounce(this.idle, 751);

		//!!Floor Management
	}

	setCharPos(row, col) {
		this.charPos.square.classList.remove(...this.charPos.square.classList);
		this.charPos = {
			square: this.grid[row][col],
			row: row,
			col: col
		};
		this.grid[row][col].className = "wiz";
		this.grid[row][col].classList.add("idle-right");
	}

	nextRoom(room, type) {
		let newRoom;

		let out = TRANSITIONS_OUT[_.random(5)];
		let back = TRANSITIONS_IN[_.random(5)];
		this.view.classList.add(out);
		switch (type) {
			case "north":
				newRoom = room.north;
				this.setCharPos(12, 21);
				break;
			case "south":
				newRoom = room.south;
				this.setCharPos(12, 2);

				break;
			case "east":
				newRoom = room.east;
				this.setCharPos(12, 21);

				break;
			case "west":
				newRoom = room.west;
				this.setCharPos(12, 2);

				break;
			default:
				break;
		}
		let view = this.view;
		setTimeout(() => {
			view.classList.remove(...view.classList);
			view.classList.add("room-holder");
			if (newRoom.type === "boss" || newRoom.type === "start") {
				view.classList.add(newRoom.type);
			} else {
				view.classList.add(newRoom.layout);
			}
			view.classList.add(back);
		}, 1200);

		this.floor.setCurrentRoom(newRoom);
	}

	checkNorthDoor(row, col, shift) {
		if (row > 1) {
			shift--;
		} else if (
			this.floor.currentRoom.north !== "wall" &&
			(col === 12 || col === 11)
		) {
			if (row === 0) {
				this.nextRoom(this.floor.currentRoom, "north");
			} else {
				shift--;
			}
		}
		return shift;
	}
	checkSouthDoor(row, col, shift) {
		if (row < 22) {
			shift++;
		} else if (
			this.floor.currentRoom.south !== "wall" &&
			(col === 12 || col === 11)
		) {
			if (row === 23) {
				this.nextRoom(this.floor.currentRoom, "south");
			} else {
				shift++;
			}
		}
		return shift;
	}
	checkEastDoor(row, col, shift) {
		if (col < 22) {
			shift++;
		} else if (
			this.floor.currentRoom.east !== "wall" &&
			(row === 12 || row === 11)
		) {
			if (col === 23) {
				this.nextRoom(this.floor.currentRoom, "east");
			} else {
				shift++;
			}
		}
		return shift;
	}

	checkWestDoor(row, col, shift) {
		if (col > 1) {
			shift--;
		} else if (
			this.floor.currentRoom.west !== "wall" &&
			(row === 12 || row === 11)
		) {
			if (col === 0) {
				this.nextRoom(this.floor.currentRoom, "west");
			} else {
				shift--;
			}
		}
		return shift;
	}

	shift(row, col) {
		let hShift = 0;
		let vShift = 0;
		if (this.keys.up) {
			vShift = this.checkNorthDoor(row, col, vShift);
		}
		if (this.keys.down) {
			vShift = this.checkSouthDoor(row, col, vShift);
		}
		if (this.keys.left) {
			hShift = this.checkWestDoor(row, col, hShift);
		}
		if (this.keys.right) {
			hShift = this.checkEastDoor(row, col, hShift);
		}
		row += vShift;
		col += hShift;
		return [row, col];
	}

	step(row, pRow, col, pCol) {
		let { square } = this.charPos;
		let next = this.grid[row][col];
		let prev = this.charPos.square;
		prev.classList.remove(...prev.classList);

		if (row > pRow) {
			this.moveDown(next, prev);
		} else if (pRow > row) {
			this.moveUp(next, prev);
		} else if (col > pCol) {
			this.moveRight(next, prev);
		} else if (pCol > col) {
			this.moveLeft(next, prev);
		} else {
			prev.classList.remove(...prev.classList);
			prev.classList.add("wiz");
			prev.classList.add("idle-" + this.facing);
		}
		Object.assign(this.charPos, { square: next, row: row, col: col });
	}

	move() {
		this.bouncedIdle();
		let { square, row, col } = this.charPos;
		let prev = square;
		let pRow = row;
		let pCol = col;
		[row, col] = this.shift(row, col);
		// next.className = "wiz";
		this.step(row, pRow, col, pCol);
	}

	idle() {
		let { square, row, col } = this.charPos;
		square.classList.remove(...square.classList);
		square.classList.add("wiz");
		square.classList.add("idle-" + this.facing);
	}

	moveUp(next, prev) {
		let { square, row, col } = this.charPos;
		let currClass = "up";
		if (this.keys.right) {
			currClass += "-right";
		} else if (this.keys.left) {
			currClass += "-left";
		}
		next.classList.remove(...next.classList);
		next.className = "wiz";
		next.classList.add(currClass);
	}
	
	moveDown(next, prev) {
		let { square, row, col } = this.charPos;
		let currClass = "down";
		if (this.keys.right) {
			currClass += "-right";
		} else if (this.keys.left) {
			currClass += "-left";
		}
		next.classList.remove(...next.classList);
		next.className = "wiz";
		next.classList.add(currClass);
	}
	moveLeft(next, prev) {
		let { square, row, col } = this.charPos;
		next.classList.remove(...next.classList);
		next.className = "wiz";
		next.classList.add("left");
	}
	moveRight(next, prev) {
		let { square, row, col } = this.charPos;
		next.classList.remove(...next.classList);
		next.className = "wiz";
		next.classList.add("right");
	}

	bindKeys() {
		document.addEventListener("keydown", e => {
			// console.log(e.keyCode);
			switch (e.keyCode) {
				case 87: // W
				case 38:
					this.keys.up = true;
					this.throttledMove();
					break;
				case 83: // S
				case 40:
					this.keys.down = true;
					this.throttledMove();
					break;
				case 65: // A
				case 37:
					this.facing = "left";
					this.keys.left = true;

					this.throttledMove();
					break;
				case 68: // D
				case 39:
					this.facing = "right";

					this.keys.right = true;

					this.throttledMove();
					break;
				default:
					break;
			}
		});

		document.addEventListener("keyup", e => {
			// console.log(e.keyCode);
			switch (e.keyCode) {
				case 87: // W
				case 38:
					// this.bouncedIdle();

					this.keys.up = false;
					break;
				case 83: // S
				case 40:
					// this.bouncedIdle();

					this.keys.down = false;
					break;
				case 65: // A
				case 37:
					// this.bouncedIdle();

					this.keys.left = false;
					break;
				case 68: // D
				case 39:
					// this.bouncedIdle();

					this.keys.right = false;
					break;
				default:
					break;
			}
		});
	}
}
