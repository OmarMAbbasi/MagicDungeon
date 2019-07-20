// import _ from "lodash";
import { floorBuilder } from "./classes/util/floorUtils";
import Floor from "./classes/floor";

export function component() {
	const element = document.createElement("div");

	let fb = floorBuilder;
	
	let test = fb(6);
	let floor = new Floor(6);
	// element.innerHTML = test;

	return element;
}

document.body.appendChild(component());
