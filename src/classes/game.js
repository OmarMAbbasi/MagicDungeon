import { throttle } from "lodash";

export default class Game {
	constructor(grid, floor) {
		this.grid = grid;
		this.floor = floor;
		this.bindKeys();
		this.charData = {
			square: this.grid[1][1],
			row: 1,
			col: 1
		};
		grid[1][1].className = "wizzard_f_idle_anim";
		// this.walkRight = this.walkRight.bind(this);
		this.throtRight = _.throttle(this.walkRight, 750);
		// this.throtRight = _.throttle(this.walkRight, 750);
	}

	walkRight() {
		let row = this.charData.row;
		let col = this.charData.col;
		let grid = this.grid;
		let charData = this.charData;

		grid[row][col].className = "slide-out-right";
		setTimeout(() => {
			grid[row][col].className = `${row}${col}`;
			grid[row][col + 1].className = "wizzard_f_idle_anim";

			debugger;
		}, 745);
		charData = {
			square: grid[row][col + 1],
			row: row,
			col: col + 1
		};
		debugger;
		this.charData = charData;
	}

	bindKeys() {
		document.addEventListener("keydown", e => {
			switch (e.keyCode) {
				case 68: // D
				case 39: // RightArrow
					this.throtRight();
				default:
					break;
			}
		});
	}

	// walkRight() {
	// 	console.log("hi");
	// 	let x = charData.x;
	// 	let y = charData.y;
	// 	// debugger;

	// 	gameBoard[x][y].className = "slide-out-right";

	// 	setTimeout(() => {
	// 		gameBoard[x][y].className = "nothing";
	// 		gameBoard[x][y + 1].className = "wizzard_f_idle_anim";
	// 		charData = {
	// 			char: gameBoard[x][y + 1],
	// 			x: x,
	// 			y: y + 1
	// 		};
	// 	}, 750);
}
