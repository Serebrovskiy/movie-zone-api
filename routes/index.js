const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const filmsRouter = require('./films');
const { validateCreateUser, validateLogin } = require('../middlewares/requestValidation');
const NotFoundError = require('../errors/not-found-err');
const { message } = require('../utils/errorsMessages');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', usersRouter);
router.use('/films', filmsRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError(message.notFoundRes));
});

module.exports = router;
