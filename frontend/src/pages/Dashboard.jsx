import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import WorkoutHistoryTable from "../components/WorkoutHistoryTable";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { profile } = useAuth();
  const [userLog, setUserLog] = useState({});
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Calories burned over a week (Mock data for now, since history is table only)
  const caloriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burned",
        data: [450, 500, 400, 600, 550, 700, 650],
        borderColor: "#00f0ff",
        backgroundColor: "rgba(0, 240, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const exerciseDistribution = {
    labels: ["Push-Up", "Squat", "Pull-Up", "Walk", "Sit-Up"],
    datasets: [
      {
        label: "Exercises Completed",
        data: [10, 15, 5, 20, 8],
        backgroundColor: [
          "#b026ff",
          "#00f0ff",
          "#ff2a5f",
          "#10b981",
          "#f59e0b",
        ],
        borderWidth: 0,
      },
    ],
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

  useEffect(() => {
    if (profile?.userId) {
      fetchUserLog(profile.userId);
    }
  }, [profile]);

  const formatDuration = (minutes) => {
    if (!minutes) return "0m";
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    else return `${mins}m`;
  };

  const fetchUserLog = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/exercise/latest/${userId}`);
      const data = await response.json();
      setUserLog(data);
    } catch (error) {
      console.error("Error fetching user log:", error);
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
      }
    } catch (error) {
      setOutput("Error stopping script");
    }
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 pb-12">
      <Navbar />
      
      <div className="flex-1 mt-28 px-6 lg:px-16 container mx-auto relative z-10">
        
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
            Welcome back, <span className="gradient-text">{profile?.name || "Athlete"}</span>
          </h1>
          <p className="text-slate-400 mt-2">Here is your training summary for today.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 border-l-4 border-l-neon-blue">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Workouts Completed</h3>
            <p className="text-3xl font-bold text-white flex items-baseline">
              {userLog ? userLog.totalExercisesCompleted : '0'}
              <span className="ml-2 text-sm text-neon-blue font-medium">sessions</span>
            </p>
          </div>
          <div className="glass-card p-6 border-l-4 border-l-neon-purple">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Calories Burned</h3>
            <p className="text-3xl font-bold text-white flex items-baseline">
              {userLog ? userLog.calories : '0'}
              <span className="ml-2 text-sm text-neon-purple font-medium">kcal</span>
            </p>
          </div>
          <div className="glass-card p-6 border-l-4 border-l-green-400">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Active Time</h3>
            <p className="text-3xl font-bold text-white flex items-baseline">
              {userLog ? formatDuration(userLog.duration) : '0m'}
              <span className="ml-2 text-sm text-green-400 font-medium">today</span>
            </p>
          </div>
        </div>

        {/* Console / Output Tracker (Sticky when running) */}
        {output && (
          <div className={`mb-10 glass-card p-6 border ${isRunning ? 'border-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border-slate-700'} flex flex-col md:flex-row justify-between items-center transition-all duration-300`}>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                {isRunning && <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse mr-2"></span>}
                AI Tracker Status
              </h3>
              <p className="text-white text-lg font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-800">{output}</p>
            </div>
            {isRunning && (
              <button
                onClick={stopPythonScript}
                className="mt-4 md:mt-0 px-8 py-3 bg-red-500/20 text-red-400 font-bold border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                STOP TRACKER
              </button>
            )}
          </div>
        )}

        {/* Exercises Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white tracking-wide mb-6">Start Training</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exercises.map((ex) => (
              <div
                key={ex.key}
                className={`glass-card p-6 flex flex-col items-start justify-between relative overflow-hidden group`}
              >
                {/* Gradient background effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${ex.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <h3 className="text-xl font-bold text-white mb-6 relative z-10">{ex.name}</h3>
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

        {/* Charts & Table */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white tracking-wide mb-6">Performance Analytics</h2>
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="flex-1 glass-card p-6">
              <LineChart data={caloriesData} title="Calories Burned (This Week)" />
            </div>
            <div className="flex-1 glass-card p-6">
              <DoughnutChart data={exerciseDistribution} title="Exercise Distribution" />
            </div>
          </div>
          
          {/* History Table */}
          <WorkoutHistoryTable />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
