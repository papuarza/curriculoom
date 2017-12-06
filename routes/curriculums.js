
const express        = require("express");
const router = express.Router();

// Our user model
const Curriculum           = require("../model/curriculum");

/* GET users listing. */
router.get('/list/:id', function(req, res, next) {
    userId = req.user._id;
    Curriculum.find({user: userId}, (err,curriculums) => {
      if (err) { res.status(400).json({ message: "Something went wrong" });}
      res.status(200).json(curriculums);
    });
  });

router.get('/get/:id', function(req, res, next) {
    userId = req.user._id;
    cvId = req.params.id;
    Curriculum.findOne({_id: cvId})
    .populate('experiences')
    .populate('academics')
    .populate('courses')
    .populate('hobbies')
    .populate('skills')
    .populate('user')
    .populate('design')
    .exec((err, curriculum) => {
        if(err){res.status(400).json(err)}
        res.status(200).json(curriculum);
    })
});

router.post('/save/:id', function(req, res, next) {
    let cvId = req.body.id;
    let color = req.body.color;
    let preview = "";
    let name = "";
    req.body.name !== "SIN TITULO" ? name = req.body.name : name = cvId;
    Curriculum.updateOne({_id: cvId}, {name: name, color: color}, (err, curriculum) => {
        res.status(200).json(curriculum)
    });
});

router.post('/add', (req, res, next) => {
    let design = req.body.design._id;
    let user = req.user._id;
    let experiences = req.body.experiences.map(e => {
        return e._id;
    })
    let academics = req.body.academics.map(e => {
        return e._id;
    })
    let skills = req.body.skills.map(e => {
        return e._id;
    })
    let hobbies = req.body.hobbies.map(e => {
        return e._id;
    })
    let courses = req.body.certificates.map(e => {
        return e._id;
    });
    let newCurriculum = new Curriculum({
        design,
        user,
        experiences,
        academics,
        skills,
        hobbies,
        courses
    })
    newCurriculum.save()
    .then(curriculum => {
        res.status(200).json(curriculum)
    })
    
});

module.exports = router;