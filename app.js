const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var organizations = require('./routes/organizations');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/organizations', organizations);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.code || 69,
      message: err.message
    }
  });
});

module.exports = app;
