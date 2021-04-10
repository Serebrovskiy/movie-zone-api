const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllUsers,
  //createUser,
  getCurrentUser,
  updateUser,
  userAddFollowing,
  updateAvatar,
  updateSocialLinks,
  deleteUser
} = require('../controllers/users');

router.get('/', getAllUsers);
// router.post('/', createUser);
router.get('/me', auth, getCurrentUser);
router.patch('/:id', auth, updateUser);
router.patch('/followings/:id', auth, userAddFollowing);
router.patch('/avatar/:id', auth, updateAvatar);
router.patch('/social-links/:id', auth, updateSocialLinks);
router.delete('/:id', auth, deleteUser);

module.exports = router;