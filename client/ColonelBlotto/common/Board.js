
var Tile = require('./Tile');

module.exports = function (size, limit) {
  var initBoard = function(size) {

    var newBoard = [];
    for (var i = 0; i < size; i++) {
      newBoard.push([]);
      for (var j = 0; j < size; j++) {
        newBoard[i].push(Tile(0, i, j));
      }
    }

    return newBoard;

  }

  var boardLimit = limit;
  var peicesLeft = limit;
  var board = initBoard(size);
  var instance = {};

  instance.getBoard = function() {
    return board;
  }

  instance.incrementTile = function(row, col) {
    var worked = false;
    if (peicesLeft != 0) {    
      board[row][col].increment();
      this.decrementPeicesLeft();
      worked = !worked;
    }
    return worked;
  }

  instance.decrementTile = function(row, col) {
    var worked = false;
    if (board[row][col].getValue() > 0) {
      board[row][col].decrement();
      this.incrementPeicesLeft();
      worked = !worked;
    }

    return worked;
  }

  instance.getPeicesLeft = function() {
    return peicesLeft;
  }

  instance.decrementPeicesLeft = function() {
    peicesLeft--;
  }

  instance.incrementPeicesLeft = function() {
    peicesLeft++;
  }

  return instance;

}

