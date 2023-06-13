const express = require('express');

const userController = require('../controller/userController');

const authController = require('../controller/authController');

const userRouter = express.Router();


userRouter.route('/resetPassword/:token')
        
          .patch( authController.resetPassword )


userRouter
        .route('/')

        .get( authController.verifyUser, userController.getAllUsers )

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

userRouter.route('/forgotPassword')
        
          .post( authController.forgotPassword )
          
          

module.exports = userRouter;