const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const cardsList = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      return next(err);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id карточки');
      }
      return next(err);
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не удалось найти карточку');
      }
      return Card.findById(req.params.cardId)
        .then(() => {
          if (card.owner.toString() !== req.user._id) {
            throw new ForbiddenError('Нет доступа');
          }
          return Card.findByIdAndRemove(req.params.cardId)
            .then((c) => {
              res.status(200).send(c);
            });
        });
    })
    .catch(next);
};

const cardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id карточки');
      }
      return next(err);
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не удалось найти карточку');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const cardLikeRemove = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id карточки');
      }
      return next(err);
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не удалось найти карточку');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  cardsList,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
};
