import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, title }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition transform">
      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
      <Doughnut data={data} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
    </div>
  );
};

export default DoughnutChart;
