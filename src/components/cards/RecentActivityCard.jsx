// src/components/cards/RecentActivityCard.jsx
import React from "react";

const RecentActivityCard = ({ activities, loading }) => {
  if (loading)
    return <div style={{ color: "#9CA3AF" }}>Loading recent activities...</div>;

  if (!activities || activities.length === 0)
    return <div style={{ color: "#9CA3AF" }}>No recent activities found.</div>;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)", // glass card
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.12)",
        padding: "1.8rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
    >
      {/* HEADER */}
      <h3
        style={{
          marginBottom: "1.4rem",
          color: "#E5E7EB",
          fontSize: "1.35rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        📋 Recent Activities

        <span
          style={{
            fontSize: "0.75rem",
            opacity: "0.8",
            fontWeight: "500",
            background: "rgba(255,255,255,0.12)",
            padding: "0.25rem 0.8rem",
            borderRadius: "20px",
            color: "#E5E7EB",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          Latest {activities?.length || 0}
        </span>
      </h3>

      {/* LIST */}
      <div style={{ display: "grid", gap: "0.9rem" }}>
        {activities.map((act, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(24, 26, 31, 0.6)", // glassy dark card
              borderRadius: "10px",
              padding: "1rem",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.30)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
              e.currentTarget.style.background = "rgba(24, 26, 31, 0.75)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.30)";
              e.currentTarget.style.background = "rgba(24, 26, 31, 0.6)";
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 120px 140px 1fr",
                alignItems: "center",
                gap: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {/* USER */}
              <div
                style={{
                  fontWeight: "600",
                  color: "#E5E7EB",
                  whiteSpace: "nowrap",
                }}
              >
                👤 {act.user_id || "Unknown User"}
              </div>

              {/* EVENT TYPE BADGE */}
              <div
                style={{
                  padding: "0.25rem 0.7rem",
                  background: "rgba(123,97,255,0.25)",
                  border: "1px solid rgba(123,97,255,0.45)",
                  color: "#C4B5FD",
                  borderRadius: "14px",
                  fontSize: "0.75rem",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                }}
              >
                {act.event_type || "Unknown"}
              </div>

              {/* TIMESTAMP */}
              <div
                style={{
                  color: "#9CA3AF",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                {act.created_at
                  ? new Date(act.created_at).toLocaleString()
                  : "N/A"}
              </div>

              {/* DETAILS */}
              <div
                style={{
                  fontSize: "0.83rem",
                  color: "#A1A1AA",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {act.payload
                  ? act.page
                    ? `${act.page} • ${JSON.stringify(act.payload)}`
                    : JSON.stringify(act.payload)
                  : act.page || "No details"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
