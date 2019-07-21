// import _ from "lodash";
import { floorBuilder } from "./classes/util/floorUtils";
import Floor from "./classes/floor";

export function component() {
	const gameBox = document.createElement("div");
	gameBox.className = "game-box";

	const room = document.createElement("div");
	room.className = "static-room";
	gameBox.appendChild(room);

	const holder = document.createElement("div");
	holder.className = "room-holder";
	room.appendChild(holder);

	// document.gameBox.appendChild(room);

	let rowClass = "row-";
	let colClass = "col-";

	for (let r = 1; r < 25; r++) {
		let row = document.createElement("div");
		row.className = rowClass + r;
		holder.appendChild(row);
		for (let c = 1; c < 25; c++) {
			let col = document.createElement("div");
			col.className = colClass + c;
			row.appendChild(col);
		}
	}
	// let row = 0;
	// let col = 0;

	// let fb = floorBuilder;

	// let test = fb(6);
	// let floor = new Floor(6);
	// element.innerHTML = test;

	return gameBox;
}

document.body.appendChild(component());
