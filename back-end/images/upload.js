var express = require('express');
var router = express.Router();
var multer = require('multer');
var fileInfo;

//Set Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file');

//Upload files
router.post('/', uploadImages);

function uploadImages(req, res) {
    upload(req, res, function (err) {

        fileInfo = req.files;
        var fileInfoArray = [];
        fileInfo.map(function(file) {
            fileObject = {
                imagePath: file.path,
                size: file.size,
                contentType: file.mimetype,
                timeUploaded: Date.now()
            }
            fileInfoArray.push(fileObject);
            return fileInfoArray;
        })
        console.log(fileInfoArray);
        if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           db.collection('photos').insertMany(fileInfoArray, function (err, result) {
            if (err) return console.log(err);
            console.log('array saved to database');
            })
      return res.status(200).send(req.file)
    })
};


module.exports = router;