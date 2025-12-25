// src/components/common/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.4rem",
        marginTop: "1rem",
      }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          padding: "4px 10px",
          fontSize: "0.75rem",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#E5E7EB",
          borderRadius: "6px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          opacity: currentPage === 1 ? 0.35 : 1,
          transition: "0.2s ease",
        }}
      >
        ← Prev
      </button>

      <div
        style={{
          padding: "4px 12px",
          fontSize: "0.75rem",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#C4C7CC",
        }}
      >
        Page <b style={{ color: "white" }}>{currentPage}</b> / {totalPages}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          padding: "4px 10px",
          fontSize: "0.75rem",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#E5E7EB",
          borderRadius: "6px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          opacity: currentPage === totalPages ? 0.35 : 1,
          transition: "0.2s ease",
        }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
