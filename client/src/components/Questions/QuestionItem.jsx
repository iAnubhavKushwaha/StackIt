import { Link } from 'react-router-dom';
import SanitizedHTML from '../Common/SanitizedHTML';

function QuestionItem({ question }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-zinc-800 mb-2">
        <Link
          to={`/questions/${question._id}`}
          className="hover:underline hover:text-zinc-700 transition"
        >
          {question.title}
        </Link>
      </h2>

      <div className="text-zinc-600 text-sm line-clamp-2 mb-3">
        <SanitizedHTML content={question.description} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="bg-zinc-100 text-zinc-600 px-2 py-1 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-500">
        <span>Asked by: {question.user?.username || 'Anonymous'}</span>
        <div className="flex space-x-3">
          <span>{question.views} views</span>
          <span>{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;