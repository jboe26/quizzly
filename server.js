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
var http = require('http');
var httpServer = http.createServer(app);  // app middleware

var config = require('./config/config.js'), //config file contains all tokens and other private info
  funct = require('./config/functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

//https://www.ctl.io/developers/blog/post/build-user-authentication-with-node-js-express-passport-and-mongodb
// https://github.com/jaredhanson/passport/issues/3
//===============PASSPORT===============

// passport.use('local-login', new LocalStrategy(
//   { passReqToCallback: true }, //allows us to pass back the request to the callback
//   function (req, username, password, done) {
//     funct.localAuth(username, password)
//       .then(function (user) {
//         if (user) {
//           console.log("LOGGED IN AS: " + user.username);
//           req.session.success = 'You are successfully logged in ' + user.username + '!';
//           done(null, user);
//         }
//         if (!user) {
//           console.log("COULD NOT LOG IN");
//           req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
//           done(null, user);
//         }
//       })
//       .fail(function (err) {
//         console.log(err.body);
//       });
//   }
// ));
// passport.use('local-register', new LocalStrategy(
//   { passReqToCallback: true }, //allows us to pass back the request to the callback
//   function (req, username, password, done) {
//     funct.localReg(username, password)
//       .then(function (user) {
//         if (user) {
//           console.log("REGISTERED: " + user.username);
//           req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
//           done(null, user);
//         }
//         if (!user) {
//           console.log("COULD NOT REGISTER");
//           req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
//           done(null, user);
//         }
//       })
//       .fail(function (err) {
//         console.log(err.body);
//       });
//   }
// ));

// // Passport session setup.
// passport.serializeUser(function (user, done) {
//   console.log("serializing " + user.username);
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   console.log("deserializing " + obj);
//   done(null, obj);
// });

//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'supernova', saveUninitialized: true, resave: true }));

// Sets up the Express App
// =============================================================
// passport.intialize() is a middle-ware that initialise Passport. Looking at source code (https://github.com/jaredhanson/passport/blob/master/lib/middleware/initialize.js), we can see that passport.initialize() middleware basically add passport instance to incoming requests so that authentication strategy can be proceed. If there is a session, it is added to requests as well.
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function (req, res, next) {
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
// const user = new User;
// const User = mongoose.model('User');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
// console.log(process.env.MONGODB_URI)
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI  || 'mongodb://localhost:27017/quiz_db';
// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^",MONGODB_URI);
// mongoose.connect(MONGODB_URI, {},  function(error) {
//   console.log("$$$$$$$$$$$$$$$$$$$",error)
// });
mongoose.connect('mongodb://localhost:27017/quiz_db', { useNewUrlParser: true });

// Set view engine
// app.set('view engine', 'jade');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


//passport config
// https://stackoverflow.com/questions/41073038/confused-about-javascript-code-require-config-passportpassport
require('./config/passport')(passport)

//===============ROUTES=================
// app.get('./', function(req, res) {res.render('index')});
// app.get('./login', function(req, res) {res.render('login')});
// app.get('register', function (req, res) { res.render('.register') });
// app.get('/english', function(req, res) {res.render('english')});
// app.get('/geography', function(req, res) {res.render('geography')});
// app.get('/history', function(req, res) {res.render('history')});
// app.get('/math', function(req, res) {res.render('math')});
// app.get('/science', function(req, res) {res.render('science')});

// app.post('./register', passport.authenticate('local-register', {
//   successRedirect: '/main.html',
//   failureRedirect: '/register.html'
// })
// );
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect: './main.html',
//   failureRedirect: './login.html'
//   })
// );
//logs user out of site, deleting them from the session, and returns to homepage
// app.get('/logout', function (req, res) {
//   var name = req.user.username;
//   console.log("LOGGIN OUT " + req.user.username)
//   req.logout();
//   res.redirect('/');
//   req.session.notice = "You have successfully been logged out " + name + "!";
// });


// https://mherman.org/blog/handling-ajax-calls-with-node-dot-js-and-express-scraping-craigslist/
// register create user
// https://expressjs.com/en/guide/routing.html
// Load input validations
// const validateRegisterInput = require('./validation/register');
// app.post('/register', (req, res) => {

//   /* Before I do anything in the server-side with the data input by user, I pass the data to the validateRegisterInput() function. The data (i.e. req.body) includes all the information that the user puts in while registering.
//   And get the function's return values assigned to const { errors, isValid }.
//   So this is an exmple of Destructuring, where I am pulling the return values of a function and assigning it to two variables within curly braces */
//   const { errors, isValid } = validateRegisterInput(req.body);
//   // If the input is not valid res.send the entire errors object.
// if (!isValid) {
//   return res.status(400).json(errors);
// }

//   // starting with this file (user.js) - any routes thats going to take in req.body we are going to firsts add the above 2 checks at the beginning.

//   db.user.findOne({ username: req.body.username }).then(user => {
//     if (user) {
//       errors.username = "Username already exists";
//       return res.status(400).json(errors);
//     }

//     // and then get other details of the new user from the post request
//     const newUser = new User({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//     });

//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) return next(err);
//         newUser.password = hash;
//         newuser.save()
//           .then(function (user) {
//             res.json(user);
//           })
//           .catch(function (user) {
//             console.log(user)
//           });
//       });
//     });
//     db.User.create(newUser);
//   });
// });

// May need to be '/users' but I think this creates the url '/login' 
// if not then switch to user. 
// https://expressjs.com/en/guide/routing.html
const validateLoginInput = require('./validation/login');
app.post('/login', (req, res) => {
  // console.log(req.body);
  // console.log('-----------------')
  
  const { errors, isValid } = validateLoginInput(req.body);
  // console.log(isValid);
  // check validation
  // if (!isValid) {
  //   console.log('----------------------------')
  //   return res.status(400).json(errors);
  // }
  const email = req.body.email;
  const password = req.body.password;

  console.log(email)
  console.log("+++++++++++++++++++++++++++++++")
  console.log(password)
  db.User.findOne({ email }).then(user => {
    // console.log("{{{{{{{{{{{{{{{{{{{{{{", email);
    //if user does not exist than return status 400
    // console.log(this.email);
    if(user){
      console.log("match");
      return email;
    }
    if (!user) {
      errors.User = 'User not found';
      return res.status(404).json({ email: 'User not found' });
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
    }).catch(function (err) {
      console.log("!!!!!!!!!!!!", err)
    })
  }).catch(function (err) {
    console.log(err)
  })
});

// app.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       firstname: req.user.firstname,
//       email: req.user.email
//     });
//   }
// );

// app.post('/category', (req, res) => {
//   db.User.findOne({ username: req.body.username }).then(user => {
//     if (user) {
//       const newQuiz = new Quiz({
//         Category: req.body.slider_input,
//         username: req.body.username,
//       });
//       db.Quiz.create(newQuiz);
//     } else {
//       return res.status(404).json({ username: 'username did not match' });
//     }
//   });
// });

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
