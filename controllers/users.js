const User = require('../models/user');

const patchRequestOptions = require('../utils/utils');

const errorHandler = require('../middlewares/errorHandler');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, patchRequestOptions)
    .then((user) => res.send(user))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, patchRequestOptions)
    .then((user) => res.send(user))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};
