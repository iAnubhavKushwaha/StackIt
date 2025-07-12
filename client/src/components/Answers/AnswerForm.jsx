import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createAnswer } from '../../utils/api';
import { Link } from 'react-router-dom';
import RichTextEditor from '../Common/RichTextEditor';

function AnswerForm({ questionId, onAnswerAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content || content === '<p><br></p>') {
      return setError('Answer cannot be empty');
    }

    setIsSubmitting(true);

    try {
      const newAnswer = await createAnswer({ content, questionId });
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
      <div className="bg-white border border-zinc-200 text-center p-6 rounded-lg shadow-sm">
        <p className="text-sm text-zinc-600">
          Please{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            register
          </Link>{' '}
          to answer this question.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-sm mt-6">
      <h3 className="text-xl font-semibold text-zinc-800 mb-4">Your Answer</h3>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-200 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your answer here..."
          />
        </div>

        <button
          type="submit"
          className={`bg-zinc-800 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-zinc-700 transition ${
            isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Your Answer'}
        </button>
      </form>
    </div>
  );
}

export default AnswerForm;