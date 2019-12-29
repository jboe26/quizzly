var db = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//register: storing name, email and password and redirecting to home page after signup
app.post('/user/create', function (req, res) {
  bcrypt.hash(req.body.passwordsignup, saltRounds, function (err,   hash) {
 db.User.create({
   name: req.body.usernamesignup,
   email: req.body.emailsignup,
   password: hash
   }).then(function(data) {
    if (data) {
    res.redirect('/home');
    }
  });
 });
});

//login page: storing and comparing email and password,and redirecting to home page after login
app.post('/user', function (req, res) {
  db.User.findOne({
       where: {
           email: req.body.email
              }
  }).then(function (user) {
      if (!user) {
         res.redirect('/');
      } else {
bcrypt.compare(req.body.password, user.password, function (err, result) {
     if (result == true) {
         res.redirect('/home');
     } else {
      res.send('Incorrect password');
      res.redirect('/');
     }
   });
  }
});
});

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", { 
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$", 'i'],
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      isUnique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      len: [2,10]
    }
  });


// generating a hash
User.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.prototype.validPassword = function (password) {
  return bcrypt.hashSync(password, this.localPassword);
};

}