import React from "react";

const slots = [
  "Monday 10:00 AM",
  "Monday 2:00 PM",
  "Tuesday 11:00 AM",
  "Wednesday 1:00 PM",
];

export default function AppointmentSchedule({ onSelect, selected }) {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Choose a Time Slot</h3>
      {slots.map((slot) => (
        <div
          key={slot}
          onClick={() => onSelect(slot)}
          style={{
            ...itemStyle,
            background: selected === slot ? "#4f46e5" : "#f5f5f5",
            color: selected === slot ? "#fff" : "#333",
          }}
        >
          {slot}
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  padding: "1rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#fafafa",
};

const titleStyle = {
  marginBottom: "0.5rem",
  fontWeight: "bold",
  fontSize: "1rem",
};

const itemStyle = {
  padding: "0.5rem",
  marginBottom: "0.25rem",
  cursor: "pointer",
  borderRadius: "4px",
};
