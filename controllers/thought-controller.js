const { Thought, User } = require('../models');

const thoughtController = {
    // add new thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: {thoughts: _id}},
                { new: true }
            );
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "no user found with that id"});
                return;
            }
            else {
            res.json(dbThoughtData);}
        }) 
         .catch(err => res.status(400).json(err));     
    },

    
    // get All thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v"
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
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
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
},
// add reaction
addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        { $push: {reactions: body }},
        { new: true }
        )
    .then((dbThoughtData) => {
        if(!dbThoughtData) {
            res.status(404).json({message: "there is no thought with this id"});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
},
// delete reaction
deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        { $pull: {reactions: {reactionId: params.reactionId}}},
        { new: true }
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
},
};

module.exports = thoughtController;
