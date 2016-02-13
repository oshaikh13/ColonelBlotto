
var Tile = function (value) {

  var instance = {};
  var tileValue = value;

  instance.getValue = function() {
    return tileValue;
  }

  instance.increment = function() {
    tileValue++;
  }

  return instance;

}


var Board = function (size) {

  var initBoard = function(size) {
    var newBoard = [];
    for (int i = 0; i < size; i++) {
      newBoard.push([]);
      for (int j = 0; j < size; j++) {
        newBoard[i].push(Tile(0));
      }
    }
  }

  var boardSize = size;
  var board = initBoard(boardSize);
  var instance = {};

  return instance;
}