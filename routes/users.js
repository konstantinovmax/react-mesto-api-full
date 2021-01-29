const usersRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  usersList,
  doesUserExist,
  updateUser,
  updateUserAvatar,
  getUserData,
} = require('../controllers/users');

usersRouter.get('/', usersList);
usersRouter.get('/me', getUserData);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), doesUserExist);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({ // eslint-disable-next-line
    avatar: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Некорректно указан url'),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
