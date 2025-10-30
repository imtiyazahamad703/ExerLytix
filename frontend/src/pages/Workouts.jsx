import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Workouts = () => {
  const { profile } = useAuth();
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ count: 0, calories: 0, duration: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [processedFrame, setProcessedFrame] = useState(null);
  const requestRef = useRef(null);
  const [activeExerciseName, setActiveExerciseName] = useState("");

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

  // --- OLD LOCALHOST LOGIC (COMMENTED OUT) ---
  /*
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_PYTHON_API_URL || 'https://exerlytix-ai-tracker.onrender.com'}/api/exercise-stats`);
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
  */

  // --- NEW CLOUD ARCHITECTURE LOGIC ---
  const sendFrameLoop = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas && video.readyState >= 2) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL("image/jpeg", 0.5); // 0.5 quality for speed
      
      try {
        const response = await fetch(`${import.meta.env.VITE_PYTHON_API_URL || 'https://exerlytix-ai-tracker.onrender.com'}/process_frame`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image })
        });
        const data = await response.json();
        
        if (!response.ok) {
          console.error("Server error:", data.error);
          if (response.status === 400) {
            // The server might have restarted, losing session state. Stop the loop.
            stopCamera();
            setIsRunning(false);
            setOutput("Session lost (Server restarted). Please click Start again.");
            return;
          }
        }
        
        if (data.image) setProcessedFrame(data.image);
        if (data.stats) {
          setStats({
            count: data.stats.count || 0,
            calories: data.stats.calories || 0,
            duration: data.stats.duration || 0,
          });
        }
      } catch(e) {
        // Silently catch network errors so loop continues
      }
    }
    
    // Run at approx 6 FPS to prevent server overload
    requestRef.current = setTimeout(sendFrameLoop, 150);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      sendFrameLoop(); // Start the loop
    } catch (err) {
      setOutput("Camera permission denied or camera not found.");
      setIsRunning(false);
    }
  };

  const stopCamera = () => {
    if (requestRef.current) clearTimeout(requestRef.current);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isRunning) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isRunning]);

  const runPythonScript = async (exerciseType) => {
    try {
      const ex = exercises.find(e => e.key === exerciseType);
      setActiveExerciseName(ex ? ex.name : exerciseType);
      setIsRunning(true);
      setOutput(`Initializing ${exerciseType} tracker...`);
      setStats({ count: 0, calories: 0, duration: 0 });
      // Tell the python backend which user is currently active
      if (profile?.userId) {
        await fetch(`${import.meta.env.VITE_PYTHON_API_URL || 'https://exerlytix-ai-tracker.onrender.com'}/set_user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: profile.userId })
        });
      }

      const response = await fetch(`${import.meta.env.VITE_PYTHON_API_URL || 'https://exerlytix-ai-tracker.onrender.com'}/run-python`, {
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
      const response = await fetch(`${import.meta.env.VITE_PYTHON_API_URL || 'https://exerlytix-ai-tracker.onrender.com'}/stop-python`, {
        method: "POST",
      });
      const data = await response.json();
      setOutput(data.message || data.error);
      setIsRunning(false);
    } catch (error) {
      setOutput("Error stopping script");
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0s";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    let result = "";
    if (hrs > 0) result += `${hrs}h `;
    if (mins > 0 || hrs > 0) result += `${mins}m `;
    result += `${secs}s`;
    return result.trim();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className={`flex flex-1 ${isRunning ? 'h-screen overflow-hidden' : ''}`}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <div className={`flex-1 px-4 sm:px-6 lg:px-10 ${isRunning ? 'pt-6 pb-2' : 'pt-20 pb-8'} max-w-[1400px] mx-auto w-full relative z-10 flex flex-col h-full`}>
          
          <div className="mb-4 flex justify-between items-center shrink-0">
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
            <div className="glass-card p-4 border border-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.2)] flex flex-col w-full" style={{ height: '82vh', maxHeight: '850px' }}>
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse mr-3 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                  Active Session
                  {activeExerciseName && (
                    <span className="ml-4 px-3 py-1 bg-slate-800 text-neon-blue rounded-lg text-sm uppercase tracking-wider border border-slate-700">
                      {activeExerciseName}
                    </span>
                  )}
                </h3>
                <button
                  onClick={stopPythonScript}
                  className="px-6 py-2 bg-red-500/20 text-red-400 font-bold border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  STOP TRACKER
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                {/* Video Feed */}
                <div className="lg:w-4/5 bg-black rounded-xl overflow-hidden border-2 border-slate-700/50 relative flex justify-center items-center h-full">
                  
                  {/* --- NEW CLOUD ARCHITECTURE ELEMENTS --- */}
                  <video ref={videoRef} style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }} playsInline muted />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                  
                  {processedFrame ? (
                    <img
                      src={processedFrame}
                      alt="AI Tracker Feed"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-slate-400">Loading AI feed...</p>
                  )}

                  {/* --- OLD LOCALHOST LOGIC (COMMENTED OUT) --- */}
                  {/*
                  <img
                    src={`${import.meta.env.VITE_PYTHON_API_URL || 'https://exerlytix-ai-tracker.onrender.com'}/video_feed`}
                    alt="AI Tracker Feed"
                    className="w-full h-auto object-contain max-h-[800px]"
                    onError={(e) => { e.target.src = ''; setOutput('Camera feed not available'); }}
                  />
                  */}
                  
                  {!isRunning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                      <p className="text-slate-400">Camera offline</p>
                    </div>
                  )}
                </div>

                {/* Real-time Stats */}
                <div className="lg:w-1/5 flex flex-col gap-3 h-full">
                  <div className="bg-slate-800/50 rounded-xl p-2 border border-slate-700 flex-1 flex flex-col justify-center items-center text-center">
                    <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1">Rep Count</p>
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neon-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">{stats.count}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-2 border border-slate-700 flex-1 flex flex-col justify-center items-center text-center">
                    <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1">Calories</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neon-purple drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]">{stats.calories} <span className="text-sm text-slate-500">kcal</span></p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-2 border border-slate-700 flex-1 flex flex-col justify-center items-center text-center">
                    <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">{formatDuration(stats.duration)}</p>
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
