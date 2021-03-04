const { Router } = require('express');
const usersController = require('./users.controller');
const multer = require('multer');
const upload = multer();
const router = Router();

router.route('/').get(usersController.getAll).post(usersController.create);

router.route('/:id/candidates').get(usersController.getUsersByPreferences);

router
  .route('/:id')
  .get(usersController.getOne)
  .put(usersController.update)
  .delete(usersController.remove);

router
    .route('/:id/photos')
    .put(upload.single("photo"), usersController.uploadPhoto)
    .get(usersController.getByUser);

router
.route('/geo').post(usersController.createGeoLocation);



module.exports = router;
