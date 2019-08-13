class Space {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.id = `space-${x}-${y}`;
		this.token = null; // no token by default
		this.diameter = 76;
		this.radius = this.diameter / 2;
	}

	// Get the owner of the token occupying the space.
	get owner(){
		if(this.token == null) {
			return null
		}
		else {
			return this.token.owner;
		}
	}

	// Render spaces on the board
	drawSVGSpace() {   
		console.log("svg space render"); 
        const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgSpace.setAttributeNS(null, "id", this.id);
        svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "r", this.radius - 8);
        svgSpace.setAttributeNS(null, "fill", "black");
        svgSpace.setAttributeNS(null, "stroke", "none");

        document.getElementById("mask").appendChild(svgSpace);     
	}

	//Mark the space object that just had a token dropped in
	mark(token) {
		this.token = token;
	}	
}