// import _ from "lodash";
import { floorBuilder } from './classes/util/floorUtils';
import { debounce, throttle } from 'lodash';
import Floor from './classes/floor';
import Game from './classes/game.js';

document.addEventListener('DOMContentLoaded', () => {
	const welcomeBox = document.createElement('div');
	document.body.appendChild(welcomeBox);
	welcomeBox.className = 'welcome-box';

	const welcomeScroll = document.createElement('div');
	welcomeBox.appendChild(welcomeScroll);
	welcomeScroll.className = 'welcome-scroll';

	const aboutBlurb = document.createElement('p');
	aboutBlurb.innerHTML =
		"Hi! Welcome to Magic Dungeon. My name is Omar and this project was something I built during my time at App Academy's Full Stack program. The goal of this project was to see how far I could push vanilla CSS Keyframe Animations and Javascript to create a game.";
	aboutBlurb.className = 'about-blurb';
	welcomeScroll.appendChild(aboutBlurb);

	const algoBlurb = document.createElement('p');
	algoBlurb.innerHTML =
		"What's going on behind the scenes is a weighted recursive backtracing algorithm. For the non-technical people reading this, it means that in practice, every time you try to traverse the maze, it will be different.";
	algoBlurb.className = 'about-blurb';
	welcomeScroll.appendChild(algoBlurb);

	const moveBlurb = document.createElement('p');
	moveBlurb.innerHTML = 'Movement: ';
	moveBlurb.className = 'about-blurb';
	welcomeScroll.appendChild(moveBlurb);

	const wasdPrompt = document.createElement('div');
	wasdPrompt.className = 'wasd-prompt';
	welcomeScroll.appendChild(wasdPrompt);

	const startButton = document.createElement('button');
	startButton.className = 'start-button';
	welcomeScroll.appendChild(startButton);
	startButton.innerHTML = 'START';
	startButton.addEventListener('click', () => document.body.removeChild(welcomeBox));

	let game = newGame();
	new Game(game);
});

function newGame() {
	const gameBox = document.createElement('div');
	gameBox.className = 'game-box';

	const room = document.createElement('div');
	room.className = 'static-room';
	gameBox.appendChild(room);

	const holder = document.createElement('div');
	holder.className = 'room-holder';
	room.appendChild(holder);

	let rowClass = 'row-';
	let colClass = 'col-';

	let gameBoard = [];

	for (let r = 1; r < 25; r++) {
		let row = document.createElement('div');
		row.className = rowClass + r;
		holder.appendChild(row);
		let currRow = [];
		for (let c = 1; c < 25; c++) {
			let col = document.createElement('div');
			col.className = colClass + c;
			row.appendChild(col);
			let box = document.createElement('div');
			box.className = ' ';
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
