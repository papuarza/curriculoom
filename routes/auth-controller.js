/*jshint esversion: 6 */

const express        = require("express");
const authController = express.Router();
const passport = require("passport");

// Our user model
const User           = require("../model/user");
const upload = require('../config/multer');

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


authController.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
          res.status(200).json(req.user);
        });
      }
    });
  });
});

authController.post('/edit', (req, res, next) => {
  let userId = req.user._id;
  let editUser = {
    name : req.body.name,
    lastName : req.body.lastName,
    city : req.body.city,
    country : req.body.country,
    phone : req.body.phone,
    email : req.body.email,
    linkedin : req.body.linkedin,
    profession : req.body.profession
  };
  User.update({_id: userId}, {$set: editUser}, {new: true}, (err,response) => {
    User.findOne({_id:userId}, (err, user) => {
      if (err) { res.status(400).json({ message: "Something went wrong" });}
      res.status(200).json(user);
    });
  });
});

authController.post("/complete-info", function(req, res, next) {
  let name = req.body.name;
  let lastName = req.body.lastName;
  let city = req.body.city;
  let country = req.body.country;
  let email = req.body.email;
  let phone = req.body.phone;
  let linkedin = req.body.linkedin;
  let profession = req.body.profession;

  User.update({_id: req.body.id}, {$set: {
    name: name, lastName: lastName, city: city, country: country, email: email, phone: phone, linkedin: linkedin, profession: profession }}, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
      res.status(200).json(user);
    }
  );

});

authController.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.status(401).json(info); }

    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

authController.post("/logout", function(req, res) {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

authController.get("/loggedin", function(req, res) {
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({ message: 'Unauthorized' });
});

authController.get("/private", (req, res) => {
  if(req.isAuthenticated()) {
    return res.json({ message: 'This is a private message' });
  }
  return res.status(403).json({ message: 'Unauthorized' });
});


authController.post('/upload-photo', upload.single('file'), function(req, res) {
  user = req.user._id;
  imgPath = req.file.path;
  imgNameReq = req.file.filename;
  User.update({_id : user}, {$set: {urlImg: imgPath, imgName: imgNameReq}})
  .then(response => {
    User.findOne({_id:user})
    .then(userUpdated => {
      res.status(200).json(userUpdated)
    })
    
  })
});




module.exports = authController;
