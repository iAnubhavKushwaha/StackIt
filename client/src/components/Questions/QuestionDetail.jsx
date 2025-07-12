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
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="card">
        <p>Question not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          Asked by {question.user?.username} on {new Date(question.createdAt).toLocaleDateString()} • {question.views} views
        </div>
        
        <div className="question-content">
          <SanitizedHTML content={question.description} />
        </div>
      </div>
      
      <AnswerList questionId={id} />
    </div>
  );
}

export default QuestionDetail;