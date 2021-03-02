const { Router } = require('express');
const messageController = require('./message.controller');
const router = Router();

router.route('/').get(messageController.getAll).post(messageController.create);

router
  .route('/:id')
  .get(messageController.getOne)

  module.exports = router;