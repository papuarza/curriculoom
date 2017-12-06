/*jshint esversion: 6 */

const express        = require("express");
const router = express.Router();
const passport = require("passport");

// Our user model
const Skill           = require("../model/skills");


/* GET users listing. */
router.get('/list/:id', function(req, res, next) {
  let user = req.user._id;
  Skill.find({userId: user}, (err,skills) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(skills);
  });
});

router.get('/edit/:id', function(req, res, next) {
  let skill = req.params.id;
  Skill.find({_id: skill}, (err,skill) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(skill);
  });
});

router.post('/edit', (req, res, next) => {
  let skillId = req.body.skillId;
  let editSkill = {
    skill : req.body.skill,
    level : req.body.level
  };
  Skill.update({_id: skillId}, {$set: editSkill}, {new: true}, (err,response) => {
    Skill.findOne({_id:skillId}, (err, skill) => {
      if (err) { res.status(400).json({ message: "Something went wrong" });}
      res.status(200).json(skill);
    });
  });
});

router.delete('/delete/:id', function(req, res, next) {
  let skill = req.params.id;
  Skill.remove({_id: skill}, (err,skills) => {
    if (err) { res.status(400).json({ message: "Something went wrong" });}
    res.status(200).json(skills);
  });
});

router.post("/new", (req, res, next) => {
  userId = req.user._id;
  skill = req.body.skill;
  level = req.body.level;

    var newSkill = Skill({
      userId,
      skill,
      level
    });
    newSkill.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
          res.status(200).json(newSkill);
      }
    });
});

module.exports = router;
