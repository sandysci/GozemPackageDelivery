"use strict";

require("./src/Helper");

var express = require('express');

var app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set up express for file upload

app.use('/', require('./src/routes/index'));
app.use('/api/', require('./src/routes'));


// Returns if route is not found
app.use(function (req, res) {
  res.status(404).json( {error: 'Route not found'});
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: err && err.message || " Topic Subscription!!!, Sorry An error occurred"});
});



module.exports = app;
