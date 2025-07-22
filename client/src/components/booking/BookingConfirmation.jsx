import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function BookingConfirmation({ service, slot, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setConfirmed(false); 
  }, [service, slot]);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Booking confirmed!");
      onConfirm?.(); 
      setConfirmed(true);
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginTop: "20px",
    maxWidth: "400px",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    marginBottom: "12px",
    color: "#1e293b",
    fontWeight: "600",
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Confirm Booking</h3>
      <p>
        <strong>Service:</strong> {service?.name || "None"}
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
          cursor: !service || !slot ? "not-allowed" : "pointer",
          opacity: !service || !slot ? 0.5 : 1,
        }}
      >
        {loading
          ? "Confirming..."
          : confirmed
          ? "Confirmed"
          : "Confirm Booking"}
      </button>
    </div>
  );
}
