import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClipboardList, FaCalendarCheck, FaCogs, FaClock } from "react-icons/fa";
import "../../styles/components.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

const recentLogs = [
  { time: "Just now", message: "New user registered: Jane Doe" },
  { time: "5 mins ago", message: "Order #1021 placed by John Mwangi" },
  { time: "10 mins ago", message: "Service 'Vaccination' updated" },
  { time: "30 mins ago", message: "Appointment request approved" },
  { time: "1 hr ago", message: "User Peter deleted account" },
];

export default function AdminDashboard() {
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
          <h3>145</h3>
        </div>
        <div className="card highlight">
          <FaClipboardList size={24} />
          <p>Total Orders</p>
          <h3>72</h3>
        </div>
        <div className="card highlight">
          <FaCalendarCheck size={24} />
          <p>Appointments</p>
          <h3>25</h3>
        </div>
        <div className="card highlight">
          <FaClipboardList size={24} />
          <p>Available Services</p>
          <h3>12</h3>
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
          {recentLogs.map((log, index) => (
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
