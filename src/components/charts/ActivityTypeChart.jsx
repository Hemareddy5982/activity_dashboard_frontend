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
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.20)", // soft glass border
        hoverBorderColor: "rgba(255,255,255,0.35)",

        // ⭐ BRIGHT COLORS (Linear-style vibrant palette)
        backgroundColor: [
          "#7B61FF",  // bright purple
          "#3B82F6",  // bright blue
          "#10B981",  // bright green
          "#F59E0B",  // bright amber
          "#EF4444",  // bright red
          "#A855F7",  // bright violet
        ],

        hoverBackgroundColor: [
          "#8C76FF",
          "#5393FF",
          "#22C794",
          "#FFAB26",
          "#F76565",
          "#B76AFF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // modern thin donut

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.85)",
          padding: 10,
          font: { size: 12 },
          boxWidth: 14,
        },
      },

      tooltip: {
        enabled: true,
        backgroundColor: "rgba(25,25,30,0.55)", // glass tooltip
        titleColor: "#ffffff",
        bodyColor: "#E5E7EB",
        borderColor: "rgba(255,255,255,0.25)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}`,
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
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ActivityTypeChart;
