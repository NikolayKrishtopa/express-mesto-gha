const validator = require('validator');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

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
      if (!user) { return Promise.reject(new Error('Неправильная почта или пароль')); }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) { return Promise.reject(new Error('Неправильная почта или пароль')); }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
