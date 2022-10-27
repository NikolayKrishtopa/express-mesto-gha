const bcrypt = require('bcryptjs');
const UnauthorizedError = require('./errors/UnauthorizedError');

const patchRequestOptions = {
  new: true,
  runValidators: true,
  upsert: false,
};

function findUserBeCredentials(email, password) {
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
}

module.exports = { patchRequestOptions, findUserBeCredentials };
