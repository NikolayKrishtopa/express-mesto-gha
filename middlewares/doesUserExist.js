const User = require('../models/user');

function doesUserExist(req, res, next) {
  if (req.method === 'GET' && !User.findById(req.params.userId)) {
    res.send('Пользватель с такими данными не найден');
    return;
  }
  if (req.method === 'POST' && User.findOne({ name: req.body.name, about: req.body.about })) {
    res.send('Пользватель с такими данными уже существует');
    return;
  }
  next();
}

module.exports = doesUserExist;
