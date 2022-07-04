const { Thought, User } = require('../models');

const thoughtController = {
    // add new thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: {thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "no user found with that id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // delete thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deleteThought => {
            if (!deleteThought) {
                res.status(404).json({ message: 'no thought with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // get All thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
},
// update thought using id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbThoughtData => {
         if(!dbThoughtData) {
          res.status(404).json({ message: 'no thoughts found with this id'});
          return; 
    }
    res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},
// get single thought by id
getThoughtById({params}, res) {
    Thought.findOne({_id: params.id})
    .then((dbThoughtData) => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'no thought found with this id'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).son(err);
    })
}

}

module.exports = thoughtController;
