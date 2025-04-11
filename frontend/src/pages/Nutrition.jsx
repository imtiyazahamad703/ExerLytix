import React from "react";
import { FaAppleAlt, FaUtensils, FaChartPie, FaLeaf } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Nutrition = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors min-h-screen pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full py-24 text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-slate-900 dark:text-white mb-6">
            Fuel Your Body with <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-amber-500">
              Smart Nutrition
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            AI-powered nutrition tracking, personalized meal plans, and deep macro insights to help you eat better and reach your fitness goals faster.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 lg:px-16 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 tracking-wide">Why Nutrition Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="glass-card p-8 group flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaAppleAlt className="text-3xl text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Smart Tracking</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Log your meals easily and let our AI calculate your calories and macros accurately in real-time.
            </p>
          </div>

          <div className="glass-card p-8 group flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaChartPie className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Macro Insights</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Get a highly detailed breakdown of proteins, carbs, and fats to understand what fuels your body.
            </p>
          </div>

          <div className="glass-card p-8 group flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaUtensils className="text-3xl text-amber-500 dark:text-amber-400" />
            </div>
            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Personalized Plans</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              AI highly customized meal plans based on your specific fitness goals and dietary preferences.
            </p>
          </div>

          <div className="glass-card p-8 group flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaLeaf className="text-3xl text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Healthy Lifestyle</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Build sustainable habits with clean, balanced nutrition strategies tailored just for you.
            </p>
          </div>

        </div>
      </section>

      {/* Meal Plan Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/50 skew-y-2 origin-top-left -z-10"></div>
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 tracking-wide">Choose Your Fuel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Plan 1 */}
            <div className="glass-card p-8 text-left border-t-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Weight Loss</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-6">Shred Fat & Keep Energy</p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
                A calorie-controlled plan designed to help you shed fat while staying energetic throughout your day.
              </p>
              <ul className="text-slate-700 dark:text-slate-300 text-sm space-y-4 mb-8">
                <li className="flex items-center"><span className="text-blue-500 mr-3">✔</span> Low-carb structured meals</li>
                <li className="flex items-center"><span className="text-blue-500 mr-3">✔</span> High lean protein focus</li>
                <li className="flex items-center"><span className="text-blue-500 mr-3">✔</span> Strict portion control</li>
              </ul>
              <button className="w-full py-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                Select Plan
              </button>
            </div>

            {/* Plan 2 */}
            <div className="glass-card p-8 text-left border-t-4 border-amber-500 hover:-translate-y-2 transition-transform duration-300 scale-100 md:scale-105 shadow-2xl z-10 relative">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Muscle Gain</h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium mb-6">Build & Recover</p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
                A protein-rich surplus plan tailored specifically for muscle building, hypertrophy and heavy strength training.
              </p>
              <ul className="text-slate-700 dark:text-slate-300 text-sm space-y-4 mb-8">
                <li className="flex items-center"><span className="text-amber-500 mr-3">✔</span> High protein, high calorie</li>
                <li className="flex items-center"><span className="text-amber-500 mr-3">✔</span> Complex carbs for energy</li>
                <li className="flex items-center"><span className="text-amber-500 mr-3">✔</span> Fast recovery nutrients</li>
              </ul>
              <button className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 transition-colors">
                Select Plan
              </button>
            </div>

            {/* Plan 3 */}
            <div className="glass-card p-8 text-left border-t-4 border-emerald-500 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Balanced Diet</h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-6">Maintain & Thrive</p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
                A lifestyle-focused sustainable plan with a perfect mix of carbs, proteins, and healthy fats.
              </p>
              <ul className="text-slate-700 dark:text-slate-300 text-sm space-y-4 mb-8">
                <li className="flex items-center"><span className="text-emerald-500 mr-3">✔</span> 40/30/30 Macro split</li>
                <li className="flex items-center"><span className="text-emerald-500 mr-3">✔</span> Focus on whole foods</li>
                <li className="flex items-center"><span className="text-emerald-500 mr-3">✔</span> Flexible meal timing</li>
              </ul>
              <button className="w-full py-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-colors">
                Select Plan
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 text-center">
        <div className="container mx-auto px-6">
          <div className="glass-card max-w-4xl mx-auto p-12 bg-gradient-to-r from-blue-600/10 to-amber-500/10 dark:from-blue-600/20 dark:to-amber-500/20 border-blue-500/30">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Start Your Nutrition Journey Today!</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Join thousands of athletes who are transforming their health with ExerLytix AI-powered nutrition intelligence.
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-transform duration-300">
              Generate My Plan
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nutrition;
