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

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center glass-card mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">Workout History</h2>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 text-sm uppercase tracking-wider border-b border-slate-700">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Push-Up</th>
                <th className="px-6 py-4 font-semibold">Pull-Up</th>
                <th className="px-6 py-4 font-semibold">Squat</th>
                <th className="px-6 py-4 font-semibold">Walk</th>
                <th className="px-6 py-4 font-semibold">Sit-Up</th>
                <th className="px-6 py-4 font-semibold">Bicep Curl</th>
                <th className="px-6 py-4 font-semibold">Shoulder Raise</th>
                <th className="px-6 py-4 font-semibold">Shoulder Press</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {workouts.length > 0 ? (
                workouts.map((workout, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-slate-300 font-medium whitespace-nowrap">
                      {workout.date}
                    </td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.pushUp || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.pullUp || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.squat || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.walk || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.sitUp || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.bicepCurl || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.shoulderRaise || 0}</td>
                    <td className="px-6 py-4 text-slate-400 group-hover:text-neon-blue transition-colors">{workout.shoulderPress || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-slate-500">
                    No workout history found. Start exercising today!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistoryTable;