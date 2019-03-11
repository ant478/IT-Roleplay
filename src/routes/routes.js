const express = require('express');
const usersController = require('../controllers/usersController');
const charactersController = require('../controllers/charactersController');

const router = express.Router();

// Users
router.post('/user/register', usersController.register);
router.post('/user/login', usersController.login);
router.post('/user/logout', usersController.logout);

// Characters
router.route('/characters')
  .get(charactersController.index)
  .post(charactersController.new);

router.route('/characters/:characterId')
  .get(charactersController.view)
  .put(charactersController.update)
  .delete(charactersController.delete);

module.exports.router = router;
