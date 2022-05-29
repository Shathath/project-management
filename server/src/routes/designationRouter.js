const express = require('express');

const designationController = require('../controller/designationController');

const designationRouter = express.Router();

designationRouter.get('/getuser', designationController.getUser);

designationRouter.get('/getalluser', designationController.getAllUser);

designationRouter.post('/createuser', designationController.createUser);

module.exports = designationRouter;