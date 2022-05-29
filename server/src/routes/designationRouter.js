
const express = require('express');

const designationController = require('../controller/designationController');

const designationRouter = express.Router();

//designationRouter.get('/getuser', designationController.getAllDesignation);

designationRouter.get('/getalldesignation', designationController.getAllDesignation);

designationRouter.post('/createdesignation', designationController.createDesignation);

module.exports = designationRouter;