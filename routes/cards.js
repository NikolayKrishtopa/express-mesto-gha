const routerCards = require('express').Router();

routerCards.get('/cards', (req, res) => {
  res.send('вернули массив карточек');
});

routerCards.post('/cards', (req, res) => {
  res.send('создали новую карточку');
});

routerCards.delete('/cards/:cardId', (req, res) => {
  res.send(`удалили карточку c id ${req.params.cardId}`);
});

module.exports = routerCards;
