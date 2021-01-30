const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const usersList = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const doesUserExist = (req, res, next) => {
  User.findById(req.params.id)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id пользователя');
      }
      return next(err);
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не удалось найти пользователя');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email: email }) // eslint-disable-line
    .then((u) => {
      if (u) {
        throw new ConflictError('Указанный email уже занят');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          }
          return next(err);
        })
        .then((user) => {
          const { email, _id } = user; // eslint-disable-line

          return res.status(200).send({ data: { email, _id } });
        })
        .catch(next);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      return next(err);
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не удалось найти пользователя');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      return next(err);
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не удалось найти пользователя');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Некорректные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Некорректные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token }); // Применить запись JWT в httpOnly куку
    })
    .catch(next);
};

const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id пользователя');
      }
      return next(err);
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не удалось найти пользователя');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  usersList,
  doesUserExist,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUserData,
};
