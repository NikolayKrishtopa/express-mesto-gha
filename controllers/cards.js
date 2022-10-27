const mongoose = require('mongoose');

const Card = require('../models/card');

const patchRequestOptions = require('../utils/utils');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id, likes: [], createdAt: new Date(),
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: ['Проверьте правильность введённых данных'] });
        return;
      }
      res.status(500).send({ message: ['Ошибка по умолчанию'] });
    });
};

module.exports.removeCardById = (req, res) => {
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
    return;
  }
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
      } else if (req.user._id !== card.owner._id.toString()) {
        res.status(401).send({ message: 'у вас нет прав на удаление этой карточки' });
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => { res.send(card); })
          .catch(() => Promise.reject(new Error('Что-то пошло не так')));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCardById = (req, res) => {
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Вы обращаетесь к несуществующей карточке' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.unlikeCardById = (req, res) => {
  if (req.params.cardId.length !== 24) {
    res.status(400).send({ message: 'Проверьте правильность запрашиваемых данных' });
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions,
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Вы обращаетесь к несуществующей карточке' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Проверьте правильность введённых данных' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'По вашему запросу ничего не найдено' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
