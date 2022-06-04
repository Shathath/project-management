const express = require('express');

const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/getuser', userController.getUser);

userRouter.get('/getalluser', userController.getAllUsers);

userRouter.post('/createuser', userController.createUser);

userRouter.get('/login', userController.createUser);

module.exports = userRouter;