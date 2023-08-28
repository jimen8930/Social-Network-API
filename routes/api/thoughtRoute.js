const router = require('express').Router();
const {
    getThoughts,
    // getSingleThought,
    createThought,
    // updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
  } = require('../../controllers/thoughtController.js');

  router.route('/').get(getThoughts).post(createThought);
  router
  .route('/:thoughtID')
  // .get(getSingleThought)
  // .put(updateThought)
  .delete(deleteThought);

  router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

  module.exports = router;