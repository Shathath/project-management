var express = require('express');

const projectsController = require('../controller/projectController');

const projectsRouter = express.Router();

projectsRouter
            .route('/')

            .get(projectsController.getAllProjects)

            .post(projectsController.createProject)


projectsRouter
            .route('/:id')

            .get(projectsController.getTaskByProject)


// projectsRouter.get('/getproject', projectsController.getProject);

// projectsRouter.get('/getallprojects', projectsController.getAllProjects);

// projectsRouter.post('/createproject', projectsController.createProject);

// projectsRouter.get('/getprojecttasks/:id', projectsController.getTaskByProject);

// projectsRouter.get('/fetchprojects', projectsController.getProjectsByLimit );

// projectsRouter.get('/projects/:id/users', projectsController.getProjectUsers );

// projectsRouter.post('/projects/users', projectsController.addUsersToProject );

module.exports = projectsRouter;