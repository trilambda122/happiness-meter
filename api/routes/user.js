const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// import user model
const User = require('../models/user');
const user = require('../models/user');

// POSTS ROUTE TO CREATE A USER
//--------------------------------------//
router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // check if email - user already exists in the database
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(422).json({
          message: 'User already exists',
        });
      } else {
        // hash the password sent by the user
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: 'error hashing password',
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: email,
              password: hash,
            });
            console.log(user);
            // save user to the database
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: 'USER SAVED',
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  message: 'Probleming saving user',
                  error: err,
                });
              });
          }
        });
      }
    });
});

// DELETE USER ROUTE
//--------------------------------------//
router.delete('/:userId', (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User Deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
