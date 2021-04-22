// route file for /happy url

const express = require('express');
const router = express.Router();

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
  res.status('200').json({
    message: 'POST....HAPPINESS!',
  });
});

module.exports = router;
