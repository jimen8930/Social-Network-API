const { Thoughts, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Get a single thought
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
              res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
// Create a new thought
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
          if (!user) {
            return res.status(404).json({message: 'No user with this id!'})
          }
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

  // Update a thought
  async updateThoought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
  },
  // Delete a thought
async deleteThought(req, res) {
    try {
      const thought= await Course.findOneAndDelete({ _id: req.params.thouhgtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      const user = await User.findOneAndUpdate(
        { thought: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactiion: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction (req, res) {
    try {
      const thought = await Reaction.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};