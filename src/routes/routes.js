const express = require('express');
const asyncHandler = require('express-async-handler');
const usersController = require('../controllers/usersController');
const charactersController = require('../controllers/charactersController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

// Users
router.get('/user/isLoggedIn', usersController.isLoggenIn);
router.post('/user/register', asyncHandler(usersController.register));
router.post('/user/login', asyncHandler(usersController.login));
router.post('/user/logout', isAuthenticated, asyncHandler(usersController.logout));

// Characters
router.route('/characters')
  .get(asyncHandler(charactersController.index))
  .post(isAuthenticated, asyncHandler(charactersController.new));

router.route('/characters/:characterId')
  .get(asyncHandler(charactersController.view))
  .put(isAuthenticated, asyncHandler(charactersController.update))
  .delete(isAuthenticated, asyncHandler(charactersController.delete));

module.exports.router = router;
