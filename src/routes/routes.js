const express = require('express');
const asyncHandler = require('express-async-handler');
const usersController = require('../controllers/usersController');
const charactersController = require('../controllers/charactersController');

const router = express.Router();

// Users
router.post('/user/register', asyncHandler(usersController.register));
router.post('/user/login', asyncHandler(usersController.login));
router.post('/user/logout', asyncHandler(usersController.logout));

// Characters
router.route('/characters')
  .get(asyncHandler(charactersController.index))
  .post(asyncHandler(charactersController.new));

router.route('/characters/:characterId')
  .get(asyncHandler(charactersController.view))
  .put(asyncHandler(charactersController.update))
  .delete(asyncHandler(charactersController.delete));

module.exports.router = router;
