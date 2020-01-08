var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;
// Ascync https://github.com/dcodeIO/bcrypt.js#usage---async
// https://medium.com/javascript-in-plain-english/how-bcryptjs-works-90ef4cb85bf4
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash("B4c0/\/", salt, function(err, hash) {
      // Store hash in your password DB.
  });
});
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


UserSchema.pre('save', function (next) {
  var User = this;

  // only hash the password if it has been modified (or is new)
  if (!User.isModified('password')) return next();
  // for new password
  if (User.password) {
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(User.password, salt, function (err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        User.password = hash;
        next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;