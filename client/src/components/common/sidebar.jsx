import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaConciergeBell,
  FaShoppingCart,
  FaCalendarAlt,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [role, setRole] = useState("user");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth <= 768) setIsOpen(false);
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.success("Logged out successfully!", {
        position: "center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2000); 
    }
  };

  const userLinks = [
    { to: "/user/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/user/products", label: "Products", icon: <FaBoxOpen /> },
    { to: "/user/services", label: "Services", icon: <FaConciergeBell /> },
    { to: "/user/cart", label: "Cart", icon: <FaShoppingCart /> },
    { to: "/user/appointment", label: "Appointment", icon: <FaCalendarAlt /> },
    { to: "/user/profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
    { to: "/admin/services", label: "Services", icon: <FaConciergeBell /> },
    { to: "/admin/appointments", label: "Appointments", icon: <FaCalendarAlt /> },
    { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/profile", label: "Profile", icon: <FaUserCircle /> },
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
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`sidebar-link ${location.pathname === link.to ? "active" : ""}`}
              >
                <span className="sidebar-icon">{link.icon}</span>
                <span className="sidebar-label">{link.label}</span>
              </Link>
            </li>
          ))}

          <li>
            <button className="sidebar-link logout-btn" onClick={handleLogout}>
              <span className="sidebar-icon"><FaSignOutAlt /></span>
              <span className="sidebar-label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {isOpen && window.innerWidth <= 768 && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
