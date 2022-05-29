const express = require('express');

const projectsController = require('../controller/projectsController');

const projectsRouter = express.Router();

projectsRouter.get('/getuser', projectsController.getUser);

projectsRouter.get('/getalluser', projectsController.getAllUser);

projectsRouter.post('/createuser', projectsController.createUser);

module.exports = projectsRouter;