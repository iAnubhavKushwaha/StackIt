import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">StackIt</Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            
            {user ? (
              <>
                <Link to="/ask" className="hover:text-blue-500">Ask Question</Link>
                <Link to="/profile" className="hover:text-blue-500">{user.username}</Link>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">Log In</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pt-2 border-t">
            <ul className="space-y-3">
              <li>
                <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Home</Link>
              </li>
              
              {user ? (
                <>
                  <li>
                    <Link to="/ask" className="block py-2" onClick={() => setMenuOpen(false)}>Ask Question</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="block py-2" onClick={() => setMenuOpen(false)}>Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block py-2 text-red-500">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="block py-2" onClick={() => setMenuOpen(false)}>Log In</Link>
                  </li>
                  <li>
                    <Link to="/register" className="block py-2" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;