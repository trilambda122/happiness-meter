const express = require('express');
const app = express();

// add logging to  our application
const morgan = require('morgan');
app.use(morgan('dev'));

// setu up route for /happy
const happyRoutes = require('./api/routes/happy');
app.use('/happy', happyRoutes);

// setup of default route to catch anything not in a specfic route and will throw an 404 not found error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// handle errors thrown
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
