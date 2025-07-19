import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>Premium Pet Care Services</h1>
            <p>Your pet deserves the best care from our certified veterinarians</p>
            <div className="hero-buttons">
              <Link to="/services" className="primary-button">Book a Service</Link>
              <Link to="/products" className="secondary-button">Shop Products</Link>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose Vetty?</h2>
            <p>We provide exceptional care for your furry friends</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>24/7 Emergency Care</h3>
              <p>Round-the-clock veterinary services for urgent pet needs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Premium Pet Products</h3>
              <p>High-quality food, toys, and accessories for your pets.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👩‍⚕️</div>
              <h3>Expert Veterinarians</h3>
              <p>Certified professionals with years of experience.</p>
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive care for all your pet's needs</p>
          </div>
          <div className="services-grid">
            <div className="service-card" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/dog-checkup.jpg')" }}>
              <h3>Regular Checkups</h3>
              <p>Keep your pet healthy with routine examinations.</p>
              <Link to="/services/checkups">Learn More →</Link>
            </div>
            <div className="service-card" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/pet-grooming.jpg')" }}>
              <h3>Grooming</h3>
              <p>Professional grooming services for all breeds.</p>
              <Link to="/services/grooming">Learn More →</Link>
            </div>
            <div className="service-card" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/pet-surgery.jpg')" }}>
              <h3>Surgical Procedures</h3>
              <p>Safe and professional surgical care.</p>
              <Link to="/services/surgery">Learn More →</Link>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-header">
            <h2>Happy Pet Owners</h2>
            <p>What our clients say about us</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The team at Vetty saved my dog's life during an emergency. Forever grateful!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩</div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Dog Owner</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Best veterinary care in town. My cats actually enjoy their visits!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨</div>
                <div className="author-info">
                  <h4>Michael Chen</h4>
                  <p>Cat Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to give your pet the best care?</h2>
            <Link to="/register" className="primary-button">Create an Account</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}