require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

const jwt = require('back-end/_helpers/jwt');
const errorHandler = require('back-end/_helpers/error-handler');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(jwt()); // use JWT auth to secure the api
app.use(errorHandler); //global error handler
app.use('/users', require('./back-end/users/users.controller'));

var images = require('back-end/images/images.js');
app.use('/images', images);

var upload = require('back-end/images/upload.js');
app.use('/upload', upload);

var deleteImage = require('back-end/images/deleteImage.js');
app.use('/deleteImage', deleteImage);

//start app listening///////////
app.listen(3000, function() {
  console.log('App running on port 3000');
});