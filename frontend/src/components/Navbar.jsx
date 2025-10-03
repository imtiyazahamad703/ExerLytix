import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-5">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          <span className="font-extrabold text-amber-400 text-3xl">Exer</span>Lytix
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Workouts</Link>
          <Link to="/nutrition" className="hover:text-blue-400 transition">Nutrition</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* Login Button */}
        <div className="space-x-3">
          <Link to="/auth/login">
            <button className="px-8 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col items-center space-y-4 py-5">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400 transition">Workouts</Link></li>
            <li><Link to="/nutrition" className="hover:text-blue-400 transition">Nutrition</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            <li>
              <Link to="/auth/login">
                <button className="bg-blue-500 px-5 py-2 rounded-lg text-white font-bold transition hover:bg-blue-600">
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
