// route file for /happy url

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// import mongoose models
const Happy = require('../models/happy');
// GET ROUTE
router.get('/', (req, res, next) => {
  Happy.find()
    .exec()
    .then((results) => {
      if (results.length >= 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: 'No documents found... looks like the collection is empty',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  // res.status('200').json({
  //   message: 'GET....HAPPINESS!',
  // });
});

// GET ONE ITEM
router.get('/:happyId', (req, res, next) => {
  //EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
  const id = req.params.happyId;
  Happy.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No document found for that ID',
        });
      }
    })
    .catch((err) => {});
});

// PATCH
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
router.patch('/:happyId', (req, res, next) => {
  const id = req.params.happyId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Happy.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  // res.status('200').json({
  //   message: `Updating....HAPPY! with id: ${id}`,
  // });
});

// DELETE
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
router.delete('/:happyId', (req, res, next) => {
  const id = req.params.happyId;
  Happy.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// POST ONE ITEM
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

  happyRecord.save().then((result) => {
    res
      .status('200')
      .json({
        message: 'SUCCESSFUL...POST....HAPPINESS!',
        happyRecord: result,
      })
      .catch((err) => {
        res.status(500).json({
          message: 'SUCCESSFUL...POST....HAPPINESS!',
          error: err,
        });
        console.log(err);
      });
  });
});

module.exports = router;
