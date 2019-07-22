import { throttle, debounce } from "lodash";
import Floor from "./floor";

export default class Game {
	constructor(grid, floor) {
		this.grid = grid;
		this.floor = new Floor(6);
		this.bindKeys();
		this.charPos = {
			square: this.grid[1][1],
			row: 1,
			col: 1
		};
		this.keys = {
			up: false,
			down: false,
			right: false,
			left: false
		};
		this.grid[1][1].className = "wiz";
		// this.walkRight = this.walkRight.bind(this);

		this.row = 0;
		this.col = 0;
		this.prev;
		// this.throtRight = _.throttle(this.walkRight, 750);
		this.resetHor = _.debounce(this.debHor, 750);
		this.resetVert = _.debounce(this.debVert, 750);
		this.throttledMoveRight = _.throttle(this.throttledMoveRight, 750);
		this.throttledMoveLeft = _.throttle(this.throttledMoveLeft, 750);
		this.throttledMoveDown = _.throttle(this.throttledMoveDown, 750);
		this.throttledMoveUp = _.throttle(this.throttledMoveUp, 750);
		this.bounce = _.throttle(this.debtest, 750);
		this.idle = _.debounce(this.resetAnimation, 750);
		// this.throtRight = _.throttle(this.walkRight, 750);
	}

	throttledMoveRight() {
		this.keys.right = true;

		if (this.col !== 1) {
			this.col = 1;
		}
	}

	throttledMoveLeft() {
		this.keys.left = true;

		if (this.col !== -1) {
			this.col = -1;
		}
	}

	throttledMoveDown() {
		this.keys.down = true;

		if (this.row !== 1) {
			this.row = 1;
		}
	}

	throttledMoveUp() {
		this.keys.up = true;

		if (this.row !== -1) {
			this.row = -1;
		}
	}

	resetAnimation() {
		let [square, row, col] = Object.values(this.charPos);
		this.charPos.square.className = "wiz";
	}
	// debtest() {
	// 	let [square, row, col] = Object.values(this.charPos);
	// 	let pRow = row;
	// 	let pCol = col;
	// 	row += this.row;
	// 	col += this.col;
	// 	let next = this.grid[row][col];
	// 	let prev = this.charPos.square;
	// 	next.classList.add("wiz");
	// 	if (pCol < col) {
	// 		next.classList.add("right");
	// 	} else if (pCol > col) {
	// 		next.classList.add("left");
	// 	}
	// 	prev.className = "square";
	// 	this.idle();
	// 	Object.assign(this.charPos, { row: row, col: col, square: next });
	// }

	debHor(key) {
		this.col = 0;
	}

	debVert(key) {
		this.row = 0;
	}

	debtest() {
		let [square, row, col] = Object.values(this.charPos);
		let pRow = row;
		let pCol = col;
		row += this.row;
		col += this.col;
		let next = this.grid[row][col];
		let prev = this.charPos.square;

		next.classList.add("wiz");
		if (pCol < col) {
			next.classList.add("right");
		} else if (pCol > col) {
			next.classList.add("left");
		}
		prev.className = "square";
		this.idle();
		Object.assign(this.charPos, { row: row, col: col, square: next });
	}

	bindKeys() {
		document.addEventListener("keydown", e => {
			debugger;

			// console.log(e.keyCode);
			switch (e.keyCode) {
				case 87: // W
				case 38:
					this.throttledMoveUp();
					this.bounce();
					break;
				case 83: // S
				case 40:
					this.throttledMoveDown();
					this.bounce();
					break;
				case 65: // A
				case 37:
					this.throttledMoveLeft();
					this.bounce();
					break;
				case 68: // D
				case 39:
					this.throttledMoveRight();
					this.bounce();
					break;
				default:
					break;
			}
		});
		document.addEventListener("keyup", e => {
			debugger;
			// console.log(e.keyCode);
			switch (e.keyCode) {
				case 87: // W
				case 38:
					this.resetVert();

					break;
				case 83: // S
				case 40:
					this.resetVert();

					break;
				case 65: // A
				case 37:
					this.resetHor();
					break;
				case 68: // D
				case 39:
					this.resetHor();
					break;
				default:
					break;
			}
		});
	}
}
