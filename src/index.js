// import _ from "lodash";
import { floorBuilder } from "./classes/util/floorUtils";
import { debounce, throttle } from "lodash";
import Floor from "./classes/floor";

document.addEventListener("DOMContentLoaded", () => {
	let grid = newGame();
	document.body.appendChild(grid);
	let floor = new Floor(6);
	const game = new Game(grid, floor);
});

function newGame() {
	const gameBox = document.createElement("div");
	gameBox.className = "game-box";

	const room = document.createElement("div");
	room.className = "static-room";
	gameBox.appendChild(room);

	const holder = document.createElement("div");
	holder.className = "room-holder";
	room.appendChild(holder);

	let rowClass = "row-";
	let colClass = "col-";

	let gameBoard = [];

	for (let r = 1; r < 25; r++) {
		let row = document.createElement("div");
		row.className = rowClass + r;
		holder.appendChild(row);
		let currRow = [];
		for (let c = 1; c < 25; c++) {
			let col = document.createElement("div");
			col.className = colClass + c;
			row.appendChild(col);
			let box = document.createElement("div");
			box.id = `${r}${c}`;
		}
		gameBoard.push(currRow);
	}

	gameBoard[1][1].className = "wizzard_f_idle_anim";

	// debugger;

	// let test = _.throttle(walkRight, 750);
	document.addEventListener("keypress", e => {
		debugger;
		switch (e.keyCode) {
			case 68:
				let throttle = _.throttle(walkRight, 750);
				throttle(gameBoard, charData);
				break;

			default:
				break;
		}
	});

	return gameBox;
}

function walkRight(gameBoard, charData) {
	let x = charData.x;
	let y = charData.y;
	debugger;

	gameBoard[x][y].className = "slide-out-right";

	setTimeout(() => {
		gameBoard[x][y].className = "nothing";
		gameBoard[x][y + 1].className = "wizzard_f_idle_anim";
		charData = {
			char: gameBoard[x][y + 1],
			x: x,
			y: y + 1
		};
	}, 750);
}
