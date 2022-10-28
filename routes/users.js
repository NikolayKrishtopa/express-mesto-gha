const routerUsers = require('express').Router();
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getMyProfile,
} = require('../controllers/users');

const userParamsValidator = require('../middlewares/requestValidators/userParamsValidator');
const userDataValidator = require('../middlewares/requestValidators/userDataValidator');
const userAvatarValidator = require('../middlewares/requestValidators/userAvatarValidator');

routerUsers.get('/users', getAllUsers);

routerUsers.get('/users/me', getMyProfile);

routerUsers.get('/users/:userId', userParamsValidator, getUserById);

routerUsers.patch('/users/me', userDataValidator, updateProfile);

routerUsers.patch('/users/me/avatar', userAvatarValidator, updateAvatar);

module.exports = routerUsers;
