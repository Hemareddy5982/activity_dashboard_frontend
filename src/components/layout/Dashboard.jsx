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
      setError(null);

      let overviewData = null;
      let summaryData = null;
      let trendsData = null;

      try {
        // Fetch overview
        try {
          console.log('Fetching overview...');
          const overviewRes = await getDashboardOverview();
          overviewData = overviewRes.data;
          console.log('Overview Success:', overviewData);
        } catch (err) {
          console.error('Overview API failed:', err.message);
          setError('Overview API unavailable. Loading other data...');
        }

        // Fetch summary
        try {
          console.log('Fetching summary...');
          const summaryRes = await getAnalyticsSummary();
          summaryData = summaryRes.data;
          console.log('Summary Success:', summaryData);
        } catch (err) {
          console.error('Summary API failed:', err.message);
          setError('Summary API unavailable. Loading other data...');
        }

        // Fetch trends
        try {
          console.log('Fetching trends...');
          const trendsRes = await getAnalyticsTrends();
          trendsData = trendsRes.data.items;
          console.log('Trends Success:', trendsData);
        } catch (err) {
          console.error('Trends API failed:', err.message);
          setError('Trends API unavailable. Loading other data...');
        }

        // Set states with available data
        if (overviewData) {
          setOverview(overviewData);
          setRecent(overviewData.recent_activities || []);
        }

        if (summaryData) {
          setSummary(summaryData);
          setActivityTypes({
            labels: Object.keys(summaryData.by_event_type || {}),
            data: Object.values(summaryData.by_event_type || {}),
          });
        }
      console.log('Trends Data:', trendsData);
        if (trendsData) {
          setTrends({
            labels: trendsData.map((item) => item.date),
            data: trendsData.map((item) => item.count),
          });
          setDaily({
            labels: trendsData.map((item) => item.date),
            data: trendsData.map((item) => item.count),
          });
        }

        // Clear error if at least some data loaded
        if (overviewData || summaryData || trendsData) {
          setError(null);
        }

      } catch (err) {
        console.error('Unexpected error:', err);
        // Only show error if no data loaded at all
        if (!overviewData && !summaryData && !trendsData) {
          setError('Failed to load dashboard data. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const totalActivities = summary?.total_activities || overview?.total_activities || 0;
  const uniqueUsers = summary?.unique_users || 0;
  const activityTypesCount = summary?.by_event_type ? Object.keys(summary.by_event_type).length : 0;
  const recentCount = overview?.recent_activities?.length || 0;

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "#f5f7fa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      padding: 0
    }}>

      {/* Clean Minimal Header */}
      <header style={{
        background: "white",
        padding: "1.5rem 2rem",
        borderBottom: "1px solid #e1e5e9",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "#1a202c"
            }}>
              📊 Activity Dashboard
            </h1>
          </div>
          <div style={{
            padding: "0.5rem 1rem",
            background: loading ? "#ffeaa7" : "#d4edda",
            color: loading ? "#856404" : "#155724",
            borderRadius: "20px",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}>
            {loading ? "Loading..." : "Live Data"}
          </div>
        </div>
      </header>

      <main style={{ padding: "3rem 4rem" }}>

        {error && (
          <div style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            marginBottom: "2rem",
            border: "1px solid #f5c6cb"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          <StatsCard
            title="TOTAL ACTIVITIES"
            value={loading ? "..." : totalActivities.toLocaleString()}
            icon="📊"
            color="#007bff"
            subtitle="All-time activities"
          />
          <StatsCard
            title="ACTIVE USERS"
            value={loading ? "..." : uniqueUsers.toLocaleString()}
            icon="👥"
            color="#28a745"
            subtitle="Unique users"
          />
          <StatsCard
            title="ACTIVITY TYPES"
            value={loading ? "..." : activityTypesCount.toString()}
            icon="🏷️"
            color="#ffc107"
            subtitle="Event categories"
          />
          <StatsCard
            title="TODAY'S ACTIVITY"
            value={loading ? "..." : recentCount.toString()}
            icon="🕒"
            color="#6f42c1"
            subtitle="Latest activities"
          />
        </div>

        {/* Charts */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem"
          }}>

            {/* Activity Trends */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
              border: "1px solid #e1e5e9"
            }}>
              <h3 style={{
                margin: "0 0 1rem 0",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1a202c",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                📈 Activity Trends
                <span style={{
                  fontSize: "0.875rem",
                  color: "#718096",
                  fontWeight: "normal"
                }}>
                  Last 14 days
                </span>
              </h3>
              <ActivityTrendsChart
                labels={trends.labels}
                data={trends.data}
                loading={loading}
              />
            </div>

            {/* Activity Distribution */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
              border: "1px solid #e1e5e9"
            }}>
              <h3 style={{
                margin: "0 0 1rem 0",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1a202c",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                🥧 Event Distribution
                <span style={{
                  fontSize: "0.875rem",
                  color: "#718096",
                  fontWeight: "normal"
                }}>
                  By type
                </span>
              </h3>
              <ActivityTypeChart
                labels={activityTypes.labels}
                data={activityTypes.data}
                loading={loading}
              />
            </div>
          </div>

          {/* Daily Activity Timeline */}
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
            border: "1px solid #e1e5e9"
          }}>
            <h3 style={{
              margin: "0 0 1rem 0",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1a202c",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              📊 Daily Activity Timeline
              <span style={{
                fontSize: "0.875rem",
                color: "#718096",
                fontWeight: "normal"
              }}>
                Activity over time
              </span>
            </h3>
            <DailyActivityChart
              labels={daily.labels}
              data={daily.data}
              loading={loading}
            />
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
          border: "1px solid #e1e5e9"
        }}>
          <RecentActivityCard activities={recent} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
