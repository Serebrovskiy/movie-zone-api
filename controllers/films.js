const Film = require('../models/film');

module.exports.getAllFilms = (req, res, next) => {
  Film.find({})
    .then((film) => res.status(200).send(film))
    .catch(next);
};

module.exports.createFilm = (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  const {
    name,
    date,
    link,
    genres,
    country,
    director,
    actors,
    checked,
    //totalRange,
    // id
  } = req.body;

  Film.create({
    name,
    date,
    link,
    genres,
    country,
    director,
    actors,
    checked,
    totalRange: 0,
    // id: 0,
    owner: _id
  })  //,  owner: _id 
    .then((film) => {
      res.send(film);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteFilm = (req, res) => {

  Film.findByIdAndRemove(req.params.id)
    // .orFail(new Error('NotValidId'))
    .then((film) => {
      console.log(film)
      // if (card.owner.toString() === req.user._id) {
      res.send(film);
      // } else {
      //   throw new Error('You cannot delete this card');
      // }
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateFilm = (req, res) => {

  console.log(req.body)
  const {
    name,
    date,
    link,
    genres,
    country,
    director,
    actors,
    checked,
    totalRange,
    // id
  } = req.body;

  console.log('req.body')
  console.log(req.body)
  console.log('name')
  console.log(name)

  Film.findByIdAndUpdate(
    req.params.id,
    {
      name,
      date,
      link,
      genres,
      country,
      director,
      actors,
      checked,
      totalRange,
      // id
    },
    // req.body,
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((film) => {
      console.log('film')
      console.log(film)
      res.send(film)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};