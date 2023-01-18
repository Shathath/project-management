const express = require('express');

const userController = require('../controller/userController');

const authController = require('../controller/authController');

const userRouter = express.Router();

userRouter
        .route('/')

        .get( userController.getAllUsers )

        .post( userController.checkMandatoryFieldsForUserCreation, userController.createUser );


userRouter
        .route('/:id')

        .get( userController.getUser )

userRouter
        .route('/signup')

        .post( authController.userSignUp )


userRouter
        .route('/login')

        .post( authController.userLogin )


module.exports = userRouter;