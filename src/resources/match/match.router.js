const { Router } = require('express');
const matchController = require('./match.controller');
const router = Router();

router.route('/').get(matchController.getAll).post(matchController.create);

router
  .route('/:id')
  .get(matchController.getOne)
  .put(matchController.update)
  .delete(matchController.remove);

router.route('/:id/matches').get(matchController.getMatchesById);

module.exports = router;
