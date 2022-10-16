const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.send(`произошла ошибка ${err.name}: ${err.message}`));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.send(`произошла ошибка ${err.name}: ${err.message}`));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id, likes: [], createdAt: new Date(),
  })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send(`произошла ошибка ${err.name}: ${err.message}`));
};

module.exports.removeCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.send(`произошла ошибка ${err.name}: ${err.message}`));
};
