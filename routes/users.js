const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllUsers,
  //createUser,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
// router.post('/', createUser);
router.get('/me', auth, getCurrentUser);
router.patch('/:id', auth, updateUser);

module.exports = router;