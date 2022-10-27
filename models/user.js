const validator = require('validator');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) { return validator.isEmail(v); },
      message: 'Адрес электронной почты введен в неправильном формате',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) { throw new UnauthorizedError('Неправильная почта или пароль'); }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) { throw new UnauthorizedError('Неправильная почта или пароль'); }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
