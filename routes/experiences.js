/*jshint esversion: 6 */

const express        = require("express");
const router = express.Router();
const passport = require("passport");

// Our user model
const Experience           = require("../model/experiences");


/* GET users listing. */
router.get('/list/:id', function(req, res, next) {
  user = req.user._id;
  Experience.find({userId: user}, (err,experiences) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(experiences);
  });
});

router.get('/edit/:id', function(req, res, next) {
  let experience = req.params.id;
  Experience.find({_id: experience}, (err,experience) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(experience);
  });
});

router.post('/edit', (req, res, next) => {
  let experienceId = req.body.experienceId;
  let editExperience = {
    company : req.body.company,
    jobTitle : req.body.jobTitle,
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    jobDescription : req.body.jobDescription,
    city : req.body.city,
    country : req.body.country
  };
  Experience.update({_id: experienceId}, {$set: editExperience}, {new: true}, (err,response) => {
    Experience.findOne({_id:experienceId}, (err, experience) => {
      if (err) { res.status(400).json({ message: "Something went wrong" });}
      res.status(200).json(experience);
    });
  });
});

router.delete('/delete/:id', function(req, res, next) {
  let experience = req.params.id;
  Experience.remove({_id: experience}, (err,experiences) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(experiences);
  });
});

router.post("/new", (req, res, next) => {
  userId = req.user._id;
  company = req.body.company;
  jobTitle = req.body.jobTitle;
  startDate = req.body.startDate;
  endDate = req.body.endDate;
  jobDescription = req.body.jobDescription;
  city = req.body.city;
  country = req.body.country;

    var newExperience = Experience({
      userId,
      company,
      jobTitle,
      startDate,
      endDate,
      jobDescription,
      city,
      country
    });
    newExperience.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
          res.status(200).json(newExperience);
      }
    });
});

module.exports = router;
