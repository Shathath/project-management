var express =  require('express');

var taskController = require('../controller/taskController');

var taskRouter = express.Router();

taskRouter.get('/gettask/:id', taskController.getTask );

taskRouter.get('/getalltask', taskController.getAllTasks);

taskRouter.post('/createtask', taskController.createTask);

module.exports = taskRouter;
