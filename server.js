var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, 'public')));

//for use locally
var dbName = 'my-database';

//CONNECT TO DB
var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectId
var db;

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client) {
  if(err) {
    return console.dir(err);
  }
  db = client.db(dbName);
  console.log('We are connected to ' + db.databaseName);
});

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
var fileInfo;
app.post('/upload',function(req, res) {
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
});

//Push all info in db to endpoint
app.get('/images', (req, res) => {
    db.collection('photos').find().toArray((err, result) => {
    //make array of objects containing all info in each document 
    console.log(result);
    const imgArray= result.map(function(result) {
      return result;
    });
      if (err) return console.log(err)
      res.json(imgArray);
    })
  });
  
//start app listening
app.listen(3000, function() {
    console.log('App running on port 3000');
});

fs.watch('./public/uploads/', (eventType) => {
  console.log(`event type is: ${eventType}`);
});


////////////////////////////////

//DELETE IMAGES
app.post('/deleteimage', function(req,res) {
  //get the imageId from the checked items when form is posted
  req.setTimeout(0);
  var fileToDelete = req.body;
  console.log(fileToDelete);

  //console.log(fileToDelete);
  //if there is only one entry, call functions.
  if (typeof fileToDelete === 'string') {
    console.log('this is a string')
    deleteLocalPath('photos', {'imagePath': fileToDelete})
    deleteDbEntry('photos', {'imagePath': fileToDelete});
   } 
  else {
    console.log('this is an array of strings');
    //if imageId is an array, iterate over each, calling function each time
    fileToDelete.forEach(function(file) {
      //console.log(file.imageId);
    deleteLocalPath('photos', {'imagePath': file.imageId})
    deleteDbEntry('photos', {'imagePath': file.imageId});
    })
  }
});


//Functions//

//function to delete image locally using path
function deleteLocalPath(collectionName, queryParam) {
  db.collection(collectionName).findOne(queryParam, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      fs.unlink(result.imagePath, function(err) {
        if (err) {
          console.log(err) 
        } else {
          console.log('removed locally');
        }
      })
    }
  })
}

//function to delete entry on database
function deleteDbEntry(collectionName, queryParam) {
  db.collection(collectionName).deleteOne
  (queryParam, function(err,result) {
    if (err) {
      console.log(err);
    } else {
      console.log('file deleted from db');
    }
  })
}