var con = require('../db/connection.js');
var bcrypt   = require('bcrypt-nodejs');

var SALT_WORK_FACTOR = 10;

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

  insertUser: function(data, cb) {

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        return next(err);
      }

      // hash the password along with our new salt
      bcrypt.hash(data.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }

        // Generate a unique URL.

        data.password = hash;
        data.salt = salt;

        con.query('INSERT into users SET ?', data, function(err, res) {
          cb(err, res);
        });

      });
    });
  },

  createUser: function (data, cb) {
    if (this.valid(data))  {  
      this.userExists(data, function(err, res){
        if (!res.length) {
          this.insertUser(data, function(err, res){

          })
        } else {
          console.log("ERR: USER EXISTS");
        }
      });  
    }
  }

}


