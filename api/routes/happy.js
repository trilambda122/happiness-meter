// route file for /happy url

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// import mongoose models
const Happy = require('../models/happy');
// get route
router.get('/', (req, res, next) => {
  res.status('200').json({
    message: 'GET....HAPPINESS!',
  });
});

// get route for one item
router.get('/:happyId', (req, res, next) => {
  const id = req.params.happyId;
  res.status('200').json({
    message: `GET....HAPPY! with id: ${id}`,
  });
});
// patch route
router.patch('/:happyId', (req, res, next) => {
  const id = req.params.happyId;
  res.status('200').json({
    message: `Updating....HAPPY! with id: ${id}`,
  });
});
// delete one item route
router.delete('/:happyId', (req, res, next) => {
  const id = req.params.happyId;
  res.status('200').json({
    message: `Deleting your ...Happiness! with id: ${id}`,
  });
});

// post route for adding an item
router.post('/', (req, res, next) => {
  const happyRecord = new Happy({
    _id: new mongoose.Types.ObjectId(),
    date: Date.now(),
    happyScore: req.body.happyScore,
    sleepHours: req.body.sleepHours,
    exercise: req.body.exercise,
    kindness: req.body.kindness,
    exerciseLevel: req.body.exerciseLevel,
    kindnessNote: req.body.kindnessNote,
    gratitudeNote: req.body.gratitudeNote,
  });

  happyRecord
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status('200').json({
    message: 'POST....HAPPINESS!',
    happyRecord: happyRecord,
  });
});

module.exports = router;
