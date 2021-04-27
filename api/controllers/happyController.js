// IMPORTS
const mongoose = require('mongoose');
const Happy = require('../models/happy');

// GET ALL CONTROLLER
//-------------------------------------//
exports.happy_get_all = (req, res, next) => {
  Happy.find()
    .select(
      '_id date happyScore sleepHours kindness exerciseLevel kindnessNote gratitudeNote'
    )
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        happyItems: results.map((result) => {
          return {
            _id: result._id,
            date: result.date,
            happyScore: result.happyScore,
            sleepHours: result.sleepHours,
            kindness: result.kindness,
            exerciseLevel: result.exerciseLevel,
            kindnessNote: result.kindnessNote,
            gratitudeNote: result.gratitudeNote,
            info: {
              type: 'GET',
              url: `http://localhost:5000/happy/${result._id}`,
            },
          };
        }),
      };
      if (results.length >= 0) {
        res.status(200).json(response);
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
};

// GET ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
exports.happy_get_one = (req, res, next) => {
  const id = req.params.happyId;
  Happy.findById(id)
    .select(
      '_id date happyScore sleepHours kindness exerciseLevel kindnessNote gratitudeNote'
    )
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
};

// PATCH
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2

exports.happy_update_one = (req, res, next) => {
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
};

// DELETE ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2

exports.happy_delete_one = (req, res, next) => {
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
};

// POST ONE ITEM
//-------------------------------------//
// EXAMPLE JSON:
// {
//   "happyScore": "3",
//   "sleepHours": "5",
//   "kindness": "true",
//   "exercise": "true",
//   "exerciseLevel": "high",
//   "kindnessNote": "did something super nice",
//   "gratitudeNote": "just blessed"
// }

exports.happy_add_one = (req, res, next) => {
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
      .status(201)
      .json({
        message: 'SUCCESSFUL...CREATED....HAPPINESS!',
        happyRecord: {
          _id: result._id,
          date: result.date,
          happyScore: result.happyScore,
          sleepHours: result.sleepHours,
          kindness: result.kindness,
          exerciseLevel: result.exerciseLevel,
          kindnessNote: result.kindnessNote,
          gratitudeNote: result.gratitudeNote,
          info: {
            type: 'GET',
            url: `http://localhost:5000/happy/${result._id}`,
          },
        },
      })
      .catch((err) => {
        res.status(500).json({
          message: 'SOMETHING HAS GONE WRONG',
          error: err,
        });
        console.log(err);
      });
  });
};
