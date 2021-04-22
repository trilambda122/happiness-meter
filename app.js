const express = require('express');
const app = express();
const mongoose = require('mongoose');
// add logging to  our application
const morgan = require('morgan');
app.use(morgan('dev'));

//setup express to parse JSON form the request body
app.use(express.json());

// CORS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

mongoose
  .connect(
    'mongodb+srv://trilambda122:' +
      process.env.MONGO_DB_PW +
      '@cluster0.jlxfk.mongodb.net/happiness?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('CONNECTED TO DATABASE');
  })
  .catch((err) => {
    console.log(err);
  });
// setup route for /happy
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
