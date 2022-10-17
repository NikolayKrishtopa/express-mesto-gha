const Card = require('../models/card');

const errorHandler = require('../middlewares/errorHandler');

const patchRequestOptions = require('../utils/utils');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.getCardById = (req, res) => {
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
  }
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
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
  }
  Card.findByIdAndRemove(req.params.cardId)
    .then(((card) => {
      if (!card) {
        res.status(400).send({ message: 'Вы пытаетесь удалить несуществующую карточку' });
      } else {
        res.send(card);
      }
    }))
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.likeCardById = (req, res) => {
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      res.status(400).send({ message: 'Вы обращаетесь к несуществующей карточке' });
    } else {
      res.send(card.likes);
    }
  })
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};

module.exports.unlikeCardById = (req, res) => {
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      res.status(400).send({ message: 'Вы обращаетесь к несуществующей карточке' });
    } else {
      res.send(card.likes);
    }
  })
    .catch((err) => res.status(errorHandler(err).statusCode).send(errorHandler(err).response));
};
