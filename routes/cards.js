const routerCards = require('express').Router();
const {
  getAllCards, getCardById, createCard, removeCardById,
} = require('../controllers/cards');

routerCards.get('/cards', getAllCards);

routerCards.get('/cards/:cardId', getCardById);

routerCards.post('/cards', createCard);

routerCards.delete('/cards/:cardId', removeCardById);

module.exports = routerCards;
