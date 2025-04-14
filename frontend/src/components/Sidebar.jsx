import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiActivity, FiPieChart, FiUser, FiSettings, FiCamera, FiLogOut, FiSun, FiMoon, FiGlobe, FiBookOpen } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: <FiHome size={20} /> },
    { path: '/workouts', label: 'Workouts', icon: <FiActivity size={20} /> },
    { path: '/library', label: 'Exercise Library', icon: <FiBookOpen size={20} /> },
    { path: '/meal-planner', label: 'Meal Planner', icon: <FiPieChart size={20} /> },
    { path: '/bmi', label: 'BMI Calculator', icon: <FiUser size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-colors"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-gray-200 dark:border-slate-700/50 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 pt-24 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-4 pb-8">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-neon-blue border border-blue-200 dark:border-neon-blue/30 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                      : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <span className={`${isActive ? 'text-blue-600 dark:text-neon-blue' : 'text-gray-500 dark:text-slate-400'} transition-colors`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Settings / Theme / Logout */}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700/50 transition-colors space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white border border-transparent"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
              <span className="font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === '/settings' 
                  ? 'bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-neon-blue border border-blue-200 dark:border-neon-blue/30 shadow-sm' 
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <FiSettings size={20} className={location.pathname === '/settings' ? 'text-blue-600 dark:text-neon-blue' : 'text-gray-500 dark:text-slate-400'} />
              <span className="font-medium">Settings</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 border border-transparent"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
