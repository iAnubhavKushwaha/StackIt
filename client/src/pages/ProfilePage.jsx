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
        const [questionsRes, answersRes] = await Promise.all([
          axios.get('/api/questions/user'),
          axios.get('/api/answers/user'),
        ]);
        setQuestions(questionsRes.data);
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
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-800">Welcome, {user.username}</h1>
          <p className="text-sm text-zinc-500 mt-2">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-zinc-500">Username: {user.username}</p>
          <p className="text-sm text-zinc-500">Email: {user.email}</p>
        </div>

        {/* User Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Questions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">Your Questions</h2>
            {questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q._id} className="border-b pb-3">
                    <a
                      href={`/questions/${q._id}`}
                      className="text-base text-zinc-800 font-medium hover:underline"
                    >
                      {q.title}
                    </a>
                    <p className="text-sm text-zinc-500">
                      Posted on {new Date(q.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">You haven't asked any questions yet.</p>
            )}
          </div>

          {/* Answers */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">Your Answers</h2>
            {answers.length > 0 ? (
              <div className="space-y-4">
                {answers.map((a) => (
                  <div key={a._id} className="border-b pb-3">
                    <a
                      href={`/questions/${a.question}`}
                      className="text-base text-zinc-800 font-medium hover:underline"
                    >
                      {a.questionTitle || 'View Question'}
                    </a>
                    <p className="text-sm text-zinc-600 mt-1">{a.content.substring(0, 100)}...</p>
                    <p className="text-sm text-zinc-500">
                      Answered on {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">You haven't answered any questions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;