const routerUsers = require('express').Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/users');

routerUsers.get('/users', getAllUsers);

routerUsers.get('/users/:userId', getUserById);

routerUsers.post('/users', createUser);

module.exports = routerUsers;
