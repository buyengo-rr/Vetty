import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaBox,
  FaCalendarAlt,
  FaConciergeBell,
  FaClock,
} from "react-icons/fa";
import "../../styles/components.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function UserDashboard() {
  const activities = [
    { time: "10:15 AM", activity: "Booked vet appointment for Simba 🐶" },
    { time: "9:30 AM", activity: "Added dog food to cart 🛒" },
    { time: "Yesterday", activity: "Ordered flea treatment kit 🐾" },
  ];

  const popularProducts = [
    {
      id: 1,
      name: "Premium Dog Food",
      price: "KSh 2,000",
      image: "/products/dog-food.jpg",
    },
    {
      id: 2,
      name: "Flea & Tick Collar",
      price: "KSh 1,200",
      image: "/products/flea-collar.jpg",
    },
    {
      id: 3,
      name: "Pet Shampoo",
      price: "KSh 950",
      image: "/products/shampoo.jpg",
    },
  ];

  return (
    <div className="dashboard-container">
      <h2>{getGreeting()}, Welcome Back 👋</h2>

      {/* Summary cards */}
      <div className="summary-cards">
        <div className="card">
          <FaCalendarAlt className="card-icon" />
          <div>
            <p className="card-title">Appointments</p>
            <p className="card-value">2 Upcoming</p>
          </div>
        </div>
        <div className="card">
          <FaShoppingCart className="card-icon" />
          <div>
            <p className="card-title">Cart Items</p>
            <p className="card-value">4</p>
          </div>
        </div>
        <div className="card">
          <FaBox className="card-icon" />
          <div>
            <p className="card-title">Orders</p>
            <p className="card-value">3</p>
          </div>
        </div>
        <div className="card">
          <FaConciergeBell className="card-icon" />
          <div>
            <p className="card-title">Booked Services</p>
            <p className="card-value">2</p>
          </div>
        </div>
      </div>

      {/* CTA Links */}
      <div className="cta-links">
        <Link to="/user/products" className="btn">🛍️ View Products</Link>
        <Link to="/user/services" className="btn">📋 Book Services</Link>
        <Link to="/user/cart" className="btn">🛒 Go to Cart</Link>
        <Link to="/appointments" className="btn">📅 My Appointments</Link>
        <Link to="/user/profile" className="btn">👤 Edit Profile</Link>
      </div>

      {/* Recent Activities */}
      <div className="recent-activity">
        <h3><FaClock className="section-icon" /> Recent Activity</h3>
        <ul>
          {activities.map((log, index) => (
            <li key={index}>
              <span className="activity-time">{log.time}</span> - {log.activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Products */}
      <div className="popular-products">
        <h3>🔥 Popular Products</h3>
        <div className="product-grid">
          {popularProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p className="price">{product.price}</p>
              <Link to={`/products/${product.id}`} className="btn small">View</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
