const express = require('express');

const moduleController = require('../controller/moduleController.js');

const router = express.Router();

router.param('id', moduleController.checkModuleId )

router
    .route('/')

    .get(moduleController.getModules)

    .post(moduleController.checkModuleNameExist, moduleController.createModule);


router
    .route('/:id')

    .delete( moduleController.deleteModule );


module.exports = router;