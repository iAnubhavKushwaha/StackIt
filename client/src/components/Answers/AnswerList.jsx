import { useState, useEffect } from 'react';
import { getAnswers } from '../../utils/api';
import AnswerForm from './AnswerForm';

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
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">
        {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
      </h2>
      
      {answers.length > 0 ? (
        <div className="space-y-4 mb-8">
          {answers.map(answer => (
            <div 
              key={answer._id} 
              className={`card ${answer.isAccepted ? 'border border-green-500' : ''}`}
            >
              <div className="prose max-w-none">
                {answer.content}
              </div>
              
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div>
                  Answered by: {answer.user?.username || 'Anonymous'}
                </div>
                <div>
                  {new Date(answer.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              {answer.isAccepted && (
                <div className="mt-2 text-green-600 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Accepted Answer
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-8">No answers yet. Be the first to answer!</p>
      )}
      
      <AnswerForm questionId={questionId} onAnswerAdded={handleNewAnswer} />
    </div>
  );
}

export default AnswerList;