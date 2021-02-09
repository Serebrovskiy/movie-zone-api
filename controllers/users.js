const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { message } = require('../utils/errorsMessages');
const { JWT_SECRET, NODE_ENV } = require('../config');

//возвращаем всех юзеров
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((film) => res.status(200).send(film))
    .catch(next);
};

// создаём пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    userName,
  } = req.body;

  console.log(req.body)
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      userName,
      ratingFilms: []
    }))
    .then((user) => {
      console.log(user)
      const userPassword = user;
      userPassword.password = '';
      res.send(userPassword);
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(message.conflictUser));
      } else next(err);
    });
};

// проверяем почту и пароль и возвращаем JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError(message.emailOrPasswordError)));
};

// возвращаем информацию о пользователе
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .populate('owner')
    .orFail(new NotFoundError(message.notFoundUser))
    .then((user) => res.send(user))
    .catch(next);
};

// обнавляем массив с карточками в юзере
module.exports.updateUser = (req, res) => {
  const ratingFilms = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { ratingFilms },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      res.send(user.ratingFilms)
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

//добавление карточки сразу в массив с карточками (не работает)
// module.exports.createRatingFilm = (req, res) => {
//   console.log(req.body);
//   console.log(User.collection);
//   //const { _id } = req.user;
//   const {
//     name,
//     date,
//     position,
//     link,
//     // isNew
//   } = req.body;

//   User.collection.insertOne(
//     // {
//     // ratingFilms: [
//     {
//       // 
//       name,
//       date,
//       position,
//       link,
//       // _id: req.user._id
//       // isNew
//     },
//     // ]
//     // }
//   )
//     .then((film) => {
//       console.log(film.ops)
//       res.send({ data: film });
//     })
//     .catch((err) => {
//       console.log(err)
//       if (err.name === 'ValidationError') {
//         res.status(400).send({ message: 'Переданы некорректные данные' });
//       } else {
//         res.status(500).send({ message: 'На сервере произошла ошибка' });
//       }
//     });
// };