const express = require('express');

const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/users/:id', userController.getUser);

userRouter.get('/users', userController.getAllUsers);

userRouter.post('/users', userController.createUser);

userRouter.get('/users/designations/:id', userController.usersByDesignation)

userRouter.get('/login', userController.createUser);

module.exports = userRouter;