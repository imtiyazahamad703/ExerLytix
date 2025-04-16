import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Workouts = () => {
  const { profile } = useAuth();
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ count: 0, calories: 0, duration: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const exercises = [
    { name: "Push-Up", key: "push-up", color: "from-blue-500 to-cyan-400" },
    { name: "Pull-Up", key: "pull-up", color: "from-purple-500 to-pink-500" },
    { name: "Squat", key: "squat", color: "from-orange-500 to-yellow-400" },
    { name: "Walk", key: "walk", color: "from-emerald-500 to-teal-400" },
    { name: "Sit-Up", key: "sit-up", color: "from-rose-500 to-red-400" },
    { name: "Bicep Curl", key: "bicep", color: "from-indigo-500 to-blue-500" },
    { name: "Shoulder Raise", key: "shoulder-raise", color: "from-fuchsia-500 to-purple-500" },
    { name: "Shoulder Press", key: "shoulder-press", color: "from-cyan-500 to-blue-500" },
  ];

  // Poll for stats when running
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(async () => {
        try {
          const response = await fetch("http://localhost:5000/api/exercise-stats");
          const data = await response.json();
          if (data.running) {
            setStats({
              count: data.count || 0,
              calories: data.calories || 0,
              duration: data.duration || 0,
            });
          }
        } catch (e) {
          console.error("Error polling stats:", e);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const runPythonScript = async (exerciseType) => {
    try {
      setIsRunning(true);
      setOutput(`Initializing ${exerciseType} tracker...`);
      setStats({ count: 0, calories: 0, duration: 0 });
      // Tell the python backend which user is currently active
      if (profile?.userId) {
        await fetch("http://localhost:5000/set_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: profile.userId })
        });
      }

      const response = await fetch("http://localhost:5000/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise_type: exerciseType, user_id: profile?.userId }),
      });
      const data = await response.json();
      setOutput(data.message || data.error);
    } catch (error) {
      setOutput("Error starting AI tracker");
      setIsRunning(false);
    }
  };

  const stopPythonScript = async () => {
    try {
      setOutput("Stopping AI tracker...");
      const response = await fetch("http://localhost:5000/stop-python", {
        method: "POST",
      });
      const data = await response.json();
      setOutput(data.message || data.error);
      setIsRunning(false);
    } catch (error) {
      setOutput("Error stopping script");
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "0m";
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    else return `${mins}m`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-10 pt-20 pb-8 max-w-7xl mx-auto w-full relative z-10">
          
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-wide">
                AI <span className="gradient-text">Tracker</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Real-time form analysis & rep counting powered by Computer Vision.</p>
            </div>
            {/* Mobile Sidebar Toggle Button */}
            <button 
              className="lg:hidden p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-neon-blue shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* AI Tracker Console (Large Video Feed) */}
          {isRunning && (
            <div className="mb-12 glass-card p-6 md:p-8 border border-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse mr-3 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                  Active Session
                </h3>
                <button
                  onClick={stopPythonScript}
                  className="px-6 py-2 bg-red-500/20 text-red-400 font-bold border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  STOP TRACKER
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Video Feed */}
                <div className="lg:w-3/4 bg-black rounded-xl overflow-hidden border-2 border-slate-700/50 relative self-start">
                  <img
                    src="http://localhost:5000/video_feed"
                    alt="AI Tracker Feed"
                    className="w-full h-auto object-contain max-h-[800px]"
                    onError={(e) => { e.target.src = ''; setOutput('Camera feed not available'); }}
                  />
                  {!isRunning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                      <p className="text-slate-400">Camera offline</p>
                    </div>
                  )}
                </div>

                {/* Real-time Stats */}
                <div className="lg:w-1/4 flex flex-col gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 lg:p-8 border border-slate-700 h-full flex flex-col justify-center items-center text-center">
                    <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Rep Count</p>
                    <p className="text-6xl lg:text-7xl font-extrabold text-neon-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">{stats.count}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 lg:p-8 border border-slate-700 h-full flex flex-col justify-center items-center text-center">
                    <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Calories</p>
                    <p className="text-4xl lg:text-5xl font-extrabold text-neon-purple drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]">{stats.calories} <span className="text-xl lg:text-2xl text-slate-500">kcal</span></p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 lg:p-8 border border-slate-700 h-full flex flex-col justify-center items-center text-center">
                    <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Duration</p>
                    <p className="text-5xl font-extrabold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">{formatDuration(stats.duration)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isRunning && output && (
            <div className="mb-10 glass-card p-6 border border-slate-200 dark:border-slate-700/50">
              <p className="text-slate-700 dark:text-slate-300 font-mono text-center">{output}</p>
            </div>
          )}

          {/* Exercises Grid */}
          {!isRunning && (
            <div className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {exercises.map((ex) => (
                  <div
                    key={ex.key}
                    className="glass-card p-6 flex flex-col items-start justify-between relative overflow-hidden group min-h-[160px]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${ex.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">{ex.name}</h3>
                    <button
                      onClick={() => runPythonScript(ex.key)}
                      disabled={isRunning}
                      className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider relative z-10 transition-all duration-300 ${isRunning ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : `bg-gradient-to-r ${ex.color} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95`}`}
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Workouts;
