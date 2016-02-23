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

  comparePassowrd: function(canidatePass, databasePass, cb) {
    console.log("CALLING COMPARE");
    console.log(canidatePass, databasePass);
    bcrypt.compare(canidatePass, databasePass, function (err, isMatch) {
      if (err) {
        console.error(isMatch);
        cb(false); // TODO: Better err handling.
      } else {
        cb(isMatch);
      }
    });
  },

  signIn: function(data, cb) {
    this.getUser(data.username, function(err, res){
      if (res.length) {
        this.comparePassowrd(data.password, res[0].password, function(match) {
          cb(match);
        }); 
      } else {
        cb(false);
      }
    }.bind(this));
  },

  getUser: function(username, cb) {
    con.query("SELECT * FROM users WHERE username = ? LIMIT 1", username, function(err, res) {
      cb(err, res)
    })
  },

  insertUser: function(data, cb) {

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        console.error(err);
      }

      // hash the password along with our new salt
      bcrypt.hash(data.password, salt, null, function(err, hash) {
        if (err) {
          console.error(err);
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

  login: function (data, cb) {
    if (this.valid(data))  {  
      this.getUser(data.username, function(err, res){
        if (!res.length) {
          this.insertUser(data, function(err, res){
            cb(err, res)
          })
        } else {
          cb({err: "Username exists."}, null);
        }
      }.bind(this));  
    }
  }

}

