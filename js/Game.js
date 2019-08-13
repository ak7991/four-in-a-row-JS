class Game{
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;
	}

	//Initiate player array
	createPlayers() {
		const player1 = new Player('Player 1', 1, '#e15258', false);
		const player2 = new Player('Player 2', 2, '#e59a13', !player1.active);

		return [player1, player2];
	}

	//Get player with ready status as true
	get activePlayer(){
		return this.players.find(player => player.active);
	}

	//Initiate the game
	startGame() {
		//Render the board
		this.board.drawHTMLBoard();
		//Render active token
		this.activePlayer.activeToken.drawHTMLToken();
		//Game is now ready
		this.ready = true;
	}

	//End Game
    gameOver(message) {
    	console.log(message);
		$('#game-over').css('display', 'block');
        $('#game-over').append(`<p>${message}</p>`);
    }

	//Handle user key input
	handleKeydown(e) {
		console.log('column before: ' + this.activePlayer.activeToken.columnLocation);
		if(this.ready){
			if(e.key == 'ArrowLeft') {
				this.activePlayer.activeToken.moveLeft();
			}
			else if(e.key == 'ArrowRight') {
				this.activePlayer.activeToken.moveRight(this.board.columns);
			}
			else if(e.key == 'ArrowDown') {
				this.playToken();
			}
		}
		console.log('column after: ' + this.activePlayer.activeToken.columnLocation);
	}

	//Play the active token
	playToken() {
		let spaces = this.board.spaces;
		let activeToken = this.activePlayer.activeToken;
		let targetColumn = spaces[activeToken.columnLocation];
		let targetSpace = null;

		for(let space of targetColumn) {
			if(space.token == null){
				targetSpace = space;
				break;
			}
		}

		if(targetSpace !== null) {
			const game = this;
			game.ready = false;
			activeToken.drop(targetSpace, () => {
				game.updateGameState(activeToken, targetSpace);
			});
		}
	}


	//Check conditions for a player's win.
	checkForWin(target){
	    const owner = target.token.owner;
	    let win = false;

	    // vertical
	    for (let x = 0; x < this.board.columns; x++ ){
			for (let y = 0; y < this.board.rows - 3; y++){
				if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x][y+1].owner === owner && 
	                this.board.spaces[x][y+2].owner === owner && 
	                this.board.spaces[x][y+3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // horizontal
	    for (let x = 0; x < this.board.columns - 3; x++ ){
	        for (let y = 0; y < this.board.rows; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x+1][y].owner === owner && 
	                this.board.spaces[x+2][y].owner === owner && 
	                this.board.spaces[x+3][y].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // diagonal
	    for (let x = 3; x < this.board.columns; x++ ){
	        for (let y = 0; y < this.board.rows - 3; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x-1][y+1].owner === owner && 
	                this.board.spaces[x-2][y+2].owner === owner && 
	                this.board.spaces[x-3][y+3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

	    // diagonal
	    for (let x = 3; x < this.board.columns; x++ ){
	        for (let y = 3; y < this.board.rows; y++){
	            if (this.board.spaces[x][y].owner === owner && 
	                this.board.spaces[x-1][y-1].owner === owner && 
	                this.board.spaces[x-2][y-2].owner === owner && 
	                this.board.spaces[x-3][y-3].owner === owner) {
	                    win = true;
	            }           
	        }
	    }

		return win;
	}

	//Switches turn of players
	switchPlayers() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
    }
    

	/*
	 * Mark the space, check for win if no win, check for tokens if token left
	 * then draw the token.
	*/
	updateGameState(token, space) {
		space.mark(token); //Mark the space
		if(this.checkForWin(space)){
			this.gameOver('' + space.owner.name + ' has won');
		}
		else{
			this.switchPlayers();
			if(!this.activePlayer.unusedTokens) {
				this.gameOver('Tokens used up!');
			}
			else{
				this.activePlayer.activeToken.drawHTMLToken();
				this.ready = true;
			}
		}	
	}
}