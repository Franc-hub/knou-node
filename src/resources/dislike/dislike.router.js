const { Router } = require('express');
const dislikeController = require('./dislike.controller');
const router = Router();

router.route('/')
    .get(dislikeController.getAll)
    .post(dislikeController.create);

router
    .route('/:id')
    .get(dislikeController.getOne)
    .put(dislikeController.update)
    .delete(dislikeController.remove);

module.exports = router;