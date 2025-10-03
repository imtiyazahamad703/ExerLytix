import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Navbar from "../components/Navbar";
import WorkoutHistoryTable from "../components/WorkoutHistoryTable";

// ✅ Dashboard Component
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Top Navbar */}
      <Navbar />

      <div className="flex flex-1 mt-20">
        {/* Sidebar */}
        <div className="w-64 bg-blue-900 text-white flex flex-col p-5">
          <h2 className="text-2xl font-bold mb-6">Fitness Dashboard</h2>
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700">
                  <FiHome /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700">
                  <FiUser /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-700">
                  <FiSettings /> <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-red-700"
            onClick={() => alert("Logging out...")}
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 gap-8">
          {/* ✅ Select Workout Section */}
          <div className="flex flex-col items-center gap-4 p-6 ">
            <h1 className="text-2xl font-bold">Select Workout</h1>
            <div className="flex gap-4">
              <button
                onClick={() => runPythonScript("push-up")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Start Push-Up
              </button>
              <button
                onClick={() => runPythonScript("pull-up")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Start Pull-Up
              </button>
              <button
                onClick={() => runPythonScript("squat")}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
                Start Squat
              </button>
            </div>
            <p className="mt-4 text-lg font-medium">Output: {output}</p>

            <button
              onClick={stopPythonScript}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Stop Script
            </button>
          </div>

          {/* ✅ Workout History Table Below */}
          <WorkoutHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
