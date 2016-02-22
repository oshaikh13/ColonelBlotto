var con = require('../db/connection.js');

module.exports = {
  valid: function(obj) {

    if (Object.keys(obj).length === 2) {
      if (obj.username && obj.password) {
        return true;
      }
    }

    return false;

  },

  createUser: function (data, cb) {
    if (this.valid(data))  {    
      con.query('INSERT into users SET ?', data, function(err, res) {
        cb(err, res);
      });
    }
  }
}

