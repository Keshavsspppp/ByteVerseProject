import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/how-it-works" element={<div className="p-4">How It Works Page (Coming Soon)</div>} />
            <Route path="/mood-check" element={<div className="p-4">Mood Check Page (Coming Soon)</div>} />
            <Route path="/journal" element={<div className="p-4">Journal Page (Coming Soon)</div>} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<div className="p-4">Login/Signup Page (Coming Soon)</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
