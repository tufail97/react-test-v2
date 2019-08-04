//CONNECT TO DB
var dbName = 'my-database';
var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectId
var db;

function connect() {
    MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client) {
        if(err) {
          return console.dir(err);
        }
        db = client.db(dbName);
        console.log('We are connected to ' + db.databaseName);
        return db;
      });
}

module.exports = {
    connect
}