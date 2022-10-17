const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const express = require('express');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '634c6c0ebda23aa42d5c668e',
  };

  next();
});

app.use('/', routerCards);
app.use('/', routerUsers);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'По вашему запросу ничего не найдено' });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
