
NORTH_EDGE
SOUTH_EDGE
EAST_EDGE


export const scaffoldRooms(rooms, start) {
    let startCords = startRoom.cords
    let x = startCords.x
    let y = startCords.y
    start.north = rooms[x][y-1],
    start.south = rooms[x][y+1],
    start.east = rooms[x+1][y],
    start.west = rooms[x-1][y],
    debugger;
}

export const buildNorth = (prevRoom, ) => {
	walls = {
		south: prevRoom
	};
};
export const buildSouth = prevRoom => {
	walls = {
		north: prevRoom
	};
};
export const buildEast = prevRoom => {
	walls = {
		west: prevRoom
	};
};
export const buildWest = prevRoom => {
	walls = {
		east: prevRoom
	};
};
