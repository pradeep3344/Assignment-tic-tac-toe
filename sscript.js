// JavaScript code
class TicTacToeFacade {
    constructor() {
      this.grid = [['', '', ''], ['', '', ''], ['', '', '']];
      this.currentPlayer = 'X';
      this.winner = null;
    }
  
    placeMark(row, col) {
      if (this.grid[row][col] === '') {
        this.grid[row][col] = this.currentPlayer;
        this.checkWinner();
        this.togglePlayer();
        this.updateBoard();
      } else {
        console.log('Invalid move. Try again.');
      }
    }
  
    checkWinner() {
        const winningCombinations = [
          [[0, 0], [0, 1], [0, 2]],
          [[1, 0], [1, 1], [1, 2]],
          [[2, 0], [2, 1], [2, 2]],
          [[0, 0], [1, 0], [2, 0]],
          [[0, 1], [1, 1], [2, 1]],
          [[0, 2], [1, 2], [2, 2]],
          [[0, 0], [1, 1], [2, 2]],
          [[0, 2], [1, 1], [2, 0]]
        ];
      
        for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          const [rowA, colA] = a;
          const [rowB, colB] = b;
          const [rowC, colC] = c;
      
          if (
            this.grid[rowA][colA] !== '' &&
            this.grid[rowA][colA] === this.grid[rowB][colB] &&
            this.grid[rowA][colA] === this.grid[rowC][colC]
          ) {
            this.winner = this.currentPlayer;
            return;
          }
        }
      }
      
  
    togglePlayer() {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  
    resetGame() {
      this.grid = [['', '', ''], ['', '', ''], ['', '', '']];
      this.currentPlayer = 'X';
      this.winner = null;
      this.updateBoard();
    }
  
    updateBoard() {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cell = document.getElementById(`cell-${row}-${col}`);
          cell.textContent = this.grid[row][col];
        }
      }
  
      const status = document.getElementById('status');
      if (this.winner) {
        status.textContent = `Player ${this.winner} wins!`;
      } else if (this.isDraw()) {
        status.textContent = 'It\'s a draw!';
      } else {
        status.textContent = `Player ${this.currentPlayer}'s turn.`;
      }
    }
  
    isDraw() {
      for (const row of this.grid) {
        if (row.includes('')) {
          return false;
        }
      }
      return true;
    }
  }
  
  const game = new TicTacToeFacade();
  
  function handleClick(row, col) {
    game.placeMark(row, col);
  }
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.addEventListener('click', () => handleClick(row, col));
    }
  }
  
  game.updateBoard();
  