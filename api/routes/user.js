// IMPORTS
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
const userController = require('../controllers/userController');

// POSTS ROUTE TO CREATE A USER
//--------------------------------------//
// example URL:  http://localhost:5000/users/signup
// requires JWT TOKEN to bet set in Headers (Authorization Bearer <JWT_TOKEN>)
router.post('/signup', checkAuth, userController.user_create_one);

// DELETE USER ROUTE
//--------------------------------------//
// requires JWT TOKEN to bet set in Headers (Authorization Bearer <JWT_TOKEN>)
router.delete('/:userId', checkAuth, userController.user_delete_one);

// LOGIN USER ROUTE
//--------------------------------------//
// Will return a valid JWT_TOKEN for the user
router.post('/login', userController.user_login);
module.exports = router;
