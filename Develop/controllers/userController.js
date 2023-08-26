// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('thoughts')
      .populate('friends')
      .select('-__v') 
      .lean();
      
      return res.json({ users });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  
  
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean();
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      const thoughts = await Thought.find({ _id: req.params.thoughtId })
        .select('-__v')
        .lean();

      res.json({
        user,
        thoughts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update an existing User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }
      const thought = await Thought.findOneAndUpdate(
        { thought: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no Thoughts found',
        });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
};