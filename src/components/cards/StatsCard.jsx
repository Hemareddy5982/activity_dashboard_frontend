// src/components/cards/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon, color, subtitle }) => (
  <div
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      padding: "1.8rem",
      display: "flex",
      alignItems: "center",
      gap: "1.2rem",
      minWidth: "250px",
      borderLeft: `6px solid ${color || "#007bff"}`,
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)"
      }
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
    }}
  >
    <div style={{
      background: `linear-gradient(135deg, ${color}30, ${color}10)`,
      borderRadius: "12px",
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{icon}</span>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.3rem" }}>{title}</div>
      <div style={{
        fontWeight: "700",
        fontSize: "2.2rem",
        color: "#2c3e50",
        lineHeight: 1,
        marginBottom: "0.3rem"
      }}>{value}</div>
      {subtitle && (
        <div style={{
          fontSize: "0.8rem",
          color: "#888",
          opacity: 0.8
        }}>{subtitle}</div>
      )}
    </div>

    {/* Decorative gradient overlay */}
    <div style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: "40px",
      height: "40px",
      background: `linear-gradient(135deg, ${color}20, transparent)`,
      borderRadius: "0 12px 0 0"
    }} />
  </div>
);

export default StatsCard;
