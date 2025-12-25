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

function formatLabel(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toISOString().slice(2, 10);
}

// Create smooth date sequence + ghost values
function fillMissingDates(labels, data) {
  if (!labels.length) return { fullLabels: ["No Data"], fullData: [0], ghostIndices: [0] };

  const start = new Date(labels[0]);
  const end = new Date(labels[labels.length - 1]);

  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

  const fullLabels = [];
  const fullData = [];
  const ghostIndices = [];

  const lookup = {};
  labels.forEach((l, i) => (lookup[l] = data[i]));

  for (let i = 0; i < dayCount; i++) {
    const newDate = new Date(start);
    newDate.setDate(start.getDate() + i);
    const key = newDate.toISOString().slice(0, 10);

    fullLabels.push(key);
    fullData.push(lookup[key] !== undefined ? lookup[key] : 0);

    if (lookup[key] === undefined) ghostIndices.push(i); // ghost (future/empty)
  }

  return { fullLabels, fullData, ghostIndices };
}

const DailyActivityChart = ({ labels, data, loading }) => {

  const { fullLabels, fullData, ghostIndices } = fillMissingDates(labels, data);

  const formattedLabels = fullLabels.map(formatLabel);

  const maxValue = Math.max(...fullData);
  const suggestedMax = maxValue === 0 ? 5 : maxValue + 4;

  // Professional Neon Gradient Colors  
  const neonPurple = {
    solid: "rgba(123, 97, 255, 1)",
    glow: "rgba(123, 97, 255, 0.35)",
    ghost: "rgba(123, 97, 255, 0.15)",
  };

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Daily Activity",
        data: fullData,
        backgroundColor: (ctx) => {
          const i = ctx.dataIndex;
          return ghostIndices.includes(i)
            ? neonPurple.ghost // ghost bar for missing dates
            : neonPurple.solid;
        },
        hoverBackgroundColor: (ctx) => {
          const i = ctx.dataIndex;
          return ghostIndices.includes(i)
            ? neonPurple.ghost
            : neonPurple.glow;
        },
        borderRadius: 8,
        barPercentage: 0.55,
        categoryPercentage: 0.55,
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
        backgroundColor: "rgba(25,25,30,0.7)",
        titleColor: "#fff",
        bodyColor: "#ddd",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: (value, i) =>
            ghostIndices.includes(i) ? "rgba(255,255,255,0.25)" : "#9CA3AF",
          font: { size: 10 },
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },

      y: {
        ticks: { color: "#9CA3AF", font: { size: 10 } },
        beginAtZero: true,
        suggestedMax,
        grid: {
          color: "rgba(255,255,255,0.04)",
        },
      },
    },
  };

  if (loading)
    return <div style={{ color: "#9CA3AF" }}>Loading…</div>;

  return (
    <div
      style={{
        height: "280px",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        padding: "1.4rem",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DailyActivityChart;
