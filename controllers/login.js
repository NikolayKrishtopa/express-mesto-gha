const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'Nikolay\'s key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      }).status(200).send('message: Пользователь успешно вошел в учетную запись');
    })
    .catch(() => res.status(401).send({ message: 'Проверьте правильность введенных данных' }));
};
