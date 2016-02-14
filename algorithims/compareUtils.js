
var scoreBoard = function (board1, board2, rules) {
  // Precondition: board 1 and 2 are played using the same rules...
  var score1 = 0,
      score2 = 0;

  for (var i = 0; i < board1.length; i++) {
    for (var j = 0; j < board1[i].length; j++) {

      if (board1[i][j] > board2[i][j]) {
        score1 += rules[i][j];
      } else if (board1[i][j] < board2[i][j]) {
        score2 += rules[i][j];
      } else {
        score1 += rules[i][j];
        score2 += rules[i][j];
      }

    }
  }
 
  return {
    score1: score1, 
    score2: score2
  }

}

var winnerBoard = function(board1, board2, rules) {
  var results = scoreBoard(board1, board2, rules);

  if (results.score1 > results.score2) {
    return true;
  } else if (results.score1 < results.score2) {
    return false;
  } 

  return null;
}

module.exports = {
  findWinner: function(board1, board2, rules) {
    return winnerBoard(board1, board2, rules);
  }, 

  rankBoards: function(arrayBoards, rules) {
    var rankArray = [];

    var rankIndex = 0;
    for (var i = 0; i < arrayBoards.length; i++) {
      rankArray.push([]);
      for (var j = 0; j < arrayBoards.length; j++) {

        if (j === i){
          rankArray[rankIndex].push(null);
          continue;
        } 

        rankArray[rankIndex].push(winnerBoard(arrayBoards[i], arrayBoards[j], rules));

      }
      rankIndex++;
    }

    return rankArray;
  }


}















