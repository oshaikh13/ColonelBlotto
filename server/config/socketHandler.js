// Socket entry point


module.exports = function (io) {

  io.on('connection', function (socket) {
    socket.on('startGame', function(data){
      socket.emit('ready', {rules: "NONE"});
    })
  });


}