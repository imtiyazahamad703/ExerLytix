import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0a0a0f] border-t border-gray-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-wider text-gray-900 dark:text-white flex items-center gap-2 mb-4 transition-colors">
            Exer<span className="brand-text">Lytix</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed transition-colors">
              Transform your fitness journey with next-gen AI-powered computer vision and real-time tracking.
            </p>
          </div>

          {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 transition-colors">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">About</Link></li>
            <li><Link to="/workouts" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Workouts</Link></li>
            <li><Link to="/nutrition" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Nutrition</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 transition-colors">Support</h3>
          <ul className="space-y-3">
            <li><Link to="/help" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Help Center</Link></li>
            <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

          {/* Social */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 transition-colors">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/imtiyazahamad703" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/imtiyazahamad703" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-400 hover:bg-blue-700 hover:text-white dark:hover:bg-neon-blue dark:hover:text-slate-900 transition-all">
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center transition-colors">
        <p className="text-xs text-gray-500 dark:text-slate-500 mb-4 md:mb-0 transition-colors">
          &copy; {new Date().getFullYear()} ExerLytix. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 dark:text-slate-500 transition-colors">
          Built with precision for peak performance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
