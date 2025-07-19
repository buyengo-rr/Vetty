
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
}
<section className="hero-section">
  <div className="hero-background">
    <div className="hero-overlay"></div>
    <div className="hero-particles"></div>
  </div>
  <div className="hero-content">
    <div className="hero-badge">
      <span>✨ Trusted by 10,000+ Pet Owners</span>
    </div>
    <h1 className="hero-title">
      Premium Pet Care
      <span className="gradient-text">That Feels Like Family</span>
    </h1>
    <p className="hero-subtitle">
      Experience compassionate veterinary care with state-of-the-art facilities 
      and certified professionals who treat your pets like family
    </p>
    <div className="hero-buttons">
      <Link to="/services" className="primary-button">
        <span>Book a Service</span>
        <div className="button-glow"></div>
      </Link>
      <Link to="/products" className="secondary-button">
        <span>Shop Products</span>
        <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-number">24/7</div>
        <div className="stat-label">Emergency Care</div>
      </div>
      <div className="stat">
        <div className="stat-number">15+</div>
        <div className="stat-label">Years Experience</div>
      </div>
      <div className="stat">
        <div className="stat-number">98%</div>
        <div className="stat-label">Happy Clients</div>
      </div>
    </div>
  </div>
</section>