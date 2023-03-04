
const express = require('express');

const designationController = require('../controller/designationController');

const designationRouter = express.Router();

//designationRouter.get('/getuser', designationController.getAllDesignation);

designationRouter.get('/', designationController.getAllDesignation);

designationRouter.post('/', designationController.createDesignation);

module.exports = designationRouter;