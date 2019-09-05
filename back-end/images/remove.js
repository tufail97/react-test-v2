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

  function handleDelete(req, collection) {
    //get the imageId from the checked items when form is posted
    console.log(req.baseUrl);
    req.setTimeout(0);
    var fileToDelete = req.body;
    console.log("this is from req.body",req.body[0].imageId);
      fileToDelete.forEach(function(file) {
        console.log(file);
      deleteLocalPath(file.imageId);
      deleteDbEntry(collection, {'filePath': file.imageId});
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