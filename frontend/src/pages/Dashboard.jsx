import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";
import WorkoutHistoryTable from "../components/WorkoutHistoryTable";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const { profile } = useAuth();
  const [userLog, setUserLog] = useState(null);
  const [history, setHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [quote, setQuote] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
      setProfilePic(savedPic);
    } else {
      import("../assets/banners/Profile Photo-3.png").then(m => setProfilePic(m.default));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic Chart Data States
  const [caloriesData, setCaloriesData] = useState({ labels: [], datasets: [] });
  const [exerciseDistribution, setExerciseDistribution] = useState({ labels: [], datasets: [] });



  useEffect(() => {
    if (profile?.userId) {
      fetchUserLog(profile.userId);
      fetchHistory(profile.userId);
    }
  }, [profile]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://api.api-ninjas.com/v1/quotes?category=fitness", {
          headers: { 'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY }
        });
        const data = await res.json();
        if (data && data.length > 0) setQuote(data[0]);
      } catch (e) {
        console.error("Quote fetch error:", e);
      }
    };
    fetchQuote();
  }, []);

  const fetchUserLog = async (userId) => {
    try {
      const response = await axiosInstance.get(`/exercise/latest/${userId}?t=${Date.now()}`);
      setUserLog(response.data);
    } catch (error) {
      console.error("Error fetching user log:", error);
    }
  };

  const fetchHistory = async (userId) => {
    try {
      const response = await axiosInstance.get(`/exercise/history/${userId}?t=${Date.now()}`);
      const workouts = response.data;
      setHistory(workouts);
      processChartData(workouts);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  const handleRefresh = async () => {
    if (!profile?.userId) return;
    setIsRefreshing(true);
    await Promise.all([
      fetchUserLog(profile.userId),
      fetchHistory(profile.userId)
    ]);
    setTimeout(() => setIsRefreshing(false), 500); // Small delay for UX
  };

  const processChartData = (workouts) => {
    if (!workouts || workouts.length === 0) return;

    // Get current week's workouts (Monday to Sunday)
    const now = new Date();
    const currentDay = now.getDay();
    const diffToMon = currentDay === 0 ? 6 : currentDay - 1;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - diffToMon);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyWorkouts = workouts.filter(w => {
      // replace dashes to avoid UTC timezone shift issues, if it's just a date string
      const d = new Date(w.date);
      return d >= startOfWeek && d <= endOfWeek;
    });

    // Process Doughnut Chart (Weekly)
    let totals = { pushUp: 0, pullUp: 0, squat: 0, walk: 0, sitUp: 0, bicepCurl: 0, shoulderRaise: 0, shoulderPress: 0 };
    
    weeklyWorkouts.forEach(w => {
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

    // Process Bar Chart (Weekly Mon-Sun)
    const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const caloriesByDay = [0, 0, 0, 0, 0, 0, 0];

    weeklyWorkouts.forEach(w => {
      const d = new Date(w.date);
      let dayIndex = d.getDay() - 1;
      if (dayIndex === -1) dayIndex = 6; // Sunday
      caloriesByDay[dayIndex] += w.calories || 0;
    });

    setCaloriesData({
      labels: weekLabels,
      datasets: [
        {
          label: "Calories",
          data: caloriesByDay,
          backgroundColor: "#a3e635", // neon lime green
          borderRadius: 4,
          barThickness: 20,
        }
      ]
    });
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
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-10 pt-20 pb-8 max-w-7xl mx-auto w-full relative z-10">
          
          {/* Header */}
          <div className="mb-12 flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-wide">
                Welcome back, <span className="gradient-text">{profile?.name || "Athlete"}</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Track your progress and push your limits today.</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Refresh Button */}
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-neon-blue hover:text-neon-blue text-slate-500 dark:text-slate-300 transition-all shadow-md group"
                title="Refresh Data"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${isRefreshing ? 'animate-spin text-neon-blue' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              
              {/* Profile Image Uploader */}
              <div 
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-white font-bold text-3xl shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer border-2 border-slate-300 dark:border-slate-700 hover:border-neon-blue transition-colors group"
                onClick={() => fileInputRef.current?.click()}
              >
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'
                )}
                {/* Overlay on hover to show camera icon */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden"
                />
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
          </div>

          {/* Quote of the Day */}
          {quote && (
            <div className="mb-10 p-8 glass-card border-l-4 border-l-neon-purple relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-medium text-white italic mb-4 leading-relaxed">"{quote.quote}"</p>
                <p className="text-neon-blue font-bold tracking-widest uppercase text-sm">— {quote.author}</p>
              </div>
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass-card p-6 border-l-4 border-l-neon-blue">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Workouts Completed</h3>
              <p className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline">
                {history.length}
                <span className="ml-2 text-sm text-neon-blue font-medium">sessions</span>
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-neon-purple">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Calories Burned</h3>
              <p className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline">
                {userLog?.calories || 0}
                <span className="ml-2 text-sm text-neon-purple font-medium">kcal</span>
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-emerald-400">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Active Time</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                {userLog ? formatDuration(userLog.duration) : '0s'}
                </span>
                <span className="text-sm font-medium text-emerald-500 dark:text-neon-blue mb-1">today</span>
              </div>
            </div>
          </div>



          {/* Charts & Table */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white tracking-wide mb-6">Performance Analytics</h2>
            
            {history.length > 0 ? (
              <>
                <div className="flex flex-col lg:flex-row gap-6 mb-12">
                  <div className="flex-[2] glass-card p-6 border border-slate-200 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800">
                    <BarChart data={caloriesData} title="Calories Burned (This Week)" />
                  </div>
                  <div className="flex-[1] glass-card p-6 min-w-0 flex items-center justify-center">
                    <div className="w-full max-w-sm">
                      <DoughnutChart data={exerciseDistribution} title="Exercise Distribution (This Week)" />
                    </div>
                  </div>
                </div>
                <WorkoutHistoryTable workoutsData={history} />
              </>
            ) : (
              <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-24 h-24 bg-slate-800/80 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-neon-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Workouts Yet!</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Your performance analytics and history table will appear here once you complete your first AI-tracked workout.
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                  className="mt-8 btn-neon"
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
