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
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},
// Delete a thought
async deleteThought(req, res) {
    try {
      const thought= await Course.findOneAndDelete({ _id: req.params.thouhgtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
// Need help with this portion of the delete
      await Thought.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Course and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
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
      res.status(500).json(err);
    }
  },

};