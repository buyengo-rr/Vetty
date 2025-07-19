import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/vettylogo.png" alt="Vetty Logo" />
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Vetty. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
