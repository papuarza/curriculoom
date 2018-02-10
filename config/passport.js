require('dotenv').config();
const LocalStrategy  = require('passport-local').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User           = require('../model/user');
// const bcrypt       = require("bcrypt");

module.exports = function (passport) {
  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      // if (!bcrypt.compareSync(password, user.password)) {
      //   return next(null, false, { message: "Incorrect password" });
      // }
      return next(null, user);
    });
  }));

  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }));

  passport.serializeUser((user, cb) => {
    console.log("SERIALIZE USER");
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    console.log("DESESERIALIZE USER");
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
}
