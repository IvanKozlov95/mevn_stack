var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Load models
require('./models');

var clientsRouter = require('./routes/clients');
var providersRouter = require('./routes/providers.js');
// var swaggerRouter = require('./routes/swagger.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/clients', clientsRouter);
app.use('/providers', providersRouter);
// app.use('/docs', swaggerRouter);
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);
  if (err.name === 'MongoNetworkError') {
    err.message = 'Can\'t connect to db';
  }
  res.status(err.status || 500);
  res.send({ message: err.message });
});

module.exports = app;
