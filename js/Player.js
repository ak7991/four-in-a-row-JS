class Player {
	constructor(name, id, color, active = false) {
		this.name = name;
		this.id = id;
		this.color = color;
		this.active = active;
		this.tokens = this.createTokens(21); // Default tokens
	}

	//Create <num> number of  token objects./
	createTokens(num) {
		const tokens = [];

		for(let i = 0; i < num; i++){
			let tempToken = new Token(i, this);
			tokens.push(tempToken);
		}

		return tokens;
	}

	//Getter for unused Tokens
	get unusedTokens() {
		return this.tokens.filter(elem => !elem.dropped);
	}

	//Getter method to get the token "to be" dropped
	get activeToken() {
		return this.unusedTokens[0]? this.unusedTokens[0]: null;
	}
}