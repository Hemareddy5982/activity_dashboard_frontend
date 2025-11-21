// src/components/charts/ActivityTypeChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActivityTypeChart = ({ labels, data, loading }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Activity Types",
        data,
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#17a2b8",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}` } },
    },
  };

  if (loading) return <div>Loading chart...</div>;

  return <Doughnut data={chartData} options={options} />;
};

export default ActivityTypeChart;
