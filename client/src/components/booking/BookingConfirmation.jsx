import React, { useState } from "react";
import { toast } from "react-toastify";

export default function BookingConfirmation({ service, slot, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("✅ Booking confirmed!");
      onConfirm?.();
      setConfirmed(true);
    } catch (err) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Confirm Booking</h3>
      <p>
        <strong>Service:</strong> {service || "None"}
      </p>
      <p>
        <strong>Time:</strong> {slot || "None"}
      </p>

      <button
        onClick={handleConfirm}
        disabled={!service || !slot || confirmed || loading}
        style={{
          marginTop: "1rem",
          background: confirmed ? "#16a34a" : "#4f46e5",
          color: "#fff",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: confirmed ? "not-allowed" : "pointer",
          opacity: !service || !slot ? 0.5 : 1,
        }}
      >
        {loading
          ? "Confirming..."
          : confirmed
          ? "✅ Confirmed"
          : "Confirm Booking"}
      </button>
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
