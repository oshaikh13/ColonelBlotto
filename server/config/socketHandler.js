// Socket entry point
var userController = require('../user/userController.js');

module.exports = function (io) {

  var authFn = function (socket, data, callback) {
    userController.logIn(data, function(match) {
      
      //inform the callback of auth success/failure 
      if (!match) return callback(new Error("User not found"));
      return callback(null, match);
    });
  }

  require('socketio-auth')(io, {
    authenticate: authFn,
    timeout: 'none'
  });

  io.on('connection', function (socket) {
    socket.on('startGame', function(data){
      socket.emit('ready', {rules: "NONE"});
    })
  });


}