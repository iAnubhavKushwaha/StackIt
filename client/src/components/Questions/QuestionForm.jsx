import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../../utils/api';
import RichTextEditor from '../Common/RichTextEditor';

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description || description === '<p><br></p>') {
      return setError('Title and description are required');
    }

    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    if (tagArray.length === 0) {
      return setError('At least one tag is required');
    }

    setIsSubmitting(true);

    try {
      const newQuestion = await createQuestion({
        title,
        description,
        tags: tagArray
      });

      navigate(`/questions/${newQuestion._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create question');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex justify-center items-start px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white border border-zinc-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-zinc-800 mb-6">Ask a Question</h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-medium text-zinc-700">Title</label>
          <input
            type="text"
            id="title"
            className="w-full border border-zinc-300 rounded px-4 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's your question? Be specific."
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-medium text-zinc-700">Description</label>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Provide details about your question"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="tags" className="block mb-1 font-medium text-zinc-700">Tags</label>
          <input
            type="text"
            id="tags"
            className="w-full border border-zinc-300 rounded px-4 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g. javascript,react,node (comma separated)"
          />
          <p className="text-xs text-zinc-500 mt-1">Add up to 5 tags to categorize your question</p>
        </div>

        <button
          type="submit"
          className={`w-full bg-zinc-700 hover:bg-zinc-800 text-white font-medium py-2.5 rounded transition duration-200 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Post Your Question'}
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;