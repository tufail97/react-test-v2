const express = require('express');
const router = express.Router();

var retreiveImages = require('./retreive.js');
var uploadImages = require('./upload.js');
var removeImages = require('./remove.js');

module.exports = router;

router.get('/retreive', retreiveImages.retreive);
router.post('/upload', uploadImages.upload);
router.post('/remove', removeImages.remove);