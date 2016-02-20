var utils = require('./algorithims/compareUtils');

var rules = 
[
  [2, 7, 2],
  [7, 10, 7],
  [2, 7, 2]
];

var board1 = 
[
  [2, 5, 6],
  [1, 4, 6],
  [3, 2, 1]
]

var board2 = 
[
  [2, 5, 6],
  [1, 4, 6],
  [3, 2, 1]
]

var board3 = 
[
  [2, 2, 1],
  [3, 15, 3],
  [1, 2, 1],
]

var board4 = 
[
  [1, 5, 1],
  [3, 10, 3],
  [1, 5, 1]
]

var board5 = 
[
  [2, 7, 2],
  [5, 6, 4],
  [1, 2, 1]
]

var arrayBoards = [board1, board2, board3, board4, board5];

var results = utils.rankBoards(arrayBoards, rules);
console.log(results);