import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">ExerLytix</h2>
            <p className="mt-3 text-sm text-gray-400">
            
            Transform your fitness journey with AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">About</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Workouts</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition"><FaFacebookF size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition"><FaLinkedinIn size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © 2025 FitLife. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
