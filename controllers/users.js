const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.send(`произошла ошибка ${err.name}: ${err.message}`));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => res.send(users))
    .catch((err) => res.send(`произошла ошибка ${err.name}: ${err.message}`));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(`Произошла ошибка ${err.message}`));
};
