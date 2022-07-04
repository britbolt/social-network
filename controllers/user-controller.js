const { User } = require('../models/User');

const userController = {
    // add new user
  createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = userController;