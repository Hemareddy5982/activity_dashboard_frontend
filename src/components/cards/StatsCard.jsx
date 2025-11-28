// src/components/cards/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon, color, subtitle }) => (
  <div
    style={{
      background: "#181A1F",
      borderRadius: "10px",
      padding: "0.8rem 1rem",
      width: "180px",               // 🔥 Smaller width
      minHeight: "85px",            // 🔥 Smaller height
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      border: "1px solid #2A2C31",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      flexShrink: 0,                // prevents layout stretching
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";
    }}
  >
    {/* SMALL ICON */}
    <div
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "8px",
        background: `${color}25`,
        border: `1px solid ${color}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",          // 🔥 Even smaller icon
      }}
    >
      {icon}
    </div>

    {/* TEXT */}
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: "0.6rem",      // 🔥 Reduced title
          textTransform: "uppercase",
          fontWeight: 600,
          letterSpacing: "0.4px",
          color: "#9CA3AF",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "1.2rem",       // 🔥 Slightly smaller
          fontWeight: 700,
          color: "#E5E7EB",
          marginTop: "2px",
          marginBottom: "1px",
        }}
      >
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: "0.58rem", color: "#6B7280" }}>
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

export default StatsCard;
