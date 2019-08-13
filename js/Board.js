class Board {
	constructor() {
		this.rows = 6;
		this.columns = 7;
		this.spaces = this.createSpaces();
	}

	//Create spaces on the board
	createSpaces() {
		let spaces = [];
		let rows = this.rows; //6
		let columns = this.columns; //7

		// index i is x-coordinate for a space while j is the y coordinate
		for(let i = 0; i < columns; i++){
			//Row for spaces
			let column = []
			for(let j = 0; j < rows; j++){
				let space = new Space(i, j);
				column.push(space);
			}
			spaces.push(column);
		}
		
		return spaces;
	}

	//Renders spaces on the board
	drawHTMLBoard() {
        for (let column of this.spaces) {
            for (let space of column) {
                space.drawSVGSpace();
            }
        }
	}
}