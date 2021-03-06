const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User'); // this takes from my User.js model file
const keys = require('../config/keys_dev')
// https://stackoverflow.com/questions/45525077/nodejs-typeerrorjwtstrategy-requires-a-secret-or-key
// require('dotenv').config()
// http://www.passportjs.org/packages/passport-jwt/
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// /* The above is for Extracting the JWT from the request. The JWT is parsed from the request by a user-supplied callback passed in as the jwtFromRequest parameter. This callback, from now on referred to as an extractor, accepts a request object as an argument and returns the encoded JWT string or null.
// A number of extractor factory functions are provided in passport-jwt.ExtractJwt. These factory functions return a new extractor configured with the given parameters. fromAuthHeaderAsBearerToken() is one such function, as my scheme here was ‘bearer’ as stated in my user.js routes file. */

opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            // console.log(jwt_payload);
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user) {
                        return done(null, user)
                    }
                    return done (null, false);
                })
                .catch(err => console.log(err))
        })
    );
};

// /* In the above function, the function argument 'passport' is the same syntax as the below one in server.js. That the variable 'passport' is just function argument.
