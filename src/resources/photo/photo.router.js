const { Router } = require('express');
const photoController = require('./photo.controller');
const multer = require('multer');
const upload = multer();
const router = Router();

router
    .route('/:userId/photos')
    .put(upload.single("photo"), photoController.uploadPhoto)
    .get(photoController.getByUser)
router
    .route('/:userId/photos/:photoId')
    .delete(photoController.eliminatePhoto)


module.exports = router;