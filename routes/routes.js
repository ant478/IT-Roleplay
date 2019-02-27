const express = require('express');
const helloWorldController = require('../src/controllers/helloWorldController');

const router = express.Router();

router.get('/', helloWorldController.index);

module.exports.router = router;
