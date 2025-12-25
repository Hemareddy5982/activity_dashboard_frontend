import React, { useState } from "react";

function getColor(count) {
  if (count === 0) return "rgba(255,255,255,0.05)";
  if (count < 3) return "rgba(123, 97, 255, 0.25)";
  if (count < 7) return "rgba(123, 97, 255, 0.45)";
  return "rgba(123, 97, 255, 0.75)";
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ActivityCalendarHeatmap = ({ monthData, year, month }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  // Build look-up map
  const dataMap = {};
  (monthData || []).forEach((i) => {
    dataMap[i.date] = i.count;
  });

  // Build full month calendar
  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];

  // Add empty placeholders before month starts
  for (let i = 0; i < firstWeekday; i++) {
    calendarCells.push(null);
  }

  // Add the actual days of the month
  for (let day = 1; day <= lastDay; day++) {
    const iso = new Date(year, month, day).toISOString().slice(0, 10);
    calendarCells.push({
      date: iso,
      count: dataMap[iso] || 0,
    });
  }

  return (
    <div>
      {/* Week Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "0.5rem",
          textAlign: "center",
          color: "#9CA3AF",
          fontSize: "0.75rem",
        }}
      >
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "6px",
        }}
      >
        {calendarCells.map((cell, i) => {
          if (!cell) {
            return <div key={i} style={{ height: "50px", opacity: 0 }}></div>;
          }

          const d = Number(cell.date.split("-")[2]);

          return (
            <div
              key={i}
              onClick={() => setSelectedDay(cell)}
              style={{
                height: "50px",
                background: getColor(cell.count),
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
                fontSize: "0.75rem",
              }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedDay && (
        <div
          onClick={() => setSelectedDay(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3000,
          }}
        >
          <div
            style={{
              background: "#181A1F",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid #2A2C31",
              width: "280px",
            }}
          >
            <h3 style={{ marginTop: 0, color: "white" }}>
              📅 {selectedDay.date}
            </h3>
            <p style={{ color: "#A1A1AA" }}>
              <strong>{selectedDay.count}</strong> activities
            </p>

            <button
              onClick={() => setSelectedDay(null)}
              style={{
                width: "100%",
                marginTop: "1rem",
                padding: "0.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCalendarHeatmap;
