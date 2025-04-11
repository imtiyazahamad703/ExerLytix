import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, title }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 w-full text-left">{title}</h3>
      <div className="w-full max-w-[250px]">
        <Doughnut data={data} options={{ responsive: true, plugins: { legend: { position: "bottom", labels: { color: "#94a3b8" } } } }} />
      </div>
    </div>
  );
};

export default DoughnutChart;
