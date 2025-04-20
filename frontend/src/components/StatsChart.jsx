import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', calories: 400, reps: 50 },
  { day: 'Tue', calories: 300, reps: 40 },
  { day: 'Wed', calories: 550, reps: 70 },
  { day: 'Thu', calories: 200, reps: 25 },
  { day: 'Fri', calories: 600, reps: 80 },
  { day: 'Sat', calories: 450, reps: 60 },
  { day: 'Sun', calories: 700, reps: 100 },
];

function StatsChart() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mt-8">
      <h3 className="text-xl font-bold text-white mb-6">Weekly Performance</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} 
            />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="reps" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatsChart;
