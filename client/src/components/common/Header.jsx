import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
            <img src="./vettylogo.png" alt="Vettylogo" />
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        {/* Nav Links */}
        <div className={isOpen ? "nav-links open" : "nav-links"}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            ABOUT
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
           CONTACT
          </Link>

          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
