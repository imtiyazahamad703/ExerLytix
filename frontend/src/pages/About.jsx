import React from "react";
import { FaDumbbell, FaBrain, FaUsers, FaHeartbeat } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors min-h-screen pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-slate-900 dark:text-white mb-6">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-blue dark:to-neon-purple">ExerLytix</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transform your fitness journey with cutting-edge AI, personalized workouts, and expert guidance — entirely in your browser without extra hardware.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
              At <span className="font-semibold text-blue-600 dark:text-neon-blue">ExerLytix</span>, our mission is to revolutionize the fitness industry by combining artificial intelligence with accessible training. We aim to help individuals achieve their goals, stay motivated, and make fitness a sustainable lifestyle without expensive gear.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <span className="text-blue-600 dark:text-neon-blue font-bold text-xl">1</span>
              </div>
              <p className="text-slate-800 dark:text-slate-300 font-medium">Accessible to everyone, everywhere.</p>
            </div>
          </div>
          
          <div className="glass-card p-10 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-slate-800 dark:to-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-[30px] group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <p className="text-blue-100 dark:text-slate-300 leading-relaxed text-lg relative z-10">
              Because fitness isn’t one-size-fits-all. Our AI-driven system adapts to your progress, tracks your form in real-time, and gives you the exact tools you need to succeed—right through your device's camera.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="relative py-24 mt-12 overflow-hidden">
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/50 -skew-y-2 origin-top-right -z-10"></div>
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 tracking-wide">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaDumbbell className="text-3xl text-blue-600 dark:text-neon-blue" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Smart Workouts</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                AI-powered workout tracking that monitors your form and counts your reps automatically.
              </p>
            </div>

            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBrain className="text-3xl text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">AI Insights</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Track progress with highly detailed performance analytics and personalized recommendations.
              </p>
            </div>

            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHeartbeat className="text-3xl text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Health Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Keep a close eye on your calories burned, active time, and overall training intensity.
              </p>
            </div>

            <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-3xl text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Anywhere Access</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                No wearables needed. Just point your device camera and join a new era of fitness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 lg:px-16 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Built By Innovators</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          Our dedicated team of software engineers, AI specialists, and fitness enthusiasts work together to bring you the best experience possible.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="glass-card p-8 flex flex-col items-center group">
            <div className="w-28 h-28 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mb-6 p-1 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center">
                <span className="text-3xl">👨‍💻</span>
              </div>
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Alex Johnson</h3>
            <p className="text-blue-600 dark:text-neon-blue font-medium text-sm mb-4">Lead AI Engineer</p>
          </div>
          
          <div className="glass-card p-8 flex flex-col items-center group">
            <div className="w-28 h-28 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full mb-6 p-1 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center">
                <span className="text-3xl">👩‍🔬</span>
              </div>
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Sophia Lee</h3>
            <p className="text-purple-600 dark:text-neon-purple font-medium text-sm mb-4">Product Architect</p>
          </div>
          
          <div className="glass-card p-8 flex flex-col items-center group">
            <div className="w-28 h-28 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full mb-6 p-1 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center">
                <span className="text-3xl">🏃‍♂️</span>
              </div>
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Rahul Mehta</h3>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-4">Fitness Specialist</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
