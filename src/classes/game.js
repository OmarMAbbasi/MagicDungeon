import { throttle, debounce, random, delay } from 'lodash';
import Floor from './floor';
import Room from './rooms/room';

let TRANSITIONS_IN = ['scale-in-top', 'rotate-in-center', 'roll-in-blurred-left', 'swirl-in-fwd', 'puff-in-center'];

let TRANSITIONS_OUT = ['scale-out-top', 'rotate-out-center', 'roll-out-blurred', 'swirl-out-fwd', 'puff-out-center'];

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

		this.changingRooms = false;
		// view = document.getElementsByClassName("room-holder");

		// this.view.className = "room-holder";
		// this.view.classList.toggle("start-room");

		this.view = view;
		this.view.classList.add('start');
		// this.view.classList.add(this.floor.bossRoom.type);
		this.charPos = {
			square: this.grid[12][11],
			row: 12,
			col: 11
		};
		this.facing = 'right';

		this.grid[12][11].className = 'wiz';
		this.grid[12][11].classList.add('idle-right');

		this.throttledMove = _.throttle(this.move, 0);
		// this.throttledMove = _.throttle(this.move, 375);

		this.bouncedIdle = _.debounce(this.idle, 0);
		// this.bouncedIdle = _.debounce(this.idle, 375);
		// console.log(this.floor.bossRoom);
		// console.log(this.floor.startRoom);
		//!!Floor Management
	}

	checkRoomChange() {
		return this.changingRooms();
	}

	setCharPos(row, col) {
		this.charPos.square.classList.remove(...this.charPos.square.classList);
		this.charPos = {
			square: this.grid[row][col],
			row: row,
			col: col
		};
		this.facing = 'right';

		this.grid[row][col].className = 'wiz';
		this.grid[row][col].classList.add('idle-right');
		// this.changingRooms = false;
	}

	nextRoom(room, type) {
		this.changingRooms = true;
		let newRoom;
		let out = TRANSITIONS_OUT[_.random(5)];
		let back = TRANSITIONS_IN[_.random(5)];
		let oldRoom = this.grid[this.charPos.row][this.charPos.col];
		oldRoom.classList.remove(...oldRoom.classList);
		// debugger;
		let view = this.view;
		view.classList.add(out);

		if (room.walls) {
			switch (type) {
				case 'north':
					if (room.walls.north !== 'wall') {
						newRoom = room.walls.north;
						this.setCharPos(22, 12);
					}
					// this.setCharPos(22, 12);
					break;
				case 'south':
					if (room.walls.south !== 'wall') {
						newRoom = room.walls.south;
						this.setCharPos(1, 12);
					}
					break;
				case 'east':
					if (room.walls.east !== 'wall') {
						newRoom = room.walls.east;
						this.setCharPos(12, 1);
					}
					break;
				case 'west':
					if (room.walls.west !== 'wall') {
						newRoom = room.walls.west;
						this.setCharPos(12, 22);
					}
					break;
				default:
					break;
			}
		}
		if (this.changingRooms) {
			let view = this.view;
			setTimeout(() => {
				view.classList.remove(...view.classList);
				view.classList.add('room-holder');
				if (newRoom.type === 'start') {
					view.classList.add(newRoom.type);
				} else if (newRoom.type === 'boss') {
					view.classList.add(this.floor.bossRoom.layout);
				} else {
					view.classList.add(newRoom.layout);
				}
				view.classList.add(back);
				this.changingRooms = false;
			}, 120);
			this.floor.setCurrentRoom(newRoom);
		}
		console.log(this.floor.currentRoom);
	}

	checkNorthDoor(row, col, shift) {
		if (row > 1) {
			shift--;
		} else if (this.floor.currentRoom.walls.north !== 'wall' && (col === 12 || col === 11)) {
			if (row === 0) {
				console.log(this.changingRooms);
				console.log('north!');

				this.nextRoom(this.floor.currentRoom, 'north');
			} else {
				shift--;
			}
		}
		return shift;
	}
	checkSouthDoor(row, col, shift) {
		if (row < 22) {
			shift++;
		} else if (this.floor.currentRoom.walls.south !== 'wall' && (col === 12 || col === 11)) {
			if (row === 23) {
				this.nextRoom(this.floor.currentRoom, 'south');
			} else {
				shift++;
			}
		}
		return shift;
	}
	checkEastDoor(row, col, shift) {
		if (col < 22) {
			shift++;
		} else if (this.floor.currentRoom.walls.east !== 'wall' && (row === 12 || row === 11)) {
			if (col === 23) {
				this.nextRoom(this.floor.currentRoom, 'east');
			} else {
				shift++;
			}
		}
		return shift;
	}

	checkWestDoor(row, col, shift) {
		if (col > 1) {
			shift--;
		} else if (this.floor.currentRoom.walls.west !== 'wall' && (row === 12 || row === 11)) {
			if (col === 0) {
				this.nextRoom(this.floor.currentRoom, 'west');
			} else {
				shift--;
			}
		}
		return shift;
	}

	shift(row, col) {
		if (this.changingRooms) {
			return null;
		}
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
		if (this.changingRooms) {
			return null;
		}
		let { square } = this.charPos;
		let next = this.grid[row][col];
		let prev = this.charPos.square;
		if (this.changingRooms) {
			prev.classList.remove(...prev.classList);
			return null;
			// debugger;
		} else if (row > pRow) {
			this.moveDown(next, prev);
			prev.classList.remove(...prev.classList);
		} else if (pRow > row) {
			this.moveUp(next, prev);
			prev.classList.remove(...prev.classList);
		} else if (col > pCol) {
			this.moveRight(next, prev);
			prev.classList.remove(...prev.classList);
		} else if (pCol > col) {
			this.moveLeft(next, prev);
			prev.classList.remove(...prev.classList);
		} else {
			prev.classList.remove(...prev.classList);
			prev.classList.add('wiz');
			prev.classList.add('idle-' + this.facing);
		}

		if (Math.abs(this.charPos.row - row) > 10 || Math.abs(this.charPos.col - col) > 10) {
			return null;
		}

		Object.assign(this.charPos, { square: next, row: row, col: col });
	}

	move() {
		if (this.changingRooms) {
			return null;
		}
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
		square.classList.add('wiz');
		square.classList.add('idle-' + this.facing);
	}

	moveUp(next, prev) {
		let { square, row, col } = this.charPos;
		let currClass = 'up';
		if (this.keys.right) {
			currClass += '-right';
		} else if (this.keys.left) {
			currClass += '-left';
		}
		next.classList.remove(...next.classList);
		next.className = 'wiz';
		next.classList.add(currClass);
	}

	moveDown(next, prev) {
		let { square, row, col } = this.charPos;
		let currClass = 'down';
		if (this.keys.right) {
			currClass += '-right';
		} else if (this.keys.left) {
			currClass += '-left';
		}
		next.classList.remove(...next.classList);
		next.className = 'wiz';
		next.classList.add(currClass);
	}
	moveLeft(next, prev) {
		let { square, row, col } = this.charPos;
		next.classList.remove(...next.classList);
		next.className = 'wiz';
		next.classList.add('left');
	}
	moveRight(next, prev) {
		let { square, row, col } = this.charPos;
		next.classList.remove(...next.classList);
		next.className = 'wiz';
		next.classList.add('right');
	}

	bindKeys() {
		document.addEventListener('keydown', (e) => {
			// console.log(e.keyCode);
			if (this.changingRooms) {
				return null;
			}
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
					this.facing = 'left';
					this.keys.left = true;

					this.throttledMove();
					break;
				case 68: // D
				case 39:
					this.facing = 'right';

					this.keys.right = true;

					this.throttledMove();
					break;
				default:
					break;
			}
		});

		document.addEventListener('keyup', (e) => {
			// console.log(e.keyCode);
			if (this.changingRooms) {
				return null;
			}
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
