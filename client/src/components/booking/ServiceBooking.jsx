import React from "react";

const services = [
  { id: 1, name: "Haircut", price: "$20" },
  { id: 2, name: "Massage", price: "$50" },
  { id: 3, name: "Consultation", price: "$30" },
];

export default function ServiceBooking({ onSelect, selected }) {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Choose a Service</h3>
      {services.map((service) => (
        <div
          key={service.id}
          onClick={() => onSelect(service)}
          style={{
            ...itemStyle,
            background:
              selected?.id === service.id ? "#4f46e5" : "#f5f5f5",
            color: selected?.id === service.id ? "#fff" : "#333",
          }}
        >
          {service.name} - {service.price}
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
