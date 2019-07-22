import { throttle, debounce } from "lodash";
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
	constructor(grid, floor) {
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

		this.charPos = {
			square: this.grid[12][11],
			row: 12,
			col: 11
		};
		this.facing = "right";

		this.grid[12][11].className = "wiz";
		this.grid[12][11].classList.add("idle-right");

		this.throttledMove = _.throttle(this.move, 750);

		this.bouncedIdle = _.debounce(this.idle, 750);

		//!!Floor Management
	}

	nextRoom(room) {
		this.floor.setCurrentRoom(room);
		debugger;
	}

	checkNorthDoor(row, col, shift) {
		if (row > 1) {
			shift--;
		} else if (
			this.floor.currentRoom.north !== "wall" &&
			(col === 12 || col === 11)
		) {
			if (row === 0) {
				this.nextRoom(this.floor.currentRoom);
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
				this.nextRoom(this.floor.currentRoom);
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
				this.nextRoom(this.floor.currentRoom);
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
				this.nextRoom(this.floor.currentRoom);
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
