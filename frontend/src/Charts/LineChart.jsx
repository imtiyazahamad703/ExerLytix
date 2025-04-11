import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, title }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{title}</h3>
      <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default LineChart;
