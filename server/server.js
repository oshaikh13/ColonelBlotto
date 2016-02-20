var express     = require('express');

var app = express(),
    cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cors());

require('./config/socketHandler.js')(io); 

// export our app for testing and flexibility, required by index.js

server.listen(process.env.PORT || 8000);

module.exports = app;
