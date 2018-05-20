const createError     = require('http-errors');
const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');
const cors            = require('cors');
const clientsRouter   = require('./routes/clients');
const providersRouter = require('./routes/providers.js');
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Load models
require('./models');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// connect routers
app.use('/clients', clientsRouter);
app.use('/providers', providersRouter);

// connect Swagger
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
