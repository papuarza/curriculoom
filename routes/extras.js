/*jshint esversion: 6 */

const express        = require("express");
const router = express.Router();
const passport = require("passport");

// Our user model
const Certification           = require("../model/certifications");
const Hobbie           = require("../model/hobbies");
const Design           = require("../model/design");


/* GET users listing. */
router.get('/hobbies/list/:id', function(req, res, next) {
  let user = req.params.id;
  Hobbie.find({userId: user}, (err,hobbie) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(hobbie);
  });
});

router.delete('/hobbies/delete/:id', function(req, res, next) {
  let extra = req.params.id;
  Hobbie.remove({_id: extra}, (err,hobbies) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(hobbies);
  });
});

router.post("/hobbies/new", (req, res, next) => {
  userId = req.user._id;
  name = req.body.name;
    var newHobbie = Hobbie({
      userId,
      name
    });
    newHobbie.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
          res.status(200).json(newHobbie);
      }
    });
});

router.get('/certifications/list/:id', function(req, res, next) {
  let user = req.params.id;
  Certification.find({userId: user}, (err,certification) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(certification);
  });
});

router.get('/certifications/edit/:id', function(req, res, next) {
  let certification = req.params.id;
  Certification.find({_id: certification}, (err,certification) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(certification);
  });
});

router.post('/certifications/edit', (req, res, next) => {
  let certificationId = req.body.certificationId;
  let editCertification = {
    entity : req.body.entity,
    year : req.body.year,
    name : req.body.name,
  };
  Certification.update({_id: certificationId}, {$set: editCertification}, {new: true}, (err,response) => {
    Certification.findOne({_id:certificationId}, (err, certification) => {
      if (err) { res.status(400).json({ message: "Something went wrong" });}
      res.status(200).json(certification);
    });
  });
});

router.delete('/certifications/delete/:id', function(req, res, next) {
  let extra = req.params.id;
  Certification.remove({_id: extra}, (err,certifications) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(certifications);
  });
});

router.post("/certifications/new", (req, res, next) => {
  userId = req.user._id;
  name = req.body.name;
  year = req.body.year;
  entity = req.body.entity;
    var newCertification = Certification({
      userId,
      name,
      year,
      entity
    });
    newCertification.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
          res.status(200).json(newCertification);
      }
    });
});

/* GET users listing. */
router.get('/design/list', function(req, res, next) {
  Design.find({}, (err,designs) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(designs);
  });
});

module.exports = router;
