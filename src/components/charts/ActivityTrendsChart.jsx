// src/components/charts/ActivityTrendsChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const ActivityTrendsChart = ({ labels, data, loading }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Activity Trends",
        data,
        fill: true,
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "#007bff",
        pointBackgroundColor: "#007bff",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Activity Count" }, beginAtZero: true },
    },
  };

  if (loading) return <div>Loading chart...</div>;

  return <Line data={chartData} options={options} />;
};

export default ActivityTrendsChart;