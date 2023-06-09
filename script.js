const GameBoard = (function (turn) {
  let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  let currentTurn = turn;

  const restart = () => {
    currentTurn = 0;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        board[i][j] = -1;
      }
    }
  }

  const getTurn = () => currentTurn;

  const play = (x, y) => {
    // invalid input
    if (!Number.isInteger(x) || x > 2 || x < 0) return false;
    if (!Number.isInteger(y) || y > 2 || y < 0) return false;
    // can't play
    if (board[x][y] !== -1 || status() !== 3) return false;
    // play
    board[x][y] = currentTurn;
    currentTurn = 1 - currentTurn; // change turn
    return true;
  }

  const isWinner = (player) => {
    let rowComplete;
    for (let i = 0; i < 3; ++i) {
      rowComplete = true;
      for (let j = 0; j < 3; ++j) {
        if (board[i][j] !== player) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) return true;
    }
    let colComplete;
    for (let j = 0; j < 3; ++j) {
      colComplete = true;
      for (let i = 0; i < 3; ++i) {
        if (board[i][j] !== player) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) return true;
    }
    let mainAxisComplete = true;
    for (let i = 0; i < 3; ++i) {
      if (board[i][i] !== player) {
        mainAxisComplete = false;
        break;
      }
    }
    if (mainAxisComplete) return true;
    let axisComplete = true;
    for (let i = 0; i < 3; ++i) {
      if (board[i][2 - i] !== player) {
        axisComplete = false;
        break;
      }
    }
    if (axisComplete) return true;
  }

  const status = () => {
    if (isWinner(0)) return 0; // player 0 wins
    if (isWinner(1)) return 1; // player 1 wins
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (board[i][j] === -1) {
          return 3; // game is not finished
        }
      }
    }
    return 4; // draw
  }

  return {
    restart,
    getTurn,
    play,
    status
  }
})(0);

const renderGameBoard = () => {
  const gameBoardDiv = document.getElementById('game-board');
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.addEventListener('click', () => {
        if (GameBoard.play(i, j)) {
          // actually need the last turn so that swapped it to be 'X' then 'O'.
          cell.innerHTML = (GameBoard.getTurn()) ? 'X' : 'O';
          const status = GameBoard.status();
          if (status === 0) {
            document.getElementById('status').innerHTML = 'Player 1 wins';
          } else if (status === 1) {
            document.getElementById('status').innerHTML = 'Player 2 wins';
          } else if (status === 4) {
            document.getElementById('status').innerHTML = 'Draw!';
          }
        }
      });
      gameBoardDiv.appendChild(cell);
    }
  }
}

const renderRestartButton = () => {
  const btn = document.getElementById('restart');
  btn.addEventListener('click', () => {
    document.getElementById('status').innerHTML = '';
    const gameBoardDiv = document.getElementById('game-board');
    for(let i = 0; i < gameBoardDiv.children.length; ++i){
      gameBoardDiv.children[i].innerHTML = '';
    } 
    GameBoard.restart();
  });
}

renderGameBoard();
renderRestartButton();