var fs = require('fs');

function remove(req,res) {
    switch (req.baseUrl) {
      case "/images":
        handleDelete(req, "images");
        break;
      case "/videos":
        handleDelete(req, "videos");
        break;
    }    
  };

  //*************
  function handleDelete(req, collection) {
    //get the imageId from the checked items when form is posted
    req.body.forEach(function(file) {
      console.log(file);
      deleteLocalPath(file.localPath);
      deleteDbEntry(collection, {_id : ObjectId(file.objectId)});
    })
  }
  
  //function to delete image locally using path
  function deleteLocalPath(fileToDelete) {
    fs.unlink(fileToDelete, function(err) {
      if (err) {
        console.log(err) 
      } else {
        console.log('removed locally');
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

  module.exports = { remove };