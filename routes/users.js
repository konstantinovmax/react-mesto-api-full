const usersRouter = require('express').Router();
const {
  usersList,
  doesUserExist,
  updateUser,
  updateUserAvatar,
  getUserData,
} = require('../controllers/users');

usersRouter.get('/', usersList);
usersRouter.get('/me', getUserData);
usersRouter.get('/:id', doesUserExist);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
