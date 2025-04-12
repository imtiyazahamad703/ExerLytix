import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { profile, token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wider text-gray-900 dark:text-white flex items-center gap-2 group transition-colors">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm text-white transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
          Exer<span className="brand-text">Lytix</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">Home</Link>
          <Link to="/about" className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">About</Link>
          <Link to="/nutrition" className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">Nutrition</Link>
          <Link to="/contact" className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">Contact</Link>
        </div>

        {/* Auth Buttons / Profile / Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 transition-colors mr-2"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {token ? (
            <div className="flex items-center space-x-4">
              {!isDashboard && (
                <Link to="/dashboard" className="btn-neon text-sm py-1.5">
                  Dashboard
                </Link>
              )}
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 dark:from-neon-blue dark:to-neon-purple flex items-center justify-center text-white font-bold shadow-sm dark:shadow-lg transition-colors">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700/50">
                    <p className="text-sm text-gray-900 dark:text-white font-semibold truncate transition-colors">{profile?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate transition-colors">{profile?.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-300 transition-colors">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-semibold transition-colors">Log In</Link>
              <Link to="/register" className="btn-brand">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full border-t border-gray-200 dark:border-slate-700/50 shadow-2xl transition-colors">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">About</Link>
            <Link to="/nutrition" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">Nutrition</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors">Contact</Link>
            
            <button 
              onClick={() => { toggleTheme(); setIsOpen(false); }} 
              className="flex items-center space-x-2 text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue font-medium transition-colors"
            >
              {theme === "dark" ? <><FiSun size={18}/> <span>Light Mode</span></> : <><FiMoon size={18}/> <span>Dark Mode</span></>}
            </button>

            <hr className="border-gray-200 dark:border-slate-700/50 transition-colors" />
            {token ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-blue-600 dark:text-neon-blue font-medium transition-colors">Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-red-500 dark:text-red-400 font-medium transition-colors">Sign out</button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-blue text-center py-2 border border-gray-300 dark:border-slate-700 rounded-lg transition-colors">Log In</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="btn-brand text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
