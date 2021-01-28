const cardsRouter = require('express').Router();
const {
  cardsList,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
} = require('../controllers/cards');

cardsRouter.get('/', cardsList);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', cardLike);
cardsRouter.delete('/:cardId/likes', cardLikeRemove);

module.exports = cardsRouter;
