import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionList from '../components/Questions/QuestionList';
import { getQuestions } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header + Ask Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-800">Top Questions</h1>

        {isAuthenticated && (
          <Link
            to="/ask"
            className="bg-zinc-700 hover:bg-zinc-800 text-white text-sm px-5 py-2.5 rounded-lg shadow-sm transition duration-200"
          >
            Ask Question
          </Link>
        )}
      </div>

      {/* Questions List */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
        <QuestionList questions={questions} isLoading={loading} />
      </div>
    </div>
  );
}

export default HomePage;