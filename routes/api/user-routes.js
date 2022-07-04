const router = require('express').Router();

const {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser

} = require('../../controllers/user-controller');

router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('./:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;