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
    <header className="bg-white shadow-sm text-zinc-800 sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto py-4 px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-zinc-800">
          StackIt
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-zinc-600 transition">Home</Link>

          {user ? (
            <>
              <Link to="/ask" className="hover:text-zinc-600 transition">Ask Question</Link>
              <Link to="/profile" className="hover:text-zinc-600 transition">{user.username}</Link>
              <button onClick={handleLogout} className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-zinc-600 transition">Log In</Link>
              <Link
                to="/register"
                className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 px-4 pb-4">
          <nav className="space-y-3 text-sm font-medium text-zinc-800">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-zinc-600 transition">Home</Link>
            {user ? (
              <>
                <Link to="/ask" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-zinc-600 transition">Ask Question</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-zinc-600 transition">Profile</Link>
                <button onClick={handleLogout} className="block py-2 text-red-500 hover:text-red-600 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-zinc-600 transition">Log In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-zinc-700 transition">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;