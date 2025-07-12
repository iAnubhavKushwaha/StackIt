import { Link } from 'react-router-dom';

function QuestionItem({ question }) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold">
        <Link to={`/questions/${question._id}`} className="text-blue-600 hover:text-blue-800">
          {question.title}
        </Link>
      </h2>
      
      <div className="mt-2">
        <p className="text-gray-600 line-clamp-2">
          {question.description.substring(0, 150)}
          {question.description.length > 150 ? '...' : ''}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {question.tags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>
          Asked by: {question.user?.username || 'Anonymous'}
        </div>
        <div className="flex space-x-4 items-center">
          <span>{question.views} views</span>
          <span>{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;