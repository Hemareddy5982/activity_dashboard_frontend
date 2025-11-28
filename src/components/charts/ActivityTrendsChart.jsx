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
        backgroundColor: "rgba(123, 97, 255, 0.08)", // soft purple fill
        borderColor: "rgba(123, 97, 255, 1)", // accent purple
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgba(123, 97, 255, 1)",
        pointBorderColor: "#181A1F",
        tension: 0.35, // smoother curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false, // minimal clean look
      },

      tooltip: {
        enabled: true,
        backgroundColor: "#1F2126",
        titleColor: "#ffffff",
        bodyColor: "#E5E7EB",
        borderColor: "#2A2C31",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#9CA3AF", // muted gray
          font: { size: 11 },
        },
        grid: {
          color: "rgba(255,255,255,0.05)", // soft grid
          borderColor: "rgba(255,255,255,0.1)",
        },
      },

      y: {
        ticks: {
          color: "#9CA3AF",
          font: { size: 11 },
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
          borderColor: "rgba(255,255,255,0.1)",
        },
        beginAtZero: true,
      },
    },

    elements: {
      point: {
        hitRadius: 15,
      },
      line: {
        borderJoinStyle: "round",
      },
    },
  };

  if (loading)
    return (
      <div style={{ color: "#9CA3AF" }}>
        Loading chart…
      </div>
    );

  return (
    <div style={{ height: "280px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ActivityTrendsChart;
