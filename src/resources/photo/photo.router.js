const { Router } = require('express');
const photoController = require ('./photo.controller');
const multer = require('multer');
const upload = multer();
const router = Router();

router
    .route('/:id/photos')
    .put(upload.single("photo"), photoController.uploadPhoto)
    .get(photoController.getByUser);


    module.exports = router;