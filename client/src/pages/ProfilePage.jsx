import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function ProfilePage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        // Get user's questions
        const questionsRes = await axios.get('/api/questions/user');
        setQuestions(questionsRes.data);
        
        // Get user's answers
        const answersRes = await axios.get('/api/answers/user');
        setAnswers(answersRes.data);
      } catch (error) {
        console.error('Error fetching user content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserContent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Account Information</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* User's Questions */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold mb-4">Your Questions ({questions.length})</h2>
        
        {questions.length > 0 ? (
          <div className="divide-y">
            {questions.map(question => (
              <div key={question._id} className="py-4">
                <a 
                  href={`/questions/${question._id}`} 
                  className="text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  {question.title}
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Posted on {new Date(question.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't asked any questions yet.</p>
        )}
      </div>
      
      {/* User's Answers */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold mb-4">Your Answers ({answers.length})</h2>
        
        {answers.length > 0 ? (
          <div className="divide-y">
            {answers.map(answer => (
              <div key={answer._id} className="py-4">
                <a 
                  href={`/questions/${answer.question}`} 
                  className="text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  {answer.questionTitle || 'View Question'}
                </a>
                <p className="mt-1">{answer.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500 mt-1">
                  Answered on {new Date(answer.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't answered any questions yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;