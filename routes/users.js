const routerUsers = require('express').Router();

routerUsers.get('/users', (req, res) => {
  res.send('вернули массив пользователей');
});

routerUsers.get('/users/:userId', (req, res) => {
  res.send(`вернули пользователя c id ${req.params.userId}`);
});

routerUsers.post('/users', (req, res) => {
  const { name } = req.body;
  res.send(`создали нового пользователя по имени ${name}`);
});

module.exports = routerUsers;
