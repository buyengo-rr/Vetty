import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-container">
      <main>
        {/* Base structure will be built upon */}
      </main>
    </div>
  );
}
{/* Hero Section */}
<section className="about-hero-section">
  <div className="about-hero-background">
    <div className="about-hero-overlay"></div>
    <div className="floating-elements"></div>
  </div>
  <div className="about-hero-content">
    <div className="about-badge">
      <span>🏆 Award-Winning Veterinary Care</span>
    </div>
    <h1 className="about-hero-title">
      Our Story of 
      <span className="gradient-text">Compassionate Care</span>
    </h1>
    <p className="about-hero-subtitle">
      For over 15 years, Vetty has been dedicated to providing exceptional veterinary care 
      with a personal touch. Founded by passionate animal lovers, we've grown into a 
      trusted community of pet care professionals.
    </p>
  </div>
</section>
{/* Mission Section */}
<section className="mission-section">
  <div className="section-container">
    <div className="mission-grid">
      <div className="mission-content">
        <div className="mission-icon">🎯</div>
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          To provide exceptional veterinary care that strengthens the bond between pets and their families. 
          We believe every animal deserves compassionate, professional treatment that enhances their quality of life.
        </p>
        <div className="mission-highlights">
          <div className="highlight-item">
            <div className="highlight-icon">💝</div>
            <span>Compassionate Care</span>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">🔬</div>
            <span>Advanced Technology</span>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">👨‍👩‍👧‍👦</div>
            <span>Family-Centered Approach</span>
          </div>
        </div>
      </div>
      <div className="mission-image">
        <div className="image-placeholder mission-img">
          <div className="image-overlay"></div>
          <div className="image-content">🏥 Modern Facility</div>
        </div>
      </div>
    </div>
  </div>
</section>