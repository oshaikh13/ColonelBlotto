// Socket entry point
var userController = require('../user/userController.js');

var onlineSockets = {};



module.exports = function (io) {

  var authFn = function (socket, data, callback) {
    userController.logIn(data, function(match) {
      
      //inform the callback of auth success/failure 
      if (!match) return callback(new Error("User not found"));
      return callback(null, match);
    });
  };

  var postFn = function(socket, data) {
    socket.client.username = data.username;
    onlineSockets[data.username] = socket;
  };


  // Authenticate thru socket.io. Not HTTP request.
  // Tentative migration to jwt token?
  require('socketio-auth')(io, {
    authenticate: authFn,
    postAuthenticate: postFn,
    timeout: 'none'
  });

  io.on('connection', function (socket) {
    socket.on('startGame', function(data){
      socket.emit('ready', {rules: "NONE"});
    });

    socket.on('disconnect', function(){
      if (socket.auth) {
        delete onlineSockets[socket.client.username];
      }
    });
  });


};
