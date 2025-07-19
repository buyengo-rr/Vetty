import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="home-container">

      <main>
        {/* Hero Section with Parallax Effect */}
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

        {/* Features Section */}
        <section className="features-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Why Choose Vetty?</h2>
              <p className="section-subtitle">
                We provide exceptional care with cutting-edge technology and heartfelt compassion
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card emergency">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🏥</div>
                  <div className="icon-glow"></div>
                </div>
                <h3>24/7 Emergency Care</h3>
                <p>Round-the-clock veterinary services with immediate response for urgent pet needs and critical situations.</p>
                <div className="feature-highlight">Always Available</div>
              </div>
              <div className="feature-card products">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🛒</div>
                  <div className="icon-glow"></div>
                </div>
                <h3>Premium Pet Products</h3>
                <p>Carefully curated high-quality food, toys, and accessories from trusted brands worldwide.</p>
                <div className="feature-highlight">Quality Guaranteed</div>
              </div>
              <div className="feature-card experts">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">👩‍⚕</div>
                  <div className="icon-glow"></div>
                </div>
                <h3>Expert Veterinarians</h3>
                <p>Board-certified professionals with specialized training and decades of combined experience.</p>
                <div className="feature-highlight">Certified Excellence</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Premium Services</h2>
              <p className="section-subtitle">
                Comprehensive care solutions tailored to your pet's unique needs
              </p>
            </div>
            <div className="services-grid">
              <div className="service-card checkups">
                <div className="service-image">
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content">
                  <div className="service-badge">Most Popular</div>
                  <h3>Regular Checkups</h3>
                  <p>Comprehensive health examinations with preventive care to keep your pet thriving.</p>
                  <Link to="/services/checkups" className="service-link">
                    <span>Learn More</span>
                    <svg className="link-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="service-card grooming">
                <div className="service-image">
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content">
                  <h3>Professional Grooming</h3>
                  <p>Full-service grooming with specialized care for all breeds and coat types.</p>
                  <Link to="/services/grooming" className="service-link">
                    <span>Learn More</span>
                    <svg className="link-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="service-card surgery">
                <div className="service-image">
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content">
                  <h3>Surgical Procedures</h3>
                  <p>Advanced surgical care with modern equipment and post-operative monitoring.</p>
                  <Link to="/services/surgery" className="service-link">
                    <span>Learn More</span>
                    <svg className="link-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Happy Pet Families</h2>
              <p className="section-subtitle">
                Real stories from pet owners who trust us with their beloved companions
              </p>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card featured">
                <div className="testimonial-header">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <div className="testimonial-badge">Life Saver</div>
                </div>
                <div className="testimonial-content">
                  <p>"The emergency team at Vetty saved my dog's life at 2 AM when no one else was available. Their quick response and expert care made all the difference. Forever grateful for their dedication!"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">👩</div>
                  <div className="author-info">
                    <h4>Sarah Johnson</h4>
                    <p>Golden Retriever Owner • 2 years with Vetty</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                </div>
                <div className="testimonial-content">
                  <p>"Best veterinary care in town! My three cats actually purr during their visits now. The staff's gentle approach and modern facilities make every appointment stress-free."</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">👨</div>
                  <div className="author-info">
                    <h4>Michael Chen</h4>
                    <p>Cat Owner • 5 years with Vetty</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                </div>
                <div className="testimonial-content">
                  <p>"The grooming service is phenomenal! My poodle looks like a show dog every time. The attention to detail and care for my pet's comfort is unmatched."</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">👵</div>
                  <div className="author-info">
                    <h4>Margaret Davis</h4>
                    <p>Poodle Owner • 3 years with Vetty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-background">
            <div className="cta-overlay"></div>
            <div className="cta-pattern"></div>
          </div>
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Give Your Pet 
              <span className="gradient-text">The Best Care?</span>
            </h2>
            <p className="cta-subtitle">
              Join thousands of happy pet families who trust Vetty with their most precious companions
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="primary-button large">
                <span>Create Your Account</span>
                <div className="button-glow"></div>
              </Link>
              <Link to="/contact" className="contact-link">
                <span>Schedule a Tour</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </Link>
            </div>
            <div className="cta-guarantee">
              <span>💖 100% Satisfaction Guaranteed</span>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
}