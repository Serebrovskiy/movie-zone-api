const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllFilms,
  createFilm,
  deleteFilm,
  updateFilm
} = require('../controllers/films');

router.get('/', getAllFilms);
router.post('/', auth, createFilm);
router.delete('/:id', auth, deleteFilm);
router.patch('/:id', auth, updateFilm);

module.exports = router;