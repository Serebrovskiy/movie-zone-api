const router = require('express').Router();

const {
  createUser,
  getCurrentUser,
  // createRatingFilm,
  updateUser
  // getUser,
} = require('../controllers/users');

// router.post('/', createUser);
router.get('/me', getCurrentUser);
//router.patch('/', createRatingFilm);
router.patch('/:id', updateUser);
//router.get('/', getUser);

module.exports = router;