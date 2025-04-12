import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const WorkoutHistoryTable = ({ workoutsData = null }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (workoutsData) {
      setWorkouts(workoutsData);
      setLoading(false);
    } else if (profile?.userId) {
      fetchHistory();
    }
  }, [profile, workoutsData]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/exercise/history/${profile.userId}`);
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "0m";
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    else return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-slate-800/50 rounded-xl shadow-sm mt-8 border border-slate-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden mt-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700/50 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Workout History</h2>
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-400/10 border border-indigo-200 dark:border-indigo-400/30 px-3 py-1 rounded-full">
          {workouts.length} sessions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700">
              <th className="px-6 py-4 font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Date</th>
              <th className="px-6 py-4 font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider text-center">Calories</th>
              <th className="px-6 py-4 font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider text-center">Duration</th>
              <th className="px-6 py-4 font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider text-center">Push-Ups</th>
              <th className="px-6 py-4 font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider text-center">Pull-Ups</th>
              <th className="px-6 py-4 font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider text-center">Squats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700/50">
            {workouts.length > 0 ? (
              workouts.map((workout, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {formatDate(workout.date)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                      {workout.calories || 0} kcal
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500 dark:text-slate-400">
                    {formatDuration(workout.duration)}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-slate-300">{workout.pushUp || "-"}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-slate-300">{workout.pullUp || "-"}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-slate-300">{workout.squat || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                  No workout history found. Start exercising today!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutHistoryTable;