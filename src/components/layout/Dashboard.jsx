import React, { useEffect, useState } from "react";

import StatsCard from "../cards/StatsCard";
import RecentActivityCard from "../cards/RecentActivityCard";

import ActivityTrendsChart from "../charts/ActivityTrendsChart";
import ActivityTypeChart from "../charts/ActivityTypeChart";
import DailyActivityChart from "../charts/DailyActivityChart";
import ActivityCalendarHeatmap from "../charts/ActivityCalendarHeatmap"; // NEW

import Pagination from "../common/Pagination";

import {
  getDashboardOverview,
  getAnalyticsSummary,
  getAnalyticsTrends,
  getMonthlyHeatmapSource, // NEW
} from "../../services/api";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [summary, setSummary] = useState(null);
  const [activityTypes, setActivityTypes] = useState({ labels: [], data: [] });
  const [recent, setRecent] = useState([]);

  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Trends Chart State
  // -----------------------------
  const [trendDays, setTrendDays] = useState(14);
  const [trendsPage, setTrendsPage] = useState(1);
  const trendsLimit = 7;
  const [trendsTotalPages, setTrendsTotalPages] = useState(1);
  const [trends, setTrends] = useState({ labels: [], data: [] });

  // -----------------------------
  // Daily Chart State
  // -----------------------------
  const [dailyDays, setDailyDays] = useState(14);
  const [dailyPage, setDailyPage] = useState(1);
  const dailyLimit = 7;
  const [dailyTotalPages, setDailyTotalPages] = useState(1);
  const [daily, setDaily] = useState({ labels: [], data: [] });

  // -----------------------------
  // Heatmap State (Same API)
  // -----------------------------
  const [heatmapRaw, setHeatmapRaw] = useState([]);
  const [heatmapMonth, setHeatmapMonth] = useState(new Date().getMonth()); // 0-11
  const [heatmapYear, setHeatmapYear] = useState(new Date().getFullYear());

  // --------------------------------------------------------
  // Load Overview + Summary (one-time)
  // --------------------------------------------------------
  useEffect(() => {
    (async () => {
      setLoading(true);

      const o = await getDashboardOverview();
      setOverview(o.data);
      setRecent(o.data?.recent_activities || []);

      const s = await getAnalyticsSummary();
      setSummary(s.data);

          setActivityTypes({
        labels: Object.keys(s.data?.by_event_type || {}),
        data: Object.values(s.data?.by_event_type || {}),
          });

      setLoading(false);
    })();
  }, []);

  // --------------------------------------------------------
  // Load Trends (depends on page + days)
  // --------------------------------------------------------
  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await getAnalyticsTrends(trendDays, trendsPage, trendsLimit);
      const items = res.data.items;

          setTrends({
        labels: items.map((i) => i.date),
        data: items.map((i) => i.count),
          });

      setTrendsTotalPages(Math.max(1, Math.ceil(res.data.total / trendsLimit)));

      setLoading(false);
    })();
  }, [trendDays, trendsPage]);

  // --------------------------------------------------------
  // Load Daily Chart (depends on page + days)
  // --------------------------------------------------------
  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await getAnalyticsTrends(dailyDays, dailyPage, dailyLimit);
      const items = res.data.items;

          setDaily({
        labels: items.map((i) => i.date),
        data: items.map((i) => i.count),
          });

      setDailyTotalPages(Math.max(1, Math.ceil(res.data.total / dailyLimit)));

        setLoading(false);
    })();
  }, [dailyDays, dailyPage]);

  // --------------------------------------------------------
  // Load Heatmap (same API, independent)
  // --------------------------------------------------------
  useEffect(() => {
    (async () => {
      const res = await getMonthlyHeatmapSource(60); // last 60 days
      setHeatmapRaw(res.data.items);
    })();
  }, []);

  // Extract chosen month data
  const heatmapMonthData = heatmapRaw.filter((i) => {
    const d = new Date(i.date);
    return d.getMonth() === heatmapMonth && d.getFullYear() === heatmapYear;
  });

  const totalActivities =
    summary?.total_activities || overview?.total_activities || 0;
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
          position: "sticky",
          top: 0,
          zIndex: 10,
          }}
        >
        <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#F3F4F6" }}>
              Activity Dashboard
            </h1>
            <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
              Insights • Monitoring • Analytics
            </div>
      </header>

      <main style={{ padding: "2rem 3rem" }}>
        {/* -------------------------------------------------- */}
        {/* STATS CARDS */}
        {/* -------------------------------------------------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "0.6rem",
            marginBottom: "2.5rem",
          }}
        >
          <StatsCard title="TOTAL ACTIVITIES" value={totalActivities} icon="📊" color="#7B61FF" subtitle="All Activity" />
          <StatsCard title="ACTIVE USERS" value={uniqueUsers} icon="👥" color="#10B981" subtitle="Unique Users" />
          <StatsCard title="ACTIVITY TYPES" value={activityTypesCount} icon="🏷️" color="#F59E0B" subtitle="Events" />
          <StatsCard title="RECENT ACTIVITY" value={recentCount} icon="🕒" color="#3B82F6" subtitle="Today" />
        </div>

        {/* -------------------------------------------------- */}
        {/* HEATMAP BLOCK (NEW) */}
        {/* -------------------------------------------------- */}
        {/* <div
          style={{
            background: "#181A1F",
            borderRadius: "12px",
            padding: "1.5rem",
            border: "1px solid #2A2C31",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>🔥 Monthly Activity Heatmap</h3>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <select
                value={heatmapMonth}
                onChange={(e) => setHeatmapMonth(Number(e.target.value))}
                style={{
                  padding: "6px",
                  background: "#0E0F12",
                  color: "white",
                  borderRadius: "6px",
                  border: "1px solid #2A2C31",
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>
                    {new Date(2025, i, 1).toLocaleString("en", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              <select
                value={heatmapYear}
                onChange={(e) => setHeatmapYear(Number(e.target.value))}
                style={{
                  padding: "6px",
                  background: "#0E0F12",
                  color: "white",
                  borderRadius: "6px",
                  border: "1px solid #2A2C31",
                }}
              >
                {[2024, 2025, 2026].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ActivityCalendarHeatmap monthData={heatmapMonthData} />
        </div> */}

        {/* -------------------------------------------------- */}
        {/* CHARTS ROW (TRENDS + DONUT) */}
        {/* -------------------------------------------------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* TRENDS */}
          <div
            style={{
              background: "#181A1F",
              borderRadius: "12px",
              border: "1px solid #2A2C31",
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>📈 Activity Trends</h3>
              <input
                type="number"
                min="1"
                max="90"
                value={trendDays}
                onChange={(e) => {
                  setTrendDays(Number(e.target.value));
                  setTrendsPage(1);
                }}
                style={{
                  width: "70px",
                  padding: "5px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  borderRadius: "6px",
                }}
              />
            </div>

            <ActivityTrendsChart
              labels={trends.labels}
              data={trends.data}
              loading={loading}
            />

            <Pagination
              currentPage={trendsPage}
              totalPages={trendsTotalPages}
              onPageChange={setTrendsPage}
            />
          </div>

          {/* EVENT DISTRIBUTION */}
          <div
            style={{
              background: "#181A1F",
              borderRadius: "12px",
              border: "1px solid #2A2C31",
              padding: "1.5rem",
            }}
          >
            <h3 style={{ margin: 0, marginBottom: "1rem" }}>🥧 Event Distribution</h3>

            <ActivityTypeChart
              labels={activityTypes.labels}
              data={activityTypes.data}
            />
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* DAILY ACTIVITY */}
        {/* -------------------------------------------------- */}
        <div
          style={{
            background: "#181A1F",
            borderRadius: "12px",
            border: "1px solid #2A2C31",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>📊 Daily Activity Timeline</h3>

            <input
              type="number"
              min="1"
              max="90"
              value={dailyDays}
              onChange={(e) => {
                setDailyDays(Number(e.target.value));
                setDailyPage(1);
              }}
              style={{
                width: "70px",
                padding: "5px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                borderRadius: "6px",
              }}
            />
          </div>

          <DailyActivityChart
            labels={daily.labels}
            data={daily.data}
            loading={loading}
          />

          <Pagination
            currentPage={dailyPage}
            totalPages={dailyTotalPages}
            onPageChange={setDailyPage}
          />
        </div>

        {/* -------------------------------------------------- */}
        {/* RECENT ACTIVITY */}
        {/* -------------------------------------------------- */}
        <div
          style={{
            background: "#181A1F",
            borderRadius: "12px",
            border: "1px solid #2A2C31",
            padding: "1.5rem",
          }}
        >
          <RecentActivityCard activities={recent} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
