import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800/50">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="text-3xl font-extrabold tracking-tight">
              <span className="gradient-text">Exer</span>
              <span className="text-white">Lytix</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Transform your fitness journey with next-gen AI-powered computer vision and real-time tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-neon-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-neon-blue transition-colors">About</Link></li>
              <li><Link to="/dashboard" className="hover:text-neon-blue transition-colors">Workouts</Link></li>
              <li><Link to="/nutrition" className="hover:text-neon-blue transition-colors">Nutrition</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-neon-blue transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-neon-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-neon-blue transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300"><FaFacebookF size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300"><FaTwitter size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300"><FaInstagram size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300"><FaLinkedinIn size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© 2025 ExerLytix. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-slate-500">Built with precision for peak performance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
