const router = require('express').Router();

const {
    createUser,
    getUserByUsername,

} = require('../../controllers/user-controller');

router
.route('/')
.get(getUser)
.post(createUser);

router
.route('./:id')
.get(getUserByUsername)
.delete(deleteThought);

module.exports = router;