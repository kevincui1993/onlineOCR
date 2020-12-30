var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path')
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


const storage = multer.diskStorage({    
  destination: (req, file, cb) => {
      cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

var upload = multer({ storage });

router.post('/upload', upload.single('avatar'), function(req, res) {
  console.log(req.file);


  var Tesseract = require('tesseract.js')
  var filename = path.join(__dirname + "/../uploads/" + req.file.originalname)

  Tesseract.recognize(
    filename,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
    res.status(200).send(text)
  })
})