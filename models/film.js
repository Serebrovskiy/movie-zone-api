const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 40,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    // required: true,
    minlength: 2,
    validate: {
      validator(value) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(value);
      },
      message: 'Введите правильный URL',
    },
  },
  genres: [{
    type: String,
    // required: false,
  }],
  country: {
    type: String,
    // required: false,
  },
  director: {
    type: String,
    // required: false,
  },
  actors: [{
    type: String,
    // required: false,
  }],
  checked: {
    type: Boolean,
    // required: false,
  },
  totalRange: {
    type: Number,
    // required: false,
  },
  id: {
    type: Number,
    // required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

});
module.exports = mongoose.model(
  'film', filmSchema,
);