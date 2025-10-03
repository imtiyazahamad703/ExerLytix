import React, { useEffect, useState } from "react";
import workoutData from "../data/workoutData.json"; // Import JSON directly

const WorkoutHistoryTable = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts(workoutData); // Load JSON data into state
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Workout History</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Push-Up</th>
              <th className="px-4 py-2 text-left">Pull-Up</th>
              <th className="px-4 py-2 text-left">Squat</th>
              <th className="px-4 py-2 text-left">Walk</th>
              <th className="px-4 py-2 text-left">Sit-Up</th>
              <th className="px-4 py-2 text-left">Bicep Curl</th>
              <th className="px-4 py-2 text-left">Shoulder Raise</th>
              <th className="px-4 py-2 text-left">Shoulder Press</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {workouts.map((workout, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{workout.date}</td>
                <td className="px-4 py-2">{workout.pushUp}</td>
                <td className="px-4 py-2">{workout.pullUp}</td>
                <td className="px-4 py-2">{workout.squat}</td>
                <td className="px-4 py-2">{workout.walk}</td>
                <td className="px-4 py-2">{workout.sitUp}</td>
                <td className="px-4 py-2">{workout.bicepCurl}</td>
                <td className="px-4 py-2">{workout.shoulderRaise}</td>
                <td className="px-4 py-2">{workout.shoulderPress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutHistoryTable;
