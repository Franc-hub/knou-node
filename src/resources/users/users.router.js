const { Router } = require('express');
const usersController = require('./users.controller');
const multer = require('multer');
const upload = multer();
const router = Router();

router.route('/').get(usersController.getAll).post(usersController.create);

router.route('/:id/test').post(usersController.getUsersByPreferences);

router
  .route('/:id')
  .get(usersController.getOne)
  .put(usersController.update)
  .delete(usersController.remove);


module.exports = router;
