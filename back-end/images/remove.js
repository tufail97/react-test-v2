var fs = require('fs');

module.exports = { remove };

function remove(req,res) {
    //get the imageId from the checked items when form is posted
    req.setTimeout(0);
    var fileToDelete = req.body;
    console.log("this is from req.body",req.body[0].imageId);
      fileToDelete.forEach(function(file) {
        console.log(file);
      deleteLocalPath(file.imageId);
      deleteDbEntry('photos', {'filePath': file.imageId});
      })
    
  };
  
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