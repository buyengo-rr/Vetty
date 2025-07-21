import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../../styles/components.css";

export default function Sidebar({ role = "user" }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  // Auto-close on mobile when route changes
  useEffect(() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const userLinks = [
    { to: "/user/dashboard", label: "Dashboard" },
    { to: "/user/products", label: "Products" },
    { to: "/user/services", label: "Services" },
    { to: "/user/cart", label: "Cart" },
    { to: "/user/appointment", label: "Appointment" },
    { to: "/user/profile", label: "Profile" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/services", label: "Services" },
    { to: "/admin/appointments", label: "Appointments" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/users", label: "Users" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <h2 className="sidebar-title">{role === "admin" ? "Admin Panel" : "User Panel"}</h2>
        <ul className="sidebar-links">
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} className={location.pathname === link.to ? "active" : ""}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional overlay on mobile */}
      {isOpen && window.innerWidth <= 768 && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
