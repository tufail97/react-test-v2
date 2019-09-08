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
app.use('/images', require('./back-end/uploads/images.controller'));
app.use('/videos', require('./back-end/uploads/videos.controller'));

//start app listening///////////
app.listen(3000, function() {
  console.log('App running on port 3000');
});