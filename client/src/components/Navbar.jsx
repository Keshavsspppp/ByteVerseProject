import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">HealthCare</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              How It Works
            </Link>
            <Link to="/mood-check" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Mood Check
            </Link>
            <Link to="/chatbot" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Chatbot
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md">
                Login/Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/how-it-works" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              How It Works
            </Link>
            <Link to="/mood-check" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Mood Check
            </Link>
            <Link to="/chatbot" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Chatbot
            </Link>
            <Link to="/profile" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Profile
            </Link>
            <Link to="/login" className="block bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md">
              Login/Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;