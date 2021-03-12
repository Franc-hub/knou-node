const { Router } = require('express');
const likeController = require('./like.controller');
const router = Router();

router
.route('/')
.get(likeController.getAll)
.post(likeController.create);

router
  .route('/:id')
  .get(likeController.getOne)
  .put(likeController.update)
  .delete(likeController.remove);

module.exports = router;
