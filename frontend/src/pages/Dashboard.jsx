
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Navbar from "../components/Navbar";
import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import WorkoutHistoryTable from "../components/WorkoutHistoryTable";
import { useAuth } from "../context/AuthContext";
import { use } from "react";


const Dashboard = () => {
  const { profile } = useAuth();
const [userLog, setUserLog] = useState({});

  // Calories burned over a week
const caloriesData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Calories Burned",
      data: [450, 500, 400, 600, 550, 700, 650],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.3,
    },
  ],
};

// Exercise type distribution
const exerciseDistribution = {
  labels: ["Push-Up", "Squat", "Pull-Up", "Walk", "Sit-Up"],
  datasets: [
    {
      label: "Exercises Completed",
      data: [10, 15, 5, 20, 8],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
      ],
      borderWidth: 1,
    },
  ],
};

  const goToProfile = () => {
    window.location.href = "http://localhost:8081/profile";
  };

  const [output, setOutput] = useState("");
  const runPythonScript = async (exerciseType) => {
    try {
      const response = await fetch("http://localhost:5000/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise_type: exerciseType }),
      });
      const data = await response.json();
      setOutput(data.message || data.error);
    } catch (error) {
      setOutput("Error starting script");
    }
  };

  useEffect(() => {
    if (profile?.userId) {
      fetchUserLog(profile.userId);
    }
  }, []);

  const formatDuration = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  else return `${mins}m`;
};

   // 👇 Add this function in your Dashboard.jsx
  const fetchUserLog = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/exercise/latest/${userId}`);
      const data = await response.json();
      
      setUserLog(data); // ✅ Store in state
      console.log(userLog);
    } catch (error) {
      console.error("❌ Error fetching user log:", error);
    }
};


  const stopPythonScript = async () => {
  try {
    const response = await fetch("http://localhost:5000/stop-python", {
      method: "POST",
    });
    const data = await response.json();

    setOutput(data.message || data.error);

    // ✅ Agar successfully stop ho gaya, then fetch latest exercise log
    if (data.message && !data.error) {
      fetchUserLog(profile.userId); // logged-in user
    }
  } catch (error) {
    setOutput("Error stopping script");
  }
};

  // Colorful cards
  const exercises = [
    { name: "Push-Up", key: "push-up", bg: "bg-red-400" },
    { name: "Pull-Up", key: "pull-up", bg: "bg-yellow-400" },
    { name: "Squat", key: "squat", bg: "bg-green-400" },
    { name: "Walk", key: "walk", bg: "bg-blue-400" },
    { name: "Sit-Up", key: "sit-up", bg: "bg-pink-400" },
    { name: "Bicep Curl", key: "bicep", bg: "bg-indigo-400" },
    { name: "Shoulder Raise", key: "shoulder-raise", bg: "bg-purple-400" },
    { name: "Shoulder Press", key: "shoulder-press", bg: "bg-teal-400" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="flex flex-1 mt-24"> {/* increased top margin for gap */}
        {/* Sidebar */}
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 pt-6 md:pt-0">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Workouts</h3>
              <p className="text-gray-500 text-xl">Completed: {userLog ? userLog.totalExercisesCompleted : 'Loading...'}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Calories Burned</h3>
              <p className="text-gray-500 text-xl">Today: {userLog ? userLog.calories : 'Loading...'} kcal</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Active Time</h3>
              <p className="text-gray-500 text-xl">Today: {userLog ? formatDuration(userLog.duration) : 'Loading...'}</p>
            </div>
          </div>
          {/* Exercises Section */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Start Exercise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exercises.map((ex) => (
              <div
                key={ex.key}
                className={`rounded-xl shadow-lg p-5 flex flex-col items-center justify-between transition transform hover:scale-105 ${ex.bg} text-black`}
              >
                <h3 className="text-xl font-semibold mb-4">{ex.name}</h3>
                <button
                  onClick={() => runPythonScript(ex.key)}
                  className="px-4 py-2 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
          {/* Output Section */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Script Output</h3>
            <p className="text-gray-600 text-lg">{output || "No exercise running..."}</p>
            <button
              onClick={stopPythonScript}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Stop All Scripts
            </button>
          </div>

          <div className="mt-8 w-full">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Performance Charts</h2>
  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex-1 bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
      <LineChart data={caloriesData} title="Calories Burned" />
    </div>

    <div className="flex-1 bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
      <DoughnutChart data={exerciseDistribution} title="Exercise Distribution" />
    </div>

   
  </div>
</div>
<WorkoutHistoryTable />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
