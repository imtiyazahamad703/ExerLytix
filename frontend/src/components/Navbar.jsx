import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight">
          <span className="gradient-text">Exer</span>
          <span className="text-slate-900 dark:text-white transition-colors">Lytix</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Home</Link>
          <Link to="/about" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">About</Link>
          <Link to="/dashboard" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Dashboard</Link>
          <Link to="/nutrition" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Nutrition</Link>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-neon-blue hover:scale-110 transition-transform"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth/login" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors text-sm font-medium">
            Sign In
          </Link>
          <Link to="/auth/login">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-blue dark:to-primary-dark rounded-full text-white font-semibold shadow-[0_0_15px_rgba(0,120,255,0.3)] dark:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,120,255,0.5)] dark:hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] hover:scale-105 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-neon-blue"
          >
            {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-blue-600 dark:text-neon-blue">
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-200 dark:border-slate-700/50">
          <ul className="flex flex-col items-center space-y-6 py-8">
            <li><Link to="/" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-lg">Home</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-lg">About</Link></li>
            <li><Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-lg">Dashboard</Link></li>
            <li><Link to="/nutrition" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-lg">Nutrition</Link></li>
            <li>
              <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-blue dark:to-primary-dark rounded-full text-white font-bold shadow-[0_0_15px_rgba(0,120,255,0.3)] dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  Get Started
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
