const express = require('express');

const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter
        .route('/')

        .get( userController.getAllUsers )

        .post( userController.checkMandatoryFieldsForUserCreation, userController.createUser );


userRouter
        .route('/:id')

        .get( userController.getUser )


module.exports = userRouter;