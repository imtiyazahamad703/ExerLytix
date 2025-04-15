import React, { useEffect, useState } from 'react';

function LiveDashboard() {
  const [stats, setStats] = useState({ exercise: 'Waiting...', count: 0, status: true });

  useEffect(() => {
    // In a real scenario, this connects to ws://localhost:8080/ws-ai using SockJS/STOMP
    // For this prototype, we'll simulate receiving data
    console.log("Connected to AI WebSocket feed.");
    
    const interval = setInterval(() => {
      // Dummy data simulation
      setStats(prev => ({
        ...prev,
        exercise: 'bicep-curl',
        count: prev.status ? prev.count + 1 : prev.count,
        status: !prev.status
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">Live AI Training Stats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <h3 className="text-gray-400 font-semibold mb-2">Current Exercise</h3>
          <p className="text-4xl font-bold text-emerald-400 capitalize">{stats.exercise.replace('-', ' ')}</p>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <h3 className="text-gray-400 font-semibold mb-2">Reps Count</h3>
          <p className="text-4xl font-bold text-blue-400">{stats.count}</p>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <h3 className="text-gray-400 font-semibold mb-2">Form Status</h3>
          <p className={`text-4xl font-bold ${stats.status ? 'text-green-500' : 'text-yellow-500'}`}>
            {stats.status ? 'Up' : 'Down'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LiveDashboard;
