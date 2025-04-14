import React, { useEffect, useState, useRef } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [quote, setQuote] = useState(null);
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

    // Process Doughnut Chart
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

    // Process Line Chart
    const recent = [...workouts].reverse().slice(0, 7).reverse();
    const dates = recent.map(w => {
      const d = new Date(w.date);
      return `${d.getMonth()+1}/${d.getDate()}`;
    });
    
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
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full relative z-10">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                Welcome back, <span className="gradient-text">{profile?.name || "Athlete"}</span>
              </h1>
              <p className="text-slate-400 mt-2">Track your progress and push your limits today.</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Profile Image Uploader */}
              <div 
                className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden cursor-pointer border-2 border-slate-700 hover:border-neon-blue transition-colors group"
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
            <div className="glass-card p-6 border-l-4 border-l-emerald-400">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Active Time</h3>
              <p className="text-3xl font-bold text-white flex items-baseline">
                {userLog ? formatDuration(userLog.duration) : '0m'}
                <span className="ml-2 text-sm text-emerald-400 font-medium">today</span>
              </p>
            </div>
          </div>



          {/* Charts & Table */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white tracking-wide mb-6">Performance Analytics</h2>
            
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
