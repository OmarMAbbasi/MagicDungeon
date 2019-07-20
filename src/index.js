// import _ from "lodash";
import { floorBuilder } from "./classes/util/floorUtils";
import Floor from "./classes/floor";

export function component() {
	const element = document.createElement("div");

	let fb = floorBuilder;

	let test = fb(6);
	let floor = new Floor(6);
	// element.innerHTML = test;
	$(document).keydown(function(event) {
		if (
			event.ctrlKey == true &&
			(event.which == "61" ||
				event.which == "107" ||
				event.which == "173" ||
				event.which == "109" ||
				event.which == "187" ||
				event.which == "189")
		) {
			event.preventDefault();
		}
		// 107 Num Key  +
		// 109 Num Key  -
		// 173 Min Key  hyphen/underscor Hey
		// 61 Plus key  +/= key
	});

	$(window).bind("mousewheel DOMMouseScroll", function(event) {
		if (event.ctrlKey == true) {
			event.preventDefault();
		}
	});

	return element;
}

document.body.appendChild(component());
