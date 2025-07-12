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
    <header className="bg-[#111827] shadow-sm text-white sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          StackIt
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>

          {user ? (
            <>
              <Link to="/ask" className="hover:text-blue-400 transition">Ask Question</Link>
              <Link to="/profile" className="hover:text-blue-400 transition">{user.username}</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Log In</Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md text-white hover:brightness-110 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1f2937] px-4 pb-4">
          <nav className="space-y-3 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400 transition">Home</Link>
            {user ? (
              <>
                <Link to="/ask" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400 transition">Ask Question</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400 transition">Profile</Link>
                <button onClick={handleLogout} className="block py-2 text-red-400 hover:text-red-500 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400 transition">Log In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-purple-400 transition">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;