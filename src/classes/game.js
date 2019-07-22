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
		this.lastKey = "right";
		this.grid[1][1].className = "wiz";
		this.grid[1][1].classList.add("idle-right");

		this.grid[10][10].classList.add("wiz");
		this.grid[10][10].classList.add("left");
		this.grid[10][10].classList.add("idle-left");

		// this.walkRight = this.walkRight.bind(this);

		this.row = 0;
		this.col = 0;
		this.prev;
		// this.throtRight = _.throttle(this.walkRight, 750);
		this.resetHor = this.debHor.bind(this);
		this.resetVert = this.debHor.bind(this);

		// this.resetHor = _.debounce(this.debHor, 750);
		// this.resetVert = _.debounce(this.debHor, 750);
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
		this.bounce();
	}

	throttledMoveLeft() {
		this.keys.left = true;

		if (this.col !== -1) {
			this.col = -1;
		}
		this.bounce();
	}

	throttledMoveDown() {
		this.keys.down = true;

		if (this.row !== 1) {
			this.row = 1;
		}
		this.bounce();
	}

	throttledMoveUp() {
		this.keys.up = true;

		if (this.row !== -1) {
			this.row = -1;
		}
		this.bounce();
	}

	resetAnimation() {
		let [square, row, col] = Object.values(this.charPos);
		if (this.lastKey === "left") {
			square.classList.remove(...square.classList);
			square.classList.add("wiz");
			square.classList.add("idle-left");
		} else if (this.lastKey === "right") {
			square.classList.remove(...square.classList);
			square.classList.add("wiz");
			square.classList.add("idle-right");
		}
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
		if (key === "left") {
			this.lastKey = "left";
			this.lastKey = "left";
		}
		if (key === "right") {
			this.lastKey = "right";
		}
		this.col = 0;
	}

	debVert(key) {
		this.row = 0;
	}

	debtest() {
		debugger;
		this.idle();
		let [square, row, col] = Object.values(this.charPos);
		let pRow = row;
		let pCol = col;
		row += this.row;
		col += this.col;
		let next = this.grid[row][col];
		let prev = this.charPos.square;
		prev.classList.remove(...prev.classList);

		if (pCol < col) {
			next.classList.remove(...next.classList);
			next.className = "wiz";
			next.classList.add("right");
		} else if (pCol > col) {
			next.classList.remove(...next.classList);
			next.className = "wiz";
			next.classList.add("left");
		} else {
			next.classList.remove(...next.classList);
			next.className = "wiz";

			next.classList.add("right");
		}
		Object.assign(this.charPos, { row: row, col: col, square: next });
	}

	bindKeys() {
		document.addEventListener("keydown", e => {
			// console.log(e.keyCode);
			switch (e.keyCode) {
				case 87: // W
				case 38:
					this.throttledMoveUp();
					break;
				case 83: // S
				case 40:
					this.throttledMoveDown();
					break;
				case 65: // A
				case 37:
					this.throttledMoveLeft();
					break;
				case 68: // D
				case 39:
					this.throttledMoveRight();
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
					this.bounce.cancel();
					this.resetVert();

					break;
				case 83: // S
				case 40:
					this.bounce.cancel();
					this.resetVert();

					break;
				case 65: // A
				case 37:
					this.bounce.cancel();
					this.resetHor("left");

					break;
				case 68: // D
				case 39:
					this.bounce.cancel();
					this.resetHor("right");

					break;
				default:
					break;
			}
		});
	}
}
