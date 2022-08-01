const { User } = require('../models');

const userController = {
    // add new user
  createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    // Find All users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path:'thoughts',
            select: '-__v'
        })
        .populate({ 
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get one user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    // update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUserData => {
           if(!dbUserData) {
            res.status(404).json({ message: 'no user found with this id'});
            return; 
        }
        res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user and thoughts
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res. json(dbUserData))
        .catch(err => res.json(err))
    },
    // add friend to user
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({message: 'no user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // delete a friend from user
    deleteFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUserData => {
        if(!dbUserData) {
        res.status(400).json({message: 'no user found with that id'});
        return;
    }
    res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
}
};

module.exports = userController;