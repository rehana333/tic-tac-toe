const Gameboard = (() => {
    let board = Array(9).fill(null); // Initialize a 3x3 board with null

    const getBoard = () => board;
    const resetBoard = () => {
        board = Array(9).fill(null);
    };

    const setMark = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark;
        }
    };

    return { getBoard, resetBoard, setMark };
})();
const Player = (name, marker) => {
    return { name, marker };
};
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const startGame = (player1Name, player2Name) => {
        players = [Player(player1Name, 'X'), Player(player2Name, 'O')];
        currentPlayerIndex = 0;
        Gameboard.resetBoard();
        gameOver = false;
      
        renderBoard(); // Render the board
        document.getElementById('gameStatus').textContent = `${getCurrentPlayer().name}'s turn!`;
      };
      

    const getCurrentPlayer = () => players[currentPlayerIndex];


    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const playRound = (index) => {
        if (!gameOver && Gameboard.getBoard()[index] === null) {
          // Set the current player's mark on the board
          Gameboard.setMark(index, getCurrentPlayer().marker);
      
          // Check for a win or tie
          if (checkWin()) {
            document.getElementById('gameStatus').textContent = `${getCurrentPlayer().name} wins!`;
            gameOver = true;
            document.getElementById('gameboard').classList.add('game-over'); // Add the game-over class
          } else if (Gameboard.getBoard().every(mark => mark !== null)) {
            document.getElementById('gameStatus').textContent = `It's a tie!`;
            gameOver = true;
            document.getElementById('gameboard').classList.add('game-over'); // Add the game-over class
          } else {
            // Switch to the next player
            switchPlayer();
      
            // Update the UI to reflect the current player's turn
            document.getElementById('gameStatus').textContent = `${getCurrentPlayer().name}'s turn!`;
          }
          
          // Update the button text for a restart
          if (gameOver) {
            document.getElementById('startBtn').textContent = "Restart Game";
          } else {
            document.getElementById('startBtn').textContent = "Start Game";
          }
      
          // Render the updated board
          renderBoard();
        }
      };
      
      
      

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return Gameboard.getBoard()[a] !== null &&
                Gameboard.getBoard()[a] === Gameboard.getBoard()[b] &&
                Gameboard.getBoard()[b] === Gameboard.getBoard()[c];
        });
    };

    return { startGame, playRound, getCurrentPlayer };
})();
const renderBoard = () => {
    const gameboardDiv = document.getElementById('gameboard');
    gameboardDiv.innerHTML = '';
    Gameboard.getBoard().forEach((mark, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = mark;
      cell.addEventListener('click', () => {
        GameController.playRound(index);
      });
      gameboardDiv.appendChild(cell);
    });
  };

document.getElementById('startBtn').addEventListener('click', () => {
    const player1 = document.getElementById('player1').value || 'Player 1';
    const player2 = document.getElementById('player2').value || 'Player 2';
    
    // Start or restart the game
    GameController.startGame(player1, player2);
    
    // Set the initial game status
    document.getElementById('gameStatus').textContent = `${player1}'s turn!`;
  });
  
    