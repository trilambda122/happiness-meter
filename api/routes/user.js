const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// LOGIN USER ROUTE
//--------------------------------------//
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email })
    .exec()
    .then((user) => {
      console.log('find user is:', user);
      if (user.length < 1) {
        res.status(401).json({
          message: 'Authorization failed',
        });
      }
      // check if password hases match
      console.log('password from database: ', user[0].password);
      bcrypt.compare(password, user[0].password, (err, result) => {
        console.log('the bcrypt result is: ', result);
        if (err) {
          return res.status(401).json({
            message: 'Authorization failed',
          });
        }
        if (result) {
          // generate a jwt token for a user
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );

          return res.status(200).json({
            message: 'Authorization Success!',
            token: token,
          });
        }
        return res.status(401).json({
          message: 'Authorization failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
