import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionList from '../components/Questions/QuestionList';
import { getQuestions } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const [questions, setQuestions] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        // Ensure we're setting an array
        setQuestions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);  // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Top Questions</h1>
        {isAuthenticated && (
          <Link to="/ask" className="btn btn-primary">
            Ask Question
          </Link>
        )}
      </div>
      
      <QuestionList questions={questions} isLoading={loading} />
    </div>
  );
}

export default HomePage;