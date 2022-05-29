var express = require('express');

const projectsController = require('../controller/projectController');

const projectsRouter = express.Router();

projectsRouter.get('/getproject', projectsController.getProject);

projectsRouter.get('/getallprojects', projectsController.getAllProjects);

projectsRouter.post('/createproject', projectsController.createProjects);

module.exports = projectsRouter;