import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/pages.css";

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ status: '', notes: '' });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditData({ status: appointment.status || '', notes: appointment.notes || '' });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/appointments/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? response.data : a))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ status: '', notes: '' });
  };

  const statusOptions = ["pending", "confirmed", "cancelled", "completed"];

  return (
    <div className="appointment-container">
      <h2>All Appointments</h2>
      <div className="appointment-list">
        {appointments.map((a) => (
          <div className="appointment-card" key={a.id}>
            <h4>
              User: {a.user?.username || `User ID ${a.user_id}`}
            </h4>
            <p><strong>Service:</strong> {a.service_name || a.service_id}</p>
            <p><strong>Vet:</strong> {a.vet_name}</p>
            <p><strong>Scheduled:</strong> {new Date(a.scheduled_time).toLocaleString()}</p>

            {editingId === a.id ? (
              <>
                <label>
                  Status:
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Notes:
                  <input
                    type="text"
                    value={editData.notes}
                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  />
                </label>
                <button onClick={() => handleUpdate(a.id)}> Save</button>
                <button onClick={handleCancel}> Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Status:</strong> {a.status}</p>
                {a.notes && <p><strong>Notes:</strong> {a.notes}</p>}
                <button onClick={() => handleEdit(a)}> Edit</button>
                <button onClick={() => handleDelete(a.id)}> Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;
