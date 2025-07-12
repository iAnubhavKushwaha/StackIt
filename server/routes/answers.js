import express from 'express';
import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import Notification from '../models/Notification.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/answers/question/:questionId
// @desc    Get all answers for a question
// @access  Public
router.get('/question/:questionId', async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .sort({ isAccepted: -1, createdAt: -1 })
      .populate('user', 'username');
    
    res.json(answers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/answers
// @desc    Post an answer
// @access  Private
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { content, questionId } = req.body;
    
    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const newAnswer = new Answer({
      content,
      question: questionId,
      user: req.user.id,
      votes: { upvotes: [], downvotes: [] }
    });
    
    const answer = await newAnswer.save();
    
    // Create notification for question owner
    if (question.user.toString() !== req.user.id) {
      const notification = new Notification({
        type: 'answer',
        message: `${req.user.username} answered your question: "${question.title.substring(0, 30)}${question.title.length > 30 ? '...' : ''}"`,
        user: question.user,
        relatedQuestion: questionId,
        relatedAnswer: answer.id
      });
      
      await notification.save();
    }
    
    res.status(201).json(answer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/answers/:id/accept
// @desc    Accept an answer
// @access  Private (Question owner only)
router.put('/:id/accept', isAuthenticated, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    
    // Get the question
    const question = await Question.findById(answer.question);
    
    // Check if user is question owner
    if (question.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Remove accepted status from all answers for this question
    await Answer.updateMany(
      { question: answer.question },
      { isAccepted: false }
    );
    
    // Set this answer as accepted
    answer.isAccepted = true;
    await answer.save();
    
    res.json(answer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/answers/:id/vote
// @desc    Upvote or downvote an answer
// @access  Private
router.put('/:id/vote', isAuthenticated, async (req, res) => {
  try {
    const { voteType } = req.body; // 'up' or 'down'
    
    if (voteType !== 'up' && voteType !== 'down') {
      return res.status(400).json({ message: 'Invalid vote type' });
    }
    
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    
    const userId = req.user.id;
    
    // Check if user has already voted
    const upvoted = answer.votes.upvotes.includes(userId);
    const downvoted = answer.votes.downvotes.includes(userId);
    
    // Handle upvote
    if (voteType === 'up') {
      if (upvoted) {
        // Remove upvote if already upvoted
        answer.votes.upvotes = answer.votes.upvotes.filter(
          id => id.toString() !== userId
        );
      } else {
        // Add upvote and remove from downvotes if present
        answer.votes.upvotes.push(userId);
        answer.votes.downvotes = answer.votes.downvotes.filter(
          id => id.toString() !== userId
        );
      }
    }
    
    // Handle downvote
    if (voteType === 'down') {
      if (downvoted) {
        // Remove downvote if already downvoted
        answer.votes.downvotes = answer.votes.downvotes.filter(
          id => id.toString() !== userId
        );
      } else {
        // Add downvote and remove from upvotes if present
        answer.votes.downvotes.push(userId);
        answer.votes.upvotes = answer.votes.upvotes.filter(
          id => id.toString() !== userId
        );
      }
    }
    
    await answer.save();
    
    res.json(answer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;