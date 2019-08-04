var express = require('express');
var router = express.Router();

//Make connection to database
var dbName = 'my-database';
var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectId;

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client) {
    if(err) {
      return console.dir(err);
    }
    db = client.db(dbName);
    console.log('We are connected to ' + db.databaseName);
  });
  

router.get('/', retreiveImages);

//Push all info in db to endpoint
function retreiveImages(req, res) {
    db.collection('photos').find().toArray((err, result) => {
    //make array of objects containing all info in each document 
    console.log(result);
    const imgArray= result.map(function(result) {
      return result;
    });
      if (err) return console.log(err)
      res.json(imgArray);
    })
  };
  
  
  module.exports = router;