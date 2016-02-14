var currentKey = 0;

module.exports = function (value, row, col) {

  var tileValue = value;
  var tileRow = row;
  var tileCol = col;

  var instance = {};

  instance.id = currentKey;

  instance.increment = function() {
    tileValue++;
  }  
  instance.decrement = function() {
    tileValue--;
  }

  instance.getValue = function() {
    return tileValue;
  }

  instance.getRow = function() {
    return tileRow;
  }

  instance.getCol = function() {
    return tileCol;
  }

  currentKey++;

  return instance;

}