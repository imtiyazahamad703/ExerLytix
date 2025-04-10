import React from "react";
import { FiActivity, FiVideo, FiBarChart2 } from "react-icons/fi";

const FeaturesSection = () => {
  return (
    <section className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Future of <span className="gradient-text">Fitness</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Our AI-powered platform provides everything you need to track, analyze, and perfect your workout routine without any extra hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-8 group">
            <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiVideo className="text-neon-blue text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Computer Vision Tracking</h3>
            <p className="text-slate-400 leading-relaxed">
              Use your device's camera to get real-time form correction. Our AI analyzes your joints and movements to ensure perfect execution.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 group">
            <div className="w-16 h-16 rounded-2xl bg-neon-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiActivity className="text-neon-purple text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Automated Rep Counting</h3>
            <p className="text-slate-400 leading-relaxed">
              Never lose count again. ExerLytix automatically logs your reps, sets, and workout duration with pinpoint accuracy.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 group">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiBarChart2 className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Advanced Analytics</h3>
            <p className="text-slate-400 leading-relaxed">
              Visualize your progress with detailed charts and historical data. Understand your strengths and areas for improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
