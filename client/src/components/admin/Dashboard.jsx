import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClipboardList, FaCalendarCheck, FaCogs, FaClock } from "react-icons/fa";
import api, { setAuthToken } from "../../api";
import "../../styles/components.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token); 

    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Failed to load admin dashboard", err.response?.data || err.message);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  const { users, orders, appointments, services, recent_logs } = dashboardData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <FaCogs size={40} color="#1e3a8a" />
        <h2>{getGreeting()}, Admin 👨‍💼</h2>
      </div>

      <div className="summary-cards">
        <div className="card highlight">
          <FaUsers size={24} />
          <p>Total Users</p>
          <h3>{users}</h3>
        </div>
        <div className="card highlight">
          <FaClipboardList size={24} />
          <p>Total Orders</p>
          <h3>{orders}</h3>
        </div>
        <div className="card highlight">
          <FaCalendarCheck size={24} />
          <p>Appointments</p>
          <h3>{appointments}</h3>
        </div>
        <div className="card highlight">
          <FaClipboardList size={24} />
          <p>Available Services</p>
          <h3>{services}</h3>
        </div>
      </div>

      <div className="cta-links">
        <Link to="/admin/products" className="btn">📦 Manage Products</Link>
        <Link to="/admin/services" className="btn">🛠 Manage Services</Link>
        <Link to="/admin/appointments" className="btn">📩 Appointment Requests</Link>
        <Link to="/admin/orders" className="btn">📑 View Orders</Link>
        <Link to="/admin/users" className="btn">👥 User Management</Link>
      </div>

      <div className="recent-activity">
        <h3><FaClock style={{ marginRight: "8px" }} />Recent Activity</h3>
        <ul className="log-list">
          {recent_logs.map((log, index) => (
            <li key={index}>
              <span className="log-time">{log.time}</span>
              <span className="log-message">{log.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
