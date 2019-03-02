const express = require('express');
const helloWorldController = require('../controllers/helloWorldController');

const router = express.Router();

router.get('/', helloWorldController.index);

module.exports.router = router;
