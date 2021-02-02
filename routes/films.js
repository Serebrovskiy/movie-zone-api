const router = require('express').Router();

const {
  getAllFilms,
  createFilm,
  deleteFilm,
  updateFilm
} = require('../controllers/films');

router.get('/', getAllFilms);
router.post('/', createFilm);
router.delete('/:id', deleteFilm);
router.patch('/:id', updateFilm);

module.exports = router;