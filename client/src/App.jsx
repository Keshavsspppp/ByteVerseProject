import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import Chatbot from './pages/Chatbot';
import MoodCheck from './pages/MoodCheck';
import Report from './pages/Report';
import Meditation from './pages/Meditation';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Coming Soon Component
const ComingSoon = ({ title }) => (
  <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-gray-600">Coming Soon</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected Routes */}
            <Route path="/mood-check" element={
              <ProtectedRoute>
                <MoodCheck />
              </ProtectedRoute>
            } />
            <Route path="/chatbot" element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/meditation" element={
              <ProtectedRoute>
                <Meditation />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={
              <div className="container mx-auto p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Page not found</p>
                <Link to="/" className="text-yellow-500 hover:text-yellow-600">
                  Return to Home
                </Link>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
