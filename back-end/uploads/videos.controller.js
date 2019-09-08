const express = require('express');
const router = express.Router();

var retreiveVideos = require('./retreive.js');
var uploadVideos = require('./upload.js');
var removeVideos = require('./remove.js');

module.exports = router;

router.get('/retreive', retreiveVideos.retreive);
router.post('/upload', uploadVideos.upload);
router.post('/remove', removeVideos.remove);