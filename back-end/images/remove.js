var express = require('express');
var router = express.Router();
var fs = require('fs');


//DELETE IMAGES
router.post('/remove', remove);

function remove(req,res) {
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
  };
  
  
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

  module.exports = router;