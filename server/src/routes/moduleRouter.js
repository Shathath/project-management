const express = require('express');

const moduleController = require('../controller/moduleController.js');

const router = express.Router();


router
    .route('/')

    .get(moduleController.getModules)

    .post(moduleController.checkModuleNameExist, moduleController.createModule)



module.exports = router;