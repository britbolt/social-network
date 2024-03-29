const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)

router
.route('/:userId')
.post(createThought);

router
.route('./:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('./:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction);

module.exports = router;