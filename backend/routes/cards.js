const cardsRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  cardsList,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
} = require('../controllers/cards');

cardsRouter.get('/', cardsList);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30), // eslint-disable-next-line
    link: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Некорректно указан url'),
  }),
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), cardLike);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), cardLikeRemove);

module.exports = cardsRouter;
