import { throttle, debounce } from "lodash";
import Floor from "./floor";

export default class Game {
	constructor(grid, floor) {
		this.grid = grid;
		this.floor = new Floor(6);
		this.bindKeys = this.bindKeys.bind(this);
		this.bindKeys();
		this.keys = {
			up: false,
			down: false,
			right: false,
			left: false
		};

		this.grid[5][6].className = "wiz";
		this.grid[5][6].classList.add("idle-right");
		this.charPos = {
			square: this.grid[5][5],
			row: 5,
			col: 5
		};
		this.facing = "right";

		this.grid[5][5].className = "wiz";
		this.grid[5][5].classList.add("idle-left");

		this.grid[5][7].className = "wiz";
		this.grid[5][7].classList.add("right");

		this.grid[5][4].className = "wiz";
		this.grid[5][4].classList.add("left");

		this.grid[6][6].className = "wiz";
		this.grid[6][6].classList.add("down");

		this.grid[4][6].className = "wiz";
		this.grid[4][6].classList.add("up");

		this.grid[4][7].className = "wiz";
		this.grid[4][7].classList.add("up-right");

		this.grid[4][4].className = "wiz";
		this.grid[4][4].classList.add("up-left");

		this.grid[6][7].className = "wiz";
		this.grid[6][7].classList.add("down-right");

		this.grid[6][4].className = "wiz";
		this.grid[6][4].classList.add("down-left");

		// this.grid[4][4].className = "wiz";
		// this.grid[4][4].classList.add("down-left");

		this.throttledMove = _.throttle(this.move, 750);

		// this.throttledMoveUp = _.throttle(this.moveUp, 750);
		// this.throttledMoveDown = _.throttle(this.moveDown, 750);
		// this.throttledMoveLeft = _.throttle(this.moveLeft, 750);
		// this.throttledMoveRight = _.throttle(this.moveRight, 750);
		this.bouncedIdle = _.debounce(this.idle, 750);
		// this.throtRight = _.throttle(this.walkRight, 750);

		// this.start();
	}

	start() {
		requestAnimationFrame(this.throttledMove.bind(this));
	}

	move() {
		this.bouncedIdle();
		let { square, row, col } = this.charPos;
		let prev = square;
		let pRow = row;
		let pCol = col;
		let hShift = 0;
		let vShift = 0;
		let currClass = "";
		if (this.keys.up) {
			vShift--;
		}
		if (this.keys.down) {
			vShift++;
		}
		if (this.keys.left) {
			hShift--;
		}
		if (this.keys.right) {
			hShift++;
		}
		row += vShift;
		col += hShift;
		let next = this.grid[row][col];
		prev.classList.remove(...prev.classList);
		// next.className = "wiz";
		if (row > pRow) {
			this.moveDown(next, prev);
		} else if (pRow > row) {
			this.moveUp(next, prev);
		} else if (col > pCol) {
			this.moveRight(next, prev);
		} else if (pCol > col) {
			this.moveLeft(next, prev);
		} else {
			square.classList.remove(...square.classList);
			square.classList.add("wiz");
			square.classList.add("idle-" + this.facing);
		}
		Object.assign(this.charPos, { square: next, row: row, col: col });
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
			debugger;
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
