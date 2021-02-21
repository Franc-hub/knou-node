const { Router } = require('express');
const usersController = require('./users.controller');
const router = Router();

router.route('/').get(usersController.getAll).post(usersController.create);

router.route('/:id/test').post(usersController.getUsersByPreferences);

router
  .route('/:id')
  .get(usersController.getOne)
  .put(usersController.update)
  .delete(usersController.remove);

//router.route('/random').get(usersController.getRandom);

module.exports = router;
