const Card = require('../models/card');

const errorHandler = require('../middlewares/errorHandler');

const patchRequestOptions = require('../utils/utils');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id, likes: [], createdAt: new Date(),
  })
    .then((card) => res.send(card))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.removeCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.likeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => res.send(card.likes))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.unlikeCardById = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => res.send(card.likes))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};
