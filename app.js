const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const usersRouter = require('./routes/users');
const filmsRouter = require('./routes/films');

mongoose.connect('mongodb://localhost:27017/movie-zone-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/films', filmsRouter);

app.use(() => {
  throw new Error('Запрашиваемый ресурс не найден');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});