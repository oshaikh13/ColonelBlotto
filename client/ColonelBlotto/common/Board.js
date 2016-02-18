
var Tile = require('./Tile');

module.exports = function (size, limit, immutableBoard) {
  var initBoard = function(size) {
    if (Array.isArray(size)) {
      for (var i = 0; i < size.length; i++) {
        for (var j = 0; j < size[i].length; j++) {
          size[i][j] = Tile(size[i][j], i, j);
        }
      }

      return size;
    }

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
  var board;

  if (!immutableBoard) {
    board = initBoard(size);
  } else {
    board = initBoard(immutableBoard);
  }

  var instance = {};

  instance.getBoard = function() {
    return board;
  }

  instance.isImmutable = function() {
    return immutableBoard;
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

  if (immutableBoard) {
    var empty = function(){};
    instance.incrementTile = empty;
    instance.decrementTile = empty;
    instance.incrementPeicesLeft = empty;
    instance.decrementPeicesLeft = empty;
  }

  return instance;

}

