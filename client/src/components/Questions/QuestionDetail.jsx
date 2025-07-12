import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../../utils/api';
import AnswerList from '../Answers/AnswerList';
import SanitizedHTML from '../Common/SanitizedHTML';

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionById(id);
        setQuestion(data);
      } catch (err) {
        setError('Failed to load question');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-600 border border-red-200 p-4 rounded-md text-sm">
        <p>{error}</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center text-zinc-600 py-8">
        <p>Question not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl space-y-8">
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-zinc-800 mb-4">{question.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map(tag => (
              <span key={tag} className="bg-zinc-200 text-zinc-700 px-3 py-1 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="text-sm text-zinc-500 mb-6">
            Asked by <span className="font-medium text-zinc-700">{question.user?.username}</span> on {new Date(question.createdAt).toLocaleDateString()} • {question.views} views
          </div>

          <div className="prose prose-sm max-w-none text-zinc-800">
            <SanitizedHTML content={question.description} />
          </div>
        </div>

        <AnswerList questionId={id} />
      </div>
    </div>
  );
}

export default QuestionDetail;