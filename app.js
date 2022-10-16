const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const express = require('express');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use('/', routerCards);
app.use('/', routerUsers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});