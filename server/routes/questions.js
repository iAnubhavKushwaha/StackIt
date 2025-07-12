import express from 'express';
import Question from '../models/Question.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/questions
// @desc    Get all questions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username');
    
    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/questions/:id
// @desc    Get question by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('user', 'username');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Increment view count
    question.views += 1;
    await question.save();
    
    res.json(question);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/questions
// @desc    Create a question
// @access  Private
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    
    const newQuestion = new Question({
      title,
      description,
      tags,
      user: req.user.id
    });
    
    const question = await newQuestion.save();
    
    res.status(201).json(question);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/questions/:id
// @desc    Delete a question
// @access  Private (User who created or Admin)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Check if user is question owner or admin
    if (question.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Question.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Question removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/questions/tag/:tagName
// @desc    Get questions by tag
// @access  Public
router.get('/tag/:tagName', async (req, res) => {
  try {
    const questions = await Question.find({ tags: req.params.tagName })
      .sort({ createdAt: -1 })
      .populate('user', 'username');
    
    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;