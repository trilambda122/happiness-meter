// IMPORTS
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const happyController = require('../controllers/happyController');

// GET ALL ITEMS
//-------------------------------------//
////EXAMPLE URl:  localhost:5000/happy/

router.get('/', checkAuth, happyController.happy_get_all);

// GET ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
router.get('/:happyId', checkAuth, happyController.happy_get_one);

// PATCH UPDATE ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
//EXAMPLE JSON (must be wrapped in an array)
// [
//   {
//       "propName":"sleepHours",
//   "value": "3"
//   }
// ]

router.patch('/:happyId', checkAuth, happyController.happy_update_one);

// DELETE ONE ITEM
//-------------------------------------//
//EXAMPLE URl:  localhost:5000/happy/6082bf69ada1d25622423fa2
router.delete('/:happyId', checkAuth, happyController.happy_delete_one);

// POST ONE ITEM
//-------------------------------------//
router.post('/', checkAuth, happyController.happy_add_one);

module.exports = router;
