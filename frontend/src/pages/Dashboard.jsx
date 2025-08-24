
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Navbar from "../components/Navbar";
const Dashboard = () => {
  const [output, setOutput] = useState("");
  const runPythonScript = async (exerciseType) => {
    try {
      const response = await fetch("http://localhost:5000/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise_type: exerciseType }),
      });
      const data = await response.json();
      setOutput(data.message || data.error);
    } catch (error) {
      setOutput("Error starting script");
    }
  };
  const stopPythonScript = async () => {
    try {
      const response = await fetch("http://localhost:5000/stop-python", {
        method: "POST",
      });
      const data = await response.json();
      setOutput(data.message || data.error);
    } catch (error) {
      setOutput("Error stopping script");
    }
  };
  // Colorful cards
  const exercises = [
    { name: "Push-Up", key: "push-up", bg: "bg-red-400" },
    { name: "Pull-Up", key: "pull-up", bg: "bg-yellow-400" },
    { name: "Squat", key: "squat", bg: "bg-green-400" },
    { name: "Walk", key: "walk", bg: "bg-blue-400" },
    { name: "Sit-Up", key: "sit-up", bg: "bg-pink-400" },
    { name: "Bicep Curl", key: "bicep", bg: "bg-indigo-400" },
    { name: "Shoulder Raise", key: "shoulder-raise", bg: "bg-purple-400" },
    { name: "Shoulder Press", key: "shoulder-press", bg: "bg-teal-400" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="flex flex-1 mt-24"> {/* increased top margin for gap */}
        {/* Sidebar */}
        <div className="w-64 bg-blue-900 text-white flex flex-col p-6 h-screen sticky top-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Fitness Hub</h2>
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiHome /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiUser /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiSettings /> <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className="flex items-center justify-center mt-8 space-x-2 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
            onClick={() => alert("Logging out...")}
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 pt-6 md:pt-0">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Workouts</h3>
              <p className="text-gray-500 text-xl">Completed: 10</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Calories Burned</h3>
              <p className="text-gray-500 text-xl">Today: 500 kcal</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Active Time</h3>
              <p className="text-gray-500 text-xl">Today: 1h 30m</p>
            </div>
          </div>
          {/* Exercises Section */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Start Exercise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exercises.map((ex) => (
              <div
                key={ex.key}
                className={`rounded-xl shadow-lg p-5 flex flex-col items-center justify-between transition transform hover:scale-105 ${ex.bg} text-black`}
              >
                <h3 className="text-xl font-semibold mb-4">{ex.name}</h3>
                <button
                  onClick={() => runPythonScript(ex.key)}
                  className="px-4 py-2 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
          {/* Output Section */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Script Output</h3>
            <p className="text-gray-600 text-lg">{output || "No exercise running..."}</p>
            <button
              onClick={stopPythonScript}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Stop All Scripts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
