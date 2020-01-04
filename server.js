var express = require("express");
// var path = require("path");
var mongoose = require("mongoose");

const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys_dev');
// Sets up the Express App
// =============================================================

var app = express();

var PORT = process.env.PORT || 4000;

// Requiring our models for syncing
var db = require("./models");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

// passport.intialize() is a middle-ware that initialise Passport. Looking at source code (https://github.com/jaredhanson/passport/blob/master/lib/middleware/initialize.js), we can see that passport.initialize() middleware basically add passport instance to incoming requests so that authentication strategy can be proceed. If there is a session, it is added to requests as well.

app.use(passport.initialize());

//passport config
require('./config/passport')(passport)


// Routes to the db
// =============================================================
// https://mherman.org/blog/handling-ajax-calls-with-node-dot-js-and-express-scraping-craigslist/
// app.get('/', function(req, res) {res.render('index')});
// app.get('/login', function(req, res) {res.render('login')});
// app.get('/register', function(req, res) {res.render('register')});
// app.get('/english', function(req, res) {res.render('english')});
// app.get('/geography', function(req, res) {res.render('geography')});
// app.get('/history', function(req, res) {res.render('history')});
// app.get('/math', function(req, res) {res.render('math')});
// app.get('/science', function(req, res) {res.render('science')});
// register create user
// May need to be '/users' but I think this creates the url '/login' 
// if not then switch to user. 
// https://expressjs.com/en/guide/routing.html
// Load input validations
const validateRegisterInput = require('./validation/register');
app.post('/register', (req, res) => {

  /* Before I do anything in the server-side with the data input by user, I pass the data to the validateRegisterInput() function. The data (i.e. req.body) includes all the information that the user puts in while registering.
  And get the function's return values assigned to const { errors, isValid }.
  So this is an exmple of Destructuring, where I am pulling the return values of a function and assigning it to two variables within curly braces */
  const { errors, isValid } = validateRegisterInput(req.body);
  // If the input is not valid res.send the entire errors object.
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // starting with this file (user.js) - any routes thats going to take in req.body we are going to firsts add the above 2 checks at the beginning.

  db.user.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    }

    // and then get other details of the new user from the post request
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return next(err);
        newUser.password = hash;
        newuser.save()
          .then(function (user) {
            res.json(user);
          })
          .catch(function (user) {
            console.log(user)
          });
      });
    });
    db.User.create(newUser);
  });
});

// May need to be '/users' but I think this creates the url '/login' 
// if not then switch to user. 
// https://expressjs.com/en/guide/routing.html
const validateLoginInput = require('./validation/login');
app.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;

  db.User.findOne({ username }).then(user => {
    //if user does not exist than return status 400
    if (!user) {
      errors.username = 'User not found';
      return res.status(404).json({ username: 'User not found' });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, firstname: user.firstname, lastname: user.lastname };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          });
      } else {
        errors.password = "Incorrect Passsword";
        return res.status(400).json(errors);
      }
    });
  });
});

app.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstname: req.user.firstname,
      email: req.user.email
    });
  }
);

app.post('/public', (req, res) => {
  db.User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      const newQuiz = new Quiz({
        Category: req.body.idQ,
        username: req.body.username,
      });
      db.Quiz.create(newQuiz);
    } else {
      return res.status(404).json({ username: 'username did not match' });
    }
  });
});

  app.post('/public', (req, res) => {
    db.Score.findOne({ username: req.body.username }).then(user => {
      if (user) {
        const newScore = new Score({
          Score: req.body.score_input,
          username: req.body.username,
        });
        db.Quiz.create(newQuiz);
      } else {
        return res.status(404).json({ username: 'username did not match' });
      }
    });
  });


    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
