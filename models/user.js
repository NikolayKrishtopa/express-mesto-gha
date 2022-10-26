const validator = require('validator');

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
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: {
  //     validator(v) { validator.isEmail(v); },
  //     message: 'Адрес электронной почты введен в неправильном формате',
  //   },
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 4,
  // },
});

module.exports = mongoose.model('user', userSchema);
