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
  </div>
</section>