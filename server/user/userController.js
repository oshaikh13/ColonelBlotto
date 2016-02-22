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

  userExists: function(data, cb) {
    con.query("SELECT * FROM users WHERE username = ? LIMIT 1", data.username, function(err, res) {
      cb(err, res)
    })
  },

  createUser: function (data, cb) {
    if (this.valid(data))  {  
      this.userExists(data, function(err, res){
        if (!res.length) {
          con.query('INSERT into users SET ?', data, function(err, res) {
            cb(err, res);
          });
        } else {
          console.log("ERR: USER EXISTS");
        }
      });  
    }
  }

}


