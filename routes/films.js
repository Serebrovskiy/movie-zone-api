const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllFilms,
  getFilm,
  createFilm,
  deleteFilm,
  updateFilm
} = require('../controllers/films');

router.get('/', getAllFilms);
router.get('/:id', getFilm);
router.post('/', auth, createFilm);
router.delete('/:id', auth, deleteFilm);
router.patch('/:id', updateFilm);

module.exports = router;