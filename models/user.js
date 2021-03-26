const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { message } = require('../utils/errorsMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    minlength: 2,
    validate: {
      validator(value) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(value);
      },
      message: 'Введите правильный URL',
    },
  },
  socialLinks: [{
    type: String,
    required: false,
    minlength: 2,
    validate: {
      validator(value) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(value);
      },
      message: 'Введите правильный URL',
    },
  }],
  followings: [{
    type: String,
    required: false,
    minlength: 15,
  }],
  ratingFilms: [
    {
      name: {
        type: String,
        default: 'Интерстеллар',
        // required: true,
      },
      date: {
        type: String,
        default: '2014',
        //  required: true,

      },
      position: {
        type: Number,
        default: 1,
        // required: true,
      },
      link: {
        type: String,
        //default: 'Интерстеллар',
      },
      new: {
        type: Boolean,
        //default: false, ?
      },

      // mix: {
      //   type: mongoose.Schema.Types.Mixed,
      //   default: {}
      // }
    }
  ]
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(message.emailOrPasswordError));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(message.emailOrPasswordError));
          }

          return user;
        });
    });
};

module.exports = mongoose.model(
  'user', userSchema,
);
