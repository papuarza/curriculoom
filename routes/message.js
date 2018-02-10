var express      = require('express');
var router       = express.Router();
const Message = require("../model/message");


/* GET home page. */
router.post('/save', function(req, res, next) {
  const { name, email, message } = req.body;
  const newMessage = new Message({name, email, message})
  newMessage.save()
  .then((response) => {
    res.status(200).json({message: 'Todo perfecto!'})
  })
  .catch((error) => {
    res.status(500).json({message: error})
  })
});

module.exports = router;