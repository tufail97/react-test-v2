//Make connection to database
var dbName = 'my-database';
var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectId;

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client) {
    if(err) return console.dir(err);
    db = client.db(dbName);
    console.log('We are connected to ' + db.databaseName);
  });
  
  function retreive(req, res) {
    console.log(req.baseUrl);
    switch (req.baseUrl) {
      case "/images":
        arrayFromCollection(res, "images");
        break;
      case "/videos":
        arrayFromCollection(res, "videos");
        break;
    }
  };

  //Push all info in db to endpoint
  //make array of objects containing all info in each document 
  function arrayFromCollection(res, collection) {
    db.collection(collection).find().toArray((err, result) => {
      const imgArray= result.map(function(result) {
        return result;
      });
      if (err) return console.log(err)
      res.json(imgArray);
    })
  }

module.exports = { retreive };