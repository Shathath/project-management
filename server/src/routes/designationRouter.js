
const express = require('express');

const designationController = require('../controller/designationController');

const designationRouter = express.Router();

//designationRouter.get('/getuser', designationController.getAllDesignation);

designationRouter.get('/designations', designationController.getAllDesignation);

designationRouter.post('/designations', designationController.createDesignation);

module.exports = designationRouter;