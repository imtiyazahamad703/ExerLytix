import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#a3e635", // neon lime green
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} kcal`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#94a3b8", // slate-400
          precision: 0 // integers only
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
        }
      }
    }
  };

  return (
    <div className="w-full h-[250px]">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{title}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
