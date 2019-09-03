var multer = require('multer');
var shortid = require('shortid');

//Set Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

    if (file.mimetype.includes('image')) {
      cb(null, 'public/uploads/images');
    } else if (file.mimetype.includes('video')) {
      cb(null, 'public/uploads/videos');
    } else {
      console.log('there is an error');
    }
    console.log(file);
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate()); //create filename
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
                size: file.size,
                contentType: file.mimetype,
                timeUploaded: Date.now()
            }
            console.log(fileObject);
            fileInfoArray.push(fileObject);
            return fileInfoArray;
        })
        //console.log(fileInfoArray);
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