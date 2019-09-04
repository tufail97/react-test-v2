var multer = require('multer');
var shortid = require('shortid');
var path = require('path');

//Set Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //decide which directory upload should go to
    if (file.mimetype.includes('image')) {
      cb(null, 'public/uploads/images');
    } else if (file.mimetype.includes('video')) {
      cb(null, 'public/uploads/videos');
    } else {
      //should alert that the content type isn't accepted
      console.log('there is an error');
    }
  },
  filename: function (req, file, cb) {
    //create filename: shortid.extension
    console.log(file);
    cb(null, shortid.generate() + path.extname(file.originalname));
  }
})

var uploadFile = multer({ storage: storage }).array('file');

function upload(req, res) {
    uploadFile(req, res, function (err) {
        var fileInfo = req.files;
        var fileInfoArray = [];
        fileInfo.map(function(file) {
            fileObject = {
                originalName: file.originalname,
                filePath: file.path,
                fileSize: file.size,
                contentType: file.mimetype,
                timeUploaded: Date.now()
            }
            fileInfoArray.push(fileObject);
            //was a return statement here, don't think it is needed?
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

module.exports = { upload };