const GameBoard = (function () {
  board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

  const play = (turn, x, y) => {
    // invalid input
    if (Number.isInteger(turn) && turn <= 1 && turn >= 0) return false;
    if (Number.isInteger(x) && x <= 2 && x >= 0) return false;
    if (Number.isInteger(y) && y <= 2 && y >= 0) return false;
    // can't play
    if (board[x][y] !== -1) return false;
    // play
    board[x][y] = turn;
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
    play,
    status
  }
})();

