const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) { res.status(401).send({ message: 'Необходима авторизация' }); }
  let payload;
  try {
    payload = jwt.verify(token, 'Nikolay\'s key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = { _id: payload._id };
  return next();
};
