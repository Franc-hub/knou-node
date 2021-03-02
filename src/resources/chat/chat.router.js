const { Router } = require('express');
const chatController = require('./chat.controller');
const router = Router();

router.route('/').get(chatController.getAll).post(chatController.create);

router
  .route('/:id')
  .get(chatController.getOne)

  module.exports = router;