import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LiveDashboard from './components/LiveDashboard';
import StatsChart from './components/StatsChart';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <nav className="bg-slate-800 p-4 border-b border-slate-700 shadow-md flex justify-between items-center px-8">
          <h1 className="text-2xl font-bold text-blue-500">ExerLytix AI Trainer</h1>
          <div className="flex gap-4">
            <Link to="/dashboard" className="text-gray-300 hover:text-white font-medium">Dashboard</Link>
            <Link to="/login" className="text-gray-300 hover:text-white font-medium">Login</Link>
            <Link to="/register" className="text-gray-300 hover:text-white font-medium">Register</Link>
          </div>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <div className="max-w-6xl mx-auto">
                <LiveDashboard />
                <StatsChart />
              </div>
            } />
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center h-[80vh]">
                <h2 className="text-4xl font-bold text-white mb-4">Welcome to ExerLytix</h2>
                <p className="text-xl text-gray-400">Your AI-powered personal fitness trainer.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
