import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// @route   GET api/tags
// @desc    Get all unique tags used in questions
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Aggregate to get unique tags
    const tags = await Question.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags' } },
      { $sort: { _id: 1 } }
    ]);
    
    // Format the result
    const tagList = tags.map(tag => tag._id);
    
    res.json(tagList);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;