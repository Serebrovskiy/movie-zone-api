const Film = require('../models/film');

module.exports.getAllFilms = (req, res) => {
  Film.find({})
    .then((film) => res.status(200).send(film))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createFilm = (req, res) => {
  // console.log(req.user);
  // const { _id } = req.user;
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
    id
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
    id
  })  //,  owner: _id 
    .then((film) => {
      res.send({ data: film });
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
      // if (card.owner.toString() === req.user._id) {
      res.send({ data: film });
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
    id
  } = req.body;

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
      id
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((film) => res.send({ data: film }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};