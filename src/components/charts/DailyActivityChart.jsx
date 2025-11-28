// src/components/charts/DailyActivityChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DailyActivityChart = ({ labels, data, loading }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Daily Activities",
        data,
        backgroundColor: "rgba(123, 97, 255, 0.85)", // bright neon purple
        hoverBackgroundColor: "rgba(123, 97, 255, 1)",
        borderColor: "rgba(255,255,255,0.2)",
        borderWidth: 1,
        borderRadius: 6, // modern rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },

      tooltip: {
        enabled: true,
        backgroundColor: "rgba(25,25,30,0.55)", // glass tooltip
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        titleColor: "#ffffff",
        bodyColor: "#E5E7EB",
        cornerRadius: 8,
        padding: 10,
        displayColors: false,
      },
    },

    scales: {
      x: {
        ticks: { color: "#9CA3AF", font: { size: 11 } },
        grid: {
          color: "rgba(255,255,255,0.05)",
          borderColor: "rgba(255,255,255,0.1)",
        },
      },

      y: {
        beginAtZero: true,
        ticks: { color: "#9CA3AF", font: { size: 11 } },
        grid: {
          color: "rgba(255,255,255,0.05)",
          borderColor: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  if (loading)
    return <div style={{ color: "#9CA3AF" }}>Loading chart…</div>;

  return (
    <div
      style={{
        height: "260px",

        // ⭐ GLASS CARD WRAPPER
        background: "rgba(255,255,255,0.06)",
        borderRadius: "14px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        padding: "1.2rem",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DailyActivityChart;
