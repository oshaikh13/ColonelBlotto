var con = require('../db/connection.js');

module.exports = {
  createUser: function (data, cb) {
    if ()
    con.query('INSERT into users SET ?', data, function(err, res) {
      cb(err, res)
    });
  }
}