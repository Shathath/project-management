var express =  require('express');

var taskController = require('../controller/taskController');

var taskRouter = express.Router();

taskRouter
        .route('/')

        .get(  taskController.getAllTasks )

        .post( taskController.checkTaskCreateMandatoryFieldExists, taskController.createTask )


taskRouter
        .route('/:id')

        .get( taskController.getTask )

        .put( taskController.updateTask)
        

module.exports = taskRouter;
