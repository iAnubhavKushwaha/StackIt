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

    // Convert tags string to array
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
    <form onSubmit={handleSubmit} className="card">
      <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          id="title"
          className="input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What's your question? Be specific."
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 font-medium">Description</label>
        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Provide details about your question"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="tags" className="block mb-1 font-medium">Tags</label>
        <input
          type="text"
          id="tags"
          className="input"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="e.g. javascript,react,node (comma separated)"
        />
        <p className="text-xs text-gray-500 mt-1">Add up to 5 tags to categorize your question</p>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Post Your Question'}
      </button>
    </form>
  );
}

export default QuestionForm;