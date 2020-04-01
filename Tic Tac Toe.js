const gameBoard = (() => {
	let grid = document.querySelector(".gameboard");
	let data = [];
	let reset = () => data = [];
	let getSymbol = (position) => data[position];
	let setSymbol = (position, symbol) => data[position] = symbol;
	let display = () => {
		while(grid.firstChild){
			grid.removeChild(grid.firstChild);
		}
		for(let i = 0; i <= 8; ++i){
			let cell = document.createElement('div');
			cell.id = i;
			cell.textContent = !data[i] ? " " : data[i];
			cell.addEventListener('click', e => gameController.play(+e.target.id));
			grid.appendChild(cell);
		}
	}

	return {grid, data, display, getSymbol, setSymbol, reset};
})();

const player = (name, symbol) => {
	let move = (position) => {
		if(position >=0 && position <=8) {
			//check if there is existing value on this position
			if(!gameBoard.getSymbol(position)) {
				//set the symbol
				gameBoard.setSymbol(position,symbol);
				return true;
			}
		}
	}
	let win = () => {
		if (
			gameBoard.getSymbol(0) == symbol
			&& gameBoard.getSymbol(1) == symbol
			&& gameBoard.getSymbol(2) == symbol
		)
			return [0, 1, 2];
		if (
			gameBoard.getSymbol(3) == symbol
			&& gameBoard.getSymbol(4) == symbol
			&& gameBoard.getSymbol(5) == symbol
		)
			return [3, 4, 5];
		if (
			gameBoard.getSymbol(6) == symbol
			&& gameBoard.getSymbol(7) == symbol
			&& gameBoard.getSymbol(8) == symbol
		)
			return [6, 7, 8];
		if (
			gameBoard.getSymbol(0) == symbol
			&& gameBoard.getSymbol(3) == symbol
			&& gameBoard.getSymbol(6) == symbol
		)
			return [0, 3, 6];
		if (
			gameBoard.getSymbol(1) == symbol
			&& gameBoard.getSymbol(4) == symbol
			&& gameBoard.getSymbol(7) == symbol
		)
			return [1, 4, 7];
		if (
			gameBoard.getSymbol(2) == symbol
			&& gameBoard.getSymbol(5) == symbol
			&& gameBoard.getSymbol(8) == symbol
		)
			return [2, 5, 8];
		if (
			gameBoard.getSymbol(0) == symbol
			&& gameBoard.getSymbol(4) == symbol
			&& gameBoard.getSymbol(8) == symbol
		)
			return [0, 4, 8];
		if (
			gameBoard.getSymbol(2) == symbol
			&& gameBoard.getSymbol(4) == symbol
			&& gameBoard.getSymbol(6) == symbol
		)
			return [2, 4, 6];
		return false;
	}
	return {name, symbol, move, win};
}

const gameController = (() => {
	let players = [player("player1", "X"), player("player2", "O")];
	let turn;
	let playing;
	let setup = () => {
		playing = true;
		total = 0;
		turn = Math.floor(Math.random()*2);
		gameBoard.display();
	}
	let play = (position) => {
		if(!playing) {
			setup();
			return;
		}
		if( players[turn].move(position) ) {
			total++;
			if(players[turn].win()){
				gameBoard.display();
				alert(players[turn].name + " is winner");
				playing = false;
				gameBoard.reset();
				gameBoard.display();
			}
			else{
			//next turn (turn change)
			if(total==9){
				//Condition for draw. Call draw function
				alert('Its a draw!!');
				gameBoard.reset();
				gameBoard.display();
			}
			else{
				turn = (turn==0) ? 1 : 0;
				gameBoard.display();
			}
		}
		}
	}
	

	return {players, turn, play, setup};
})();


gameController.setup();