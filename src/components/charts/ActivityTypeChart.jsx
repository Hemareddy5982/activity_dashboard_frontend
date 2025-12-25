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
        borderColor: "rgba(255,255,255,0.20)",
        hoverBorderColor: "rgba(255,255,255,0.35)",
        backgroundColor: [
          "#7B61FF",
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#A855F7",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.85)",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(25,25,30,0.55)",
        titleColor: "#fff",
        bodyColor: "#E5E7EB",
        borderColor: "rgba(255,255,255,0.25)",
        borderWidth: 1,
      },
    },
  };

  if (loading)
    return <div style={{ color: "#9CA3AF" }}>Loading…</div>;

  return (
    <div style={{ height: "280px" }}>   {/* ✔ container controls height */}
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ActivityTypeChart;
