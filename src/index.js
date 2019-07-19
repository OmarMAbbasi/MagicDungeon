// import _ from "lodash";
import { floorBuilder } from "./classes/util/floorUtils";
import Floor from "./classes/floor";

export function component() {
	const element = document.createElement("div");

	// Lodash, currently included via a script, is required for this line to work
	// debugger;
	let test = floorBuilder(6)
	let floor = new Floor(5);
	// element.innerHTML = test;

	return element;
}

document.body.appendChild(component());
