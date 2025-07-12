import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createAnswer } from '../../utils/api';
import { Link } from 'react-router-dom';

function AnswerForm({ questionId, onAnswerAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!content.trim()) {
      return setError('Answer cannot be empty');
    }
    
    setIsSubmitting(true);
    
    try {
      const newAnswer = await createAnswer({
        content,
        questionId
      });
      
      setContent('');
      onAnswerAdded(newAnswer);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="card bg-gray-50 text-center">
        <p>
          Please <Link to="/login" className="text-blue-600 hover:underline">login</Link> or 
          {' '}<Link to="/register" className="text-blue-600 hover:underline">register</Link> to answer this question.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Your Answer</h3>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="input min-h-[150px]"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your answer here..."
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Your Answer'}
        </button>
      </form>
    </div>
  );
}

export default AnswerForm;