const routerCards = require('express').Router();
const {
  getAllCards, createCard, removeCardById, likeCardById, unlikeCardById,
} = require('../controllers/cards');

const cardBodyValidator = require('../middlewares/requestValidators/cardBodyValidator');
const cardParamsValidator = require('../middlewares/requestValidators/cardParamsValidator');

routerCards.get('/cards', getAllCards);

routerCards.post('/cards', cardBodyValidator, createCard);

routerCards.delete('/cards/:cardId', cardParamsValidator, removeCardById);

routerCards.put('/cards/:cardId/likes', cardParamsValidator, likeCardById);

routerCards.delete('/cards/:cardId/likes', cardParamsValidator, unlikeCardById);

module.exports = routerCards;
