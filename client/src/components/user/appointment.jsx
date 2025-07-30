import React, { useEffect, useState } from "react";
import "../../styles/pages.css"

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5000/appointments/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setAppointments)
      .catch((err) => console.error("Failed to fetch appointments:", err));
  }, []);

  return (
    <div className="user-appointments">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        appointments.map((app) => (
          <div key={app.id} className="appointment-card">
            <h3>{app.service_name}</h3>
            <p>Time: {new Date(app.scheduled_time).toLocaleString()}</p>
            <p>Vet: {app.vet_name}</p>
            <p>Status: {app.status}</p>
            {app.notes && <p>Notes: {app.notes}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default UserAppointments;
