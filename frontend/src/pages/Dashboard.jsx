import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 mt-21">
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
        <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-red-700" onClick={() => alert("Logging out...")}> 
          <FiLogOut /> <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <span className="text-gray-700">Welcome, User</span>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Workouts</h3>
            <p className="text-gray-600">Completed: 10</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Calories Burned</h3>
            <p className="text-gray-600">Today: 500 kcal</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Active Time</h3>
            <p className="text-gray-600">Today: 1h 30m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;