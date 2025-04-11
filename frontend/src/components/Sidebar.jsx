import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiActivity, FiPieChart, FiUser, FiSettings } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { profile } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "Workouts", path: "/dashboard", icon: <FiActivity size={20} /> }, // Currently maps to dashboard
    { name: "Nutrition", path: "/nutrition", icon: <FiPieChart size={20} /> },
    { name: "Profile", path: "/profile", icon: <FiUser size={20} /> },
    { name: "Settings", path: "/settings", icon: <FiSettings size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-64 glass border-r border-slate-200 dark:border-slate-700/50 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 pt-24 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-4 pb-8">
          
          {/* User Profile Summary */}
          <div className="flex items-center space-x-4 mb-8 p-4 glass-card">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-white font-semibold">{profile?.name || "User"}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate w-32">{profile?.email || "user@example.com"}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-neon-blue shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={`${isActive ? 'text-blue-600 dark:text-neon-blue' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700/50">
            <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
