import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import WorkoutHistoryTable from "../components/WorkoutHistoryTable";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const { profile } = useAuth();
  const [userLog, setUserLog] = useState(null);
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dynamic Chart Data States
  const [caloriesData, setCaloriesData] = useState({ labels: [], datasets: [] });
  const [exerciseDistribution, setExerciseDistribution] = useState({ labels: [], datasets: [] });

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

  useEffect(() => {
    if (profile?.userId) {
      fetchUserLog(profile.userId);
      fetchHistory(profile.userId);
    }
  }, [profile]);

  const fetchUserLog = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/exercise/latest/${userId}`);
      const data = await response.json();
      setUserLog(data);
    } catch (error) {
      console.error("Error fetching user log:", error);
    }
  };

  const fetchHistory = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/exercise/history/${userId}`);
      const workouts = response.data;
      setHistory(workouts);
      processChartData(workouts);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  const processChartData = (workouts) => {
    if (!workouts || workouts.length === 0) return;

    // Process Doughnut Chart (Total Reps per Exercise Type)
    let totals = { pushUp: 0, pullUp: 0, squat: 0, walk: 0, sitUp: 0, bicepCurl: 0, shoulderRaise: 0, shoulderPress: 0 };
    
    workouts.forEach(w => {
      totals.pushUp += w.pushUp || 0;
      totals.pullUp += w.pullUp || 0;
      totals.squat += w.squat || 0;
      totals.walk += w.walk || 0;
      totals.sitUp += w.sitUp || 0;
      totals.bicepCurl += w.bicepCurl || 0;
      totals.shoulderRaise += w.shoulderRaise || 0;
      totals.shoulderPress += w.shoulderPress || 0;
    });

    const exLabels = ["Push-Up", "Pull-Up", "Squat", "Walk", "Sit-Up", "Bicep", "Sh. Raise", "Sh. Press"];
    const exData = [totals.pushUp, totals.pullUp, totals.squat, totals.walk, totals.sitUp, totals.bicepCurl, totals.shoulderRaise, totals.shoulderPress];

    setExerciseDistribution({
      labels: exLabels,
      datasets: [{
        label: "Total Reps",
        data: exData,
        backgroundColor: ["#3b82f6", "#b026ff", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#d946ef", "#06b6d4"],
        borderWidth: 0,
      }],
    });

    // Process Line Chart (Total Activity over time)
    // Take the last 7 workouts (or less)
    const recent = [...workouts].reverse().slice(0, 7).reverse();
    const dates = recent.map(w => {
      const d = new Date(w.date);
      return `${d.getMonth()+1}/${d.getDate()}`;
    });
    
    // For line chart, let's plot "Total Reps per session" as a proxy for calories/intensity
    const intensity = recent.map(w => 
      (w.pushUp||0) + (w.pullUp||0) + (w.squat||0) + (w.walk||0) + (w.sitUp||0) + (w.bicepCurl||0) + (w.shoulderRaise||0) + (w.shoulderPress||0)
    );

    setCaloriesData({
      labels: dates.length ? dates : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Total Reps (Intensity)",
        data: intensity.length ? intensity : [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#00f0ff",
        backgroundColor: "rgba(0, 240, 255, 0.1)",
        tension: 0.4,
        fill: true,
      }],
    });
  };

  const runPythonScript = async (exerciseType) => {
    try {
      setIsRunning(true);
      setOutput(`Initializing ${exerciseType} tracker...`);
      const response = await fetch("http://localhost:5000/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise_type: exerciseType }),
      });
      const data = await response.json();
      setOutput(data.message || data.error);
    } catch (error) {
      setOutput("Error starting AI tracker");
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
      
      if (data.message && !data.error) {
        fetchUserLog(profile.userId);
        fetchHistory(profile.userId);
      }
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />
      
      <div className="flex flex-1 mt-[72px]">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-wide">
                Welcome back, <span className="gradient-text">{profile?.name || "Athlete"}</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Track your progress and push your limits today.</p>
            </div>
            
            {/* Mobile Sidebar Toggle Button */}
            <button 
              className="lg:hidden p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-neon-blue shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass-card p-6 border-l-4 border-l-neon-blue">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Workouts Completed</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white flex items-baseline">
                {userLog ? userLog.totalExercisesCompleted : '0'}
                <span className="ml-2 text-sm text-neon-blue font-medium">sessions</span>
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-neon-purple">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Calories Burned</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white flex items-baseline">
                {userLog ? userLog.calories : '0'}
                <span className="ml-2 text-sm text-neon-purple font-medium">kcal</span>
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-emerald-400">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Active Time</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white flex items-baseline">
                {userLog ? formatDuration(userLog.duration) : '0m'}
                <span className="ml-2 text-sm text-emerald-500 dark:text-emerald-400 font-medium">today</span>
              </p>
            </div>
          </div>

          {/* AI Tracker Console */}
          {output && (
            <div className={`mb-10 glass-card p-6 border ${isRunning ? 'border-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border-slate-300 dark:border-slate-700'} flex flex-col md:flex-row justify-between items-center transition-all duration-300`}>
              <div className="w-full md:w-auto mb-4 md:mb-0">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                  {isRunning && <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse mr-2"></span>}
                  AI Tracker Status
                </h3>
                <p className="text-slate-900 dark:text-white text-lg font-mono bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-300 dark:border-slate-800 break-all">{output}</p>
              </div>
              {isRunning && (
                <button
                  onClick={stopPythonScript}
                  className="w-full md:w-auto px-8 py-3 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-bold border border-red-300 dark:border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 shadow-sm dark:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  STOP TRACKER
                </button>
              )}
            </div>
          )}

          {/* Exercises Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide mb-6">Start Training</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {exercises.map((ex) => (
                <div
                  key={ex.key}
                  className="glass-card p-6 flex flex-col items-start justify-between relative overflow-hidden group min-h-[160px]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${ex.color} opacity-0 dark:opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">{ex.name}</h3>
                  <button
                    onClick={() => runPythonScript(ex.key)}
                    disabled={isRunning}
                    className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider relative z-10 transition-all duration-300 ${isRunning ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' : `bg-gradient-to-r ${ex.color} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95`}`}
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Charts & Table */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide mb-6">Performance Analytics</h2>
            
            {history.length > 0 ? (
              <>
                <div className="flex flex-col lg:flex-row gap-6 mb-12">
                  <div className="flex-1 glass-card p-6 min-w-0">
                    <LineChart data={caloriesData} title="Workout Intensity (Recent)" />
                  </div>
                  <div className="flex-1 glass-card p-6 min-w-0 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <DoughnutChart data={exerciseDistribution} title="Exercise Distribution (All Time)" />
                    </div>
                  </div>
                </div>
                <WorkoutHistoryTable workoutsData={history} />
              </>
            ) : (
              <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400 dark:text-slate-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Workouts Yet!</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Your performance analytics and history table will appear here once you complete your first AI-tracked workout.
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                  className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Start Your First Workout
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
