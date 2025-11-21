// src/components/cards/RecentActivityCard.jsx
import React from "react";

const RecentActivityCard = ({ activities, loading }) => {
  if (loading) return <div>Loading recent activities...</div>;
  if (!activities || activities.length === 0)
    return <div>No recent activities found.</div>;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <div style={{
        padding: "2rem 2rem 1.5rem 2rem"
      }}>
        <h3 style={{
          marginBottom: "1.5rem",
          color: "#2c3e50",
          fontSize: "1.8rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          📋 Recent Activities
          <span style={{
            fontSize: "0.8rem",
            opacity: "0.6",
            fontWeight: "normal",
            background: "#f1f2f6",
            padding: "0.2rem 0.8rem",
            borderRadius: "20px",
            color: "#666"
          }}>
            Latest {activities?.length || 0}
          </span>
        </h3>

        <div style={{
          display: "grid",
          gap: "1rem"
        }}>
          {activities.map((act, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "1.2rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                border: "1px solid #f0f0f0",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                alignItems: "center",
                gap: "1.5rem",
                fontSize: "0.95rem"
              }}>
                {/* User */}
                <div style={{ fontWeight: "600", color: "#2c3e50" }}>
                  👤 {act.user_id || "Unknown User"}
                </div>

                {/* Event Type */}
                <div style={{
                  padding: "0.3rem 0.8rem",
                  background: "#e3f2fd",
                  color: "#1976d2",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  textAlign: "center"
                }}>
                  {act.event_type || "Unknown"}
                </div>

                {/* Timestamp */}
                <div style={{
                  color: "#666",
                  fontSize: "0.9rem"
                }}>
                  {act.created_at ? new Date(act.created_at).toLocaleString() : "N/A"}
                </div>

                {/* Details */}
                <div style={{
                  fontSize: "0.85rem",
                  color: "#888"
                }}>
                  {act.payload ? (
                    act.page ? `${act.page} • ${JSON.stringify(act.payload)}` : JSON.stringify(act.payload)
                  ) : act.page || "No details"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
