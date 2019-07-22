// import _ from "lodash";
import { floorBuilder } from "./classes/util/floorUtils";
import { debounce, throttle } from "lodash";
import Floor from "./classes/floor";
import Game from "./classes/game.js";

document.addEventListener("DOMContentLoaded", () => {
	let game = newGame();
	new Game(game);
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
			box.className = " ";
			col.appendChild(box);
			currRow.push(box);
		}

		gameBoard.push(currRow);
	}
	let game = { grid: gameBoard, view: holder };

	// debugger;

	// let test = _.throttle(walkRight, 750);

	document.body.appendChild(gameBox);

	return game;
}
