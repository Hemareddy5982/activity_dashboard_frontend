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

function formatLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toISOString().slice(2, 10); // yy-mm-dd
}

const ActivityTrendsChart = ({ labels, data, loading }) => {
  const processedLabels = labels.length ? labels.map(formatLabel) : ["No Data"];
  const processedData = labels.length ? data : [0];

  const maxValue = Math.max(...processedData);
  const suggestedMax = maxValue === 0 ? 5 : maxValue + 5;

  const chartData = {
    labels: processedLabels,
    datasets: [
      {
        label: "Activity Trends",
        data: processedData,
        fill: true,
        backgroundColor: "rgba(123, 97, 255, 0.08)",
        borderColor: "#7B61FF",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#9CA3AF", font: { size: 10 } },
      },
      y: {
        ticks: { color: "#9CA3AF", font: { size: 10 } },
        beginAtZero: true,
        suggestedMax,
      },
    },
  };

  if (loading) return <div style={{ color: "#9CA3AF" }}>Loading…</div>;

  return (
    <div style={{ height: "280px" }}>
      {/* ✅ Add the text label here */}
      <div className="date-range-label" style={{ color: "#9CA3AF", marginBottom: "6px", fontSize: "12px" }}>
        Last 14 Days
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default ActivityTrendsChart;
