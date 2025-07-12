import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';
import AskQuestionPage from './pages/AskQuestionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Components
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] text-zinc-800">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<div className="container max-w-6xl mx-auto px-4 py-10"><HomePage /></div>} />
          <Route path="/questions/:id" element={<div className="container max-w-6xl mx-auto px-4 py-10"><QuestionPage /></div>} />
          <Route path="/ask" element={
            <ProtectedRoute>
              <div className="container max-w-6xl mx-auto px-4 py-10"><AskQuestionPage /></div>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="container max-w-6xl mx-auto px-4 py-10"><ProfilePage /></div>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;