class Token {
	constructor(index, owner) {
		this.owner = owner;
		this.id = `token-${index}-${owner.id}`;
		this.dropped = false;
		this.columnLocation = 0; //Left'est' column by default
	}

	drawHTMLToken() {
		const $token = $('<div></div>')
		$token.attr('id', this.id);
		$token.addClass('token');
		$token.css('background-color', this.owner.color);
		$('#game-board-underlay').append($token);
	}

	//Get the associated HTML element
	get HTMLToken() {
		return $(`#${this.id}`);
	}

	//Get the offset relative to the left side of the board.
	get offsetLeft () {
		return this.HTMLToken.offsetLeft;
	}

	//Move left
	moveLeft() {
		const pixelShift = 76;
		if(this.columnLocation > 0){
			this.columnLocation--;
			this.HTMLToken.css('left', '' + (this.columnLocation * 76) + 'px');
		}
		return "moved";

	}

	//Move right
	moveRight(columns) {
		const pixelShift = 76;
		if(this.columnLocation < columns - 1){
			this.columnLocation++;
			this.HTMLToken.css('left', '' + (this.columnLocation * 76) + 'px');
		}
	}

	//Drop animation
	drop(space, callback) {
		console.log('Aaaahhhhh');
		this.dropped = true;

		this.HTMLToken.animate({
		    top: ((5 - space.y) * space.diameter)
			}, 750, 'easeOutBounce', callback);
	}
}