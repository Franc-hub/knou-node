const { Router } = require('express');
const usersController = require('./users.controller');
const { body } = require('express-validator');
const multer = require('multer');
const upload = multer();
const router = Router();

router
  .route('/')
  .get(usersController.getAll)
  .post(
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long'),
    usersController.create
  );

router.route('/:id/candidates').get(usersController.getUsersByPreferences);

router
  .route('/:id')
  .get(usersController.getOne)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
