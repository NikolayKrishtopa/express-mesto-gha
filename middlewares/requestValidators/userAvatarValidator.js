const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }).unknown(true),
});
