const { Thought } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

 // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
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

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // await User.deleteMany({ _id: { $in: thought.user } });
      res.json({ message: 'thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Create a reaction
  async createReaction(req, res) {
    try {
      const { reactionBody, username } = req.body;

      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }

      thought.reactions.push({
        reactionBody,
        username
      });

      const savedThought = await thought.save();
      res.status(201).json(savedThought);
    } catch (error) {
      res.status(500).json({ error: 'Could not create the reaction.' });
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const thought = await Thought.findById(thoughtId).select('-__v');
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
      console.log('Provided thoughtId:', thoughtId);
      console.log('Provided reactionId:', reactionId);
      console.log('Thought object:', thought);

      const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === reactionId);

      if (reactionIndex === -1) {
        return res.status(404).json({ error: 'Reaction not found.' });
      }
  
      thought.reactions.splice(reactionIndex, 1);
  
      const savedThought = await thought.save();
      res.status(200).json(savedThought);
    } catch (error) {
      console.error(error); // Use 'error' instead of 'err'
      res.status(500).json({ error: 'Could not delete the reaction.' });
    }
  }
  
};
