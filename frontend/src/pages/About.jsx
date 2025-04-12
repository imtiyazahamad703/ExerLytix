import React from "react";
import { FaLaptopCode, FaBrain, FaDumbbell } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 min-h-screen pt-20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-slate-900 pt-24 pb-16 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-neon-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 dark:bg-neon-purple/20 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-gray-900 dark:text-white mb-6 transition-colors">
            About <span className="brand-text">ExerLytix</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            The next generation of AI-powered fitness. We use cutting-edge computer vision to analyze your workouts, count your reps, and guide your form.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 lg:px-16 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 transition-colors">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="card hover:-translate-y-2 transition-transform p-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-neon-blue/20 flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-neon-blue border border-blue-200 dark:border-neon-blue/50 text-2xl shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
              <FaLaptopCode />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-4 transition-colors">Smart Technology</h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm transition-colors">No extra hardware needed. Use your webcam to track exercises in real-time with high accuracy.</p>
          </div>

          <div className="card hover:-translate-y-2 transition-transform p-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-neon-purple/20 flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-neon-purple border border-purple-200 dark:border-neon-purple/50 text-2xl shadow-sm dark:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-all">
              <FaBrain />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-4 transition-colors">AI Vision Model</h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm transition-colors">Powered by OpenCV and Mediapipe, the system analyzes body landmarks to ensure perfect form.</p>
          </div>

          <div className="card hover:-translate-y-2 transition-transform p-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/50 text-2xl shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
              <FaDumbbell />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-4 transition-colors">Fitness For All</h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm transition-colors">Whether you are a beginner or a pro, ExerLytix adapts to your level and keeps you motivated.</p>
          </div>

        </div>
      </section>

      {/* Team / Contact Section */}
      <section className="w-full glass border-y border-gray-200 dark:border-slate-700/50 py-16 text-center mt-12 transition-colors">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">Ready to Transform?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600 dark:text-slate-400 transition-colors">
          Join ExerLytix today and take your home workouts to the next level with your personal AI trainer.
        </p>
        <button className="btn-brand">
          Get Started For Free
        </button>
      </section>
    </div>
  );
};

export default About;
