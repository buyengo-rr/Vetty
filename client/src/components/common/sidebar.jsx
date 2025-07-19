import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import "../../styles/components.css";

export default function Sidebar({ role = "user" }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const userLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/products", label: "Products" },
    { to: "/services", label: "Services" },
    { to: "/cart", label: "Cart" },
    { to: "/appointment", label: "Appointment" },
    { to: "/profile", label: "Profile" },
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
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <h2 className="sidebar-title">{role === "admin" ? "Admin Panel" : "User Panel"}</h2>
        <ul className="sidebar-links">
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
