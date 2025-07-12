import { useState, useEffect } from 'react';
import { getAnswers } from '../../utils/api';
import AnswerForm from './AnswerForm';
import SanitizedHTML from '../Common/SanitizedHTML';

function AnswerList({ questionId }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const data = await getAnswers(questionId);
        setAnswers(data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId]);

  const handleNewAnswer = (newAnswer) => {
    setAnswers([...answers, newAnswer]);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-zinc-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
        {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
      </h2>

      {answers.length > 0 ? (
        <div className="space-y-6 mb-10">
          {answers.map((answer) => (
            <div
              key={answer._id}
              className={`bg-white border ${
                answer.isAccepted ? 'border-green-500' : 'border-zinc-200'
              } rounded-lg shadow-sm p-6`}
            >
              <div className="text-zinc-800 text-sm leading-relaxed">
                <SanitizedHTML content={answer.content} />
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-zinc-500">
                <div>Answered by: {answer.user?.username || 'Anonymous'}</div>
                <div>{new Date(answer.createdAt).toLocaleDateString()}</div>
              </div>

              {answer.isAccepted && (
                <div className="mt-3 flex items-center text-green-600 text-sm font-medium">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Accepted Answer
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500 mb-10">No answers yet. Be the first to answer!</p>
      )}

      <AnswerForm questionId={questionId} onAnswerAdded={handleNewAnswer} />
    </div>
  );
}

export default AnswerList;