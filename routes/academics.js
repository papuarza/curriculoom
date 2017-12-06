/*jshint esversion: 6 */

const express        = require("express");
const router = express.Router();
const passport = require("passport");

// Our user model
const Academic           = require("../model/academics");


/* GET users listing. */
router.get('/list/:id', function(req, res, next) {
  user = req.user._id;
  Academic.find({userId: user}, (err,experiences) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(experiences);
  });
});

router.get('/edit/:id', function(req, res, next) {
  let academic = req.params.id;
  Academic.find({_id: academic}, (err,academic) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(academic);
  });
});

router.post('/edit', (req, res, next) => {
  let academicId = req.body.academicsId;
  let editAcademic = {
    institute : req.body.institute,
    jobTitle : req.body.jobTitle,
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    degreeTitle : req.body.degreeTitle,
    degreeLevel : req.body.degreeLevel,
    description : req.body.description,
    city : req.body.city,
    country : req.body.country
  };
  Academic.update({_id: academicId}, {$set: editAcademic}, {new: true}, (err,response) => {
    Academic.findOne({_id:academicId}, (err, academic) => {
      if (err) { res.status(400).json({ message: "Something went wrong" });}
      res.status(200).json(academic);
    });
  });
});

router.delete('/delete/:id', function(req, res, next) {
  let experience = req.params.id;
  Academic.remove({_id: experience}, (err,experiences) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(experiences);
  });
});

router.post("/new", (req, res, next) => {
  userId = req.user._id;
  institute = req.body.institute;
  degreeTitle = req.body.degreeTitle;
  degreeLevel = req.body.degreeLevel;
  startDate = req.body.startDate;
  endDate = req.body.endDate;
  description = req.body.description;
  city = req.body.city;
  country = req.body.country;

    var newAcademic = Academic({
      userId,
      institute,
      degreeTitle,
      degreeLevel,
      startDate,
      endDate,
      description,
      city,
      country
    });
    newAcademic.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
          res.status(200).json(newAcademic);
      }
    });
});

module.exports = router;
