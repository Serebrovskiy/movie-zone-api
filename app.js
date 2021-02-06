const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorsHandler = require('./middlewares/errorsHandler');

require('dotenv').config();
const { MONGODB } = require('./config');
const { limiter } = require('./middlewares/rateLimiter');
const router = require('./routes/index');

const app = express();
// const usersRouter = require('./routes/users');
// const filmsRouter = require('./routes/films');

const { PORT = 3001 } = process.env;
//const PORT = 3001;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // useUnifiedTopology: true
});

app.use(cors());
//app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errors());
app.use(errorsHandler);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});