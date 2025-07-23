import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-container">
      <main>
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

        {/* Team Section */}
        <section className="team-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Meet Our Expert Team</h2>
              <p className="section-subtitle">
                Dedicated professionals who treat your pets like family
              </p>
            </div>
            <div className="team-grid">
              <div className="team-card lead-vet">
                <div className="team-image">
                  <div className="team-avatar">👩‍⚕</div>
                  <div className="team-overlay"></div>
                  <div className="team-badge">Lead Veterinarian</div>
                </div>
                <div className="team-info">
                  <h3>Dr. Sarah Mitchell</h3>
                  <p className="team-role">DVM, Chief Veterinarian</p>
                  <p className="team-description">
                    15+ years of experience in small animal medicine with specialization in emergency care and surgery.
                  </p>
                  <div className="team-specialties">
                    <span className="specialty">Emergency Care</span>
                    <span className="specialty">Surgery</span>
                    <span className="specialty">Internal Medicine</span>
                  </div>
                </div>
              </div>
              
              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👨‍⚕</div>
                  <div className="team-overlay"></div>
                  <div className="team-badge">Senior Veterinarian</div>
                </div>
                <div className="team-info">
                  <h3>Dr. James Wilson</h3>
                  <p className="team-role">DVM, Exotic Animal Specialist</p>
                  <p className="team-description">
                    Expert in exotic pets, avian medicine, and advanced diagnostic procedures with 12 years experience.
                  </p>
                  <div className="team-specialties">
                    <span className="specialty">Exotic Pets</span>
                    <span className="specialty">Avian Care</span>
                    <span className="specialty">Diagnostics</span>
                  </div>
                </div>
              </div>

              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👩‍💼</div>
                  <div className="team-overlay"></div>
                  <div className="team-badge">Practice Manager</div>
                </div>
                <div className="team-info">
                  <h3>Lisa Rodriguez</h3>
                  <p className="team-role">Certified Veterinary Practice Manager</p>
                  <p className="team-description">
                    Ensures smooth operations and exceptional client experience with 10 years in veterinary management.
                  </p>
                  <div className="team-specialties">
                    <span className="specialty">Client Relations</span>
                    <span className="specialty">Operations</span>
                    <span className="specialty">Team Leadership</span>
                  </div>
                </div>
              </div>

              <div className="team-card">
                <div className="team-image">
                  <div className="team-avatar">👨‍🔬</div>
                  <div className="team-overlay"></div>
                  <div className="team-badge">Veterinary Technician</div>
                </div>
                <div className="team-info">
                  <h3>Marcus Thompson</h3>
                  <p className="team-role">Licensed Veterinary Technician</p>
                  <p className="team-description">
                    Skilled in laboratory procedures, anesthesia monitoring, and patient care with 8 years experience.
                  </p>
                  <div className="team-specialties">
                    <span className="specialty">Lab Work</span>
                    <span className="specialty">Anesthesia</span>
                    <span className="specialty">Patient Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">
                The principles that guide everything we do
              </p>
            </div>
            <div className="values-grid">
              <div className="value-card compassion">
                <div className="value-icon-wrapper">
                  <div className="value-icon">❤</div>
                  <div className="value-glow"></div>
                </div>
                <h3>Compassion First</h3>
                <p>Every decision we make is guided by empathy and genuine care for both pets and their families.</p>
              </div>
              <div className="value-card excellence">
                <div className="value-icon-wrapper">
                  <div className="value-icon">🏆</div>
                  <div className="value-glow"></div>
                </div>
                <h3>Clinical Excellence</h3>
                <p>We maintain the highest standards of veterinary medicine through continuous education and modern equipment.</p>
              </div>
              <div className="value-card integrity">
                <div className="value-icon-wrapper">
                  <div className="value-icon">🤝</div>
                  <div className="value-glow"></div>
                </div>
                <h3>Trust & Integrity</h3>
                <p>Honest communication and transparent practices build lasting relationships with our clients.</p>
              </div>
              <div className="value-card innovation">
                <div className="value-icon-wrapper">
                  <div className="value-icon">🔬</div>
                  <div className="value-glow"></div>
                </div>
                <h3>Innovation</h3>
                <p>We embrace new technologies and techniques to provide the most effective treatments available.</p>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="history-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Journey</h2>
              <p className="section-subtitle">
                Milestones in our commitment to exceptional pet care
              </p>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">2009</div>
                </div>
                <div className="timeline-content">
                  <h3>Vetty Founded</h3>
                  <p>Dr. Sarah Mitchell opened our first clinic with a vision to provide family-centered veterinary care.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">2015</div>
                </div>
                <div className="timeline-content">
                  <h3>Facility Expansion</h3>
                  <p>Added advanced surgical suite and 24/7 emergency services to better serve our growing community.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">2020</div>
                </div>
                <div className="timeline-content">
                  <h3>Digital Innovation</h3>
                  <p>Launched online booking, telemedicine services, and our e-commerce platform for pet supplies.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">2024</div>
                </div>
                <div className="timeline-content">
                  <h3>Award Recognition</h3>
                  <p>Received "Best Veterinary Practice" award and expanded our team to serve 10,000+ happy families.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-background">
            <div className="stats-overlay"></div>
            <div className="stats-pattern"></div>
          </div>
          <div className="section-container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏥</div>
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Happy Pets Served</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-number">24/7</div>
                <div className="stat-label">Emergency Availability</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👨‍⚕</div>
                <div className="stat-number">15+</div>
                <div className="stat-label">Expert Staff Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-number">15</div>
                <div className="stat-label">Years of Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta-section">
          <div className="about-cta-content">
            <h2 className="about-cta-title">
              Ready to Experience 
              <span className="gradient-text">The Vetty Difference?</span>
            </h2>
            <p className="about-cta-subtitle">
              Join our family of satisfied pet owners and give your beloved companion the care they deserve.
            </p>
            <div className="about-cta-buttons">
              <Link to="/register" className="primary-button large">
                <span>Get Started Today</span>
                <div className="button-glow"></div>
              </Link>
              <Link to="/contact" className="secondary-button">
                <span>Visit Our Clinic</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}