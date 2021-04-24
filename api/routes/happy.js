// ROUTE FILE FOR '/happy' URL
// Shane Schilling 4-20-2021

// IMPORTS
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Happy = require('../models/happy');
const happyController = require('../controllers/happyController');

// GET ALL ITEMS
//-------------------------------------//
router.get('/', checkAuth, happyController.happy_get_all);

// GET ONE ITEM
//-------------------------------------//
router.get('/:happyId', checkAuth, happyController.happy_get_one);

// PATCH UPDATE ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
router.patch('/:happyId', checkAuth, happyController.happy_update_one);

// DELETE ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
router.delete('/:happyId', checkAuth, happyController.happy_delete_one);

// POST ONE ITEM
//-------------------------------------//
router.post('/', checkAuth, happyController.happy_add_one);

module.exports = router;
