var express = require("express");
var mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));

// Sets up the Express App
// =============================================================
// passport.intialize() is a middle-ware that initialise Passport. Looking at source code (https://github.com/jaredhanson/passport/blob/master/lib/middleware/initialize.js), we can see that passport.initialize() middleware basically add passport instance to incoming requests so that authentication strategy can be proceed. If there is a session, it is added to requests as well.
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});


// Requiring our models for syncing
var db = require("./models");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI  || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



//passport config
// https://stackoverflow.com/questions/41073038/confused-about-javascript-code-require-config-passportpassport
require('./config/passport')(passport)


//===============ROUTES=================
// app.get('/', function(req, res) {res.render('index')});
// app.get('/login', function(req, res) {res.render('login')});
// app.get('/register', function(req, res) {res.render('register')});
// app.get('/english', function(req, res) {res.render('english')});
// app.get('/geography', function(req, res) {res.render('geography')});
// app.get('/history', function(req, res) {res.render('history')});
// app.get('/math', function(req, res) {res.render('math')});
// app.get('/science', function(req, res) {res.render('science')});

app.post('/register', passport.authenticate('local-register', {
  successRedirect: '/main',
  failureRedirect: '/register'
  })
);
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/main',
  failureRedirect: '/login'
  })
);
//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

passport.use('local-login', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));
passport.use('local-register', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});
// https://mherman.org/blog/handling-ajax-calls-with-node-dot-js-and-express-scraping-craigslist/
// register create user
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

app.post('/category', (req, res) => {
  db.User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      const newQuiz = new Quiz({
        Category: req.body.slider_input,
        username: req.body.username,
      });
      db.Quiz.create(newQuiz);
    } else {
      return res.status(404).json({ username: 'username did not match' });
    }
  });
});

  app.post('/score', (req, res) => {
    db.User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        const newScore = new Score({
          Score: req.body.score_input,
          username: req.body.username,
        });
        db.Score.create(newScore);
      } else {
        return res.status(404).json({ username: 'username did not match' });
      }
    });
  });

//===============PORT=================
  var PORT = process.env.PORT || 4000;
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
