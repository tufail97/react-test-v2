var multer = require('multer');
var shortid = require('shortid');
var path = require('path');

//Set Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //decide which directory upload should go to
    if (file.mimetype.includes('image')) {
      cb(null, 'public/uploads/images');
    } 
    if (file.mimetype.includes('video')) {
      cb(null, 'public/uploads/videos');
    }
  },
  filename: function (req, file, cb) {
    //create filename
    cb(null, shortid.generate() + path.extname(file.originalname));
  }
})

var uploadFile = multer({ 
  storage: storage,
  fileFilter: function(req,file,callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif' && ext !== '.mp4') {
      return callback(false, true); //reject if file not supported
    }
    callback(null, true);
  }
}).array('file');

function upload(req, res) {
  uploadFile(req, res, function (err) {
    var fileInfo = req.files;
    var imageFileArray = [];
    var videoFileArray = [];
    fileInfo.map(function(file) {
      fileObject = {
        originalName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        contentType: file.mimetype,
        timeUploaded: Date.now()
      }
      if (fileObject.contentType.includes('image')) {
        imageFileArray.push(fileObject);
      }
      if (fileObject.contentType.includes('video')) {
        videoFileArray.push(fileObject);
      }
    })
    pushToCollection(imageFileArray, "images");
    pushToCollection(videoFileArray, "videos");
    return res.status(200).send(req.file)
  })
};

function pushToCollection(fileArray, collection) {
  if (fileArray.length > 0) {
    switch(collection) {
      case "images":
        insertToCollection('photos', fileArray);
        break;
      case "videos":
        insertToCollection('videos', fileArray);
        break;
    }
  }
}

function insertToCollection(collectionName, fileArray) {
  db.collection(collectionName).insertMany(fileArray, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('array saved to database');
  })
}

module.exports = { upload };