// src/components/layout/Dashboard.jsx
import React, { useEffect, useState } from "react";
import StatsCard from "../cards/StatsCard";
import RecentActivityCard from "../cards/RecentActivityCard";
import ActivityTrendsChart from "../charts/ActivityTrendsChart";
import ActivityTypeChart from "../charts/ActivityTypeChart";
import DailyActivityChart from "../charts/DailyActivityChart";
import {
  getDashboardOverview,
  getAnalyticsSummary,
  getAnalyticsTrends,
} from "../../services/api";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState({ labels: [], data: [] });
  const [activityTypes, setActivityTypes] = useState({ labels: [], data: [] });
  const [daily, setDaily] = useState({ labels: [], data: [] });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      let overviewData = null;
      let summaryData = null;
      let trendsData = null;

      try {
        try {
          const res = await getDashboardOverview();
          overviewData = res.data;
          setOverview(overviewData);
          setRecent(overviewData.recent_activities || []);
        } catch {}

        try {
          const res = await getAnalyticsSummary();
          summaryData = res.data;
          setSummary(summaryData);

          setActivityTypes({
            labels: Object.keys(summaryData.by_event_type || {}),
            data: Object.values(summaryData.by_event_type || {}),
          });
        } catch {}

        try {
          const res = await getAnalyticsTrends();
          trendsData = res.data.items;

          setTrends({
            labels: trendsData.map((i) => i.date),
            data: trendsData.map((i) => i.count),
          });

          setDaily({
            labels: trendsData.map((i) => i.date),
            data: trendsData.map((i) => i.count),
          });
        } catch {}

        if (!overviewData && !summaryData && !trendsData) {
          setError("Failed to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const totalActivities = summary?.total_activities || overview?.total_activities || 0;
  const uniqueUsers = summary?.unique_users || 0;
  const activityTypesCount = summary?.by_event_type
    ? Object.keys(summary.by_event_type).length
    : 0;
  const recentCount = overview?.recent_activities?.length || 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#0E0F12",
        color: "#E5E7EB",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#181A1F",
          padding: "1rem 2rem",
          borderBottom: "1px solid #2A2C31",
          boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#F3F4F6",
              }}
            >
              Activity Dashboard
            </h1>
            <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
              Insights • Monitoring • Analytics
            </div>
          </div>

          <div
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "18px",
              background: loading ? "#7B61FF33" : "#10B98133",
              color: loading ? "#C4B5FD" : "#6EE7B7",
              border: loading ? "1px solid #7B61FF55" : "1px solid #10B98155",
              fontSize: "0.78rem",
              fontWeight: 600,
            }}
          >
            {loading ? "Loading…" : "Live"}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ padding: "2.5rem 3rem" }}>
        {error && (
          <div
            style={{
              background: "#7f1d1d55",
              border: "1px solid #ef444433",
              color: "#fca5a5",
              padding: "1rem",
              borderRadius: "10px",
              marginBottom: "2rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <StatsCard title="TOTAL ACTIVITIES" value={totalActivities} icon="📊" color="#7B61FF" subtitle="All Activity" />
          <StatsCard title="ACTIVE USERS" value={uniqueUsers} icon="👥" color="#10B981" subtitle="Unique Users" />
          <StatsCard title="ACTIVITY TYPES" value={activityTypesCount} icon="🏷️" color="#F59E0B" subtitle="Events" />
          <StatsCard title="RECENT ACTIVITY" value={recentCount} icon="🕒" color="#3B82F6" subtitle="Today" />
        </div>

        {/* Charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Trends */}
          <div
            style={{
              background: "#181A1F",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #2A2C31",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.2rem", marginBottom: "1rem" }}>
              📈 Activity Trends
            </h3>
            <ActivityTrendsChart labels={trends.labels} data={trends.data} loading={loading} />
          </div>

          {/* Distribution */}
          <div
            style={{
              background: "#181A1F",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #2A2C31",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.2rem", marginBottom: "1rem" }}>
              🥧 Event Distribution
            </h3>
            <ActivityTypeChart labels={activityTypes.labels} data={activityTypes.data} loading={loading} />
          </div>
        </div>

        {/* Daily */}
        <div
          style={{
            background: "#181A1F",
            borderRadius: "12px",
            padding: "1.5rem",
            border: "1px solid #2A2C31",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.2rem", marginBottom: "1rem" }}>
            📊 Daily Activity Timeline
          </h3>
          <DailyActivityChart labels={daily.labels} data={daily.data} loading={loading} />
        </div>

        {/* Recent */}
        <div
          style={{
            background: "#181A1F",
            borderRadius: "12px",
            padding: "1.5rem",
            border: "1px solid #2A2C31",
          }}
        >
          <RecentActivityCard activities={recent} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
