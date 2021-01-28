const Card = require('../models/card');

const cardsList = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Не удалось загрузить список карточек' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Не удалось найти карточку' });
      }
      return Card.findById(req.params.cardId)
        .then(() => {
          if (card.owner.toString() !== req.user._id) {
            return res.status(403).send({ message: 'Нет доступа' });
          }
          return Card.findByIdAndRemove(req.params.cardId)
            .then((c) => {
              res.status(200).send(c);
            });
        });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректно указан id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

/* const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Не удалось найти карточку' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректно указан id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
}; */

const cardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Не удалось найти карточку' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректно указан id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const cardLikeRemove = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Не удалось найти карточку' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректно указан id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  cardsList,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
};
