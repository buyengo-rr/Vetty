import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppointmentSchedule from "./AppointmentSchedule";
import ServiceBooking from "./ServiceBooking";
import BookingConfirmation from "./BookingConfirmation";

export default function AppointmentPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);

 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(saved);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  
const location = useLocation();


useEffect(() => {
  if (location.state?.selectedService) {
    setSelectedService(location.state.selectedService);
  }
}, [location.state]);

  const handleConfirm = () => {
    const newAppointment = {
      service: selectedService.name,
      slot: selectedSlot,
      timestamp: new Date().toLocaleString(),
    };

    setAppointments((prev) => [...prev, newAppointment]);
    setSelectedService(null);  
    setSelectedSlot(null);
  };

  const handleCancel = (index) => {
  const updated = [...appointments];
  updated.splice(index, 1);
  setAppointments(updated);
};


  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Book an Appointment</h2>

      <ServiceBooking
        selected={selectedService}
        onSelect={setSelectedService}
      />

      <div style={{ marginTop: "1rem" }}>
        <AppointmentSchedule selected={selectedSlot} onSelect={setSelectedSlot} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <BookingConfirmation
          service={selectedService?.name}
          slot={selectedSlot}
          onConfirm={handleConfirm}
        />
      </div>

<ul style={appointmentListStyle}>
  {appointments.map((appt, index) => (
    <li key={index} style={appointmentItemStyle}>
      <strong>{appt.service}</strong> on <em>{appt.slot}</em>
      <br />
      <small>Booked at: {appt.timestamp}</small>
      <br />
      <button
        onClick={() => handleCancel(index)}
        style={cancelButtonStyle}
      >
         Cancel
      </button>
      <button
        onClick={() => handleEdit(index)}
        style={editButtonStyle}
      >
         Edit
      </button>
    </li>
  ))}
</ul>

    </div>
  );
}

const appointmentListStyle = {
  listStyle: "none",
  padding: 0,
  marginTop: "1rem",
};

const appointmentItemStyle = {
  padding: "0.75rem",
  marginBottom: "0.5rem",
  border: "1px solid #ddd",
  borderRadius: "6px",
  background: "#f9f9f9",
};

const cancelButtonStyle = {
  marginTop: "0.5rem",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  cursor: "pointer",
};


const editButtonStyle = {
  marginLeft: "0.5rem",
  background: "#facc15",
  color: "#000",
  border: "none",
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  cursor: "pointer",
};

