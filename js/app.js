let game = new Game();

//Begin game on button click
$('#begin-game').on('click', () => {
	game.startGame();
	$('#begin-game').hide();
	$('#play-area').css("opacity", "1");
});

$
//Listen for keyboard presses
document.addEventListener('keydown', (event) => {
	game.handleKeydown(event);
});