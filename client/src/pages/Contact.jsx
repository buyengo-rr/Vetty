import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isMessageEditable, setIsMessageEditable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="contact-container">
      <main>
        {/* Hero Section */}
        <section className="contact-hero-section">
          <div className="contact-hero-background">
            <div className="contact-hero-overlay"></div>
            <div className="floating-elements"></div>
          </div>
          <div className="contact-hero-content">
            <div className="contact-badge">
              <span>💬 We're Here to Help</span>
            </div>
            <h1 className="contact-hero-title">
              Get in Touch with 
              <span className="gradient-text">Our Team</span>
            </h1>
            <p className="contact-hero-subtitle">
              Have questions about our services? Need to schedule an appointment? 
              We're here to provide the support you and your pet need.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="contact-main-section">
          <div className="section-container">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <div className="form-header">
                  <h2>Send Us a Message</h2>
                  <p>Fill out the form below and we'll get back to you within 24 hours</p>
                </div>
                
                <div className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you and your pet..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className={form-textarea ${!isMessageEditable ? 'disabled' : ''}}
                      disabled={!isMessageEditable}
                    />
                    <div className="message-controls">
                      <button
                        type="button"
                        onClick={() => setIsMessageEditable(!isMessageEditable)}
                        className="control-button edit-button"
                      >
                        {isMessageEditable ? '🔒 Lock' : '✏ Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, message: ''})}
                        className="control-button delete-button"
                      >
                        🗑 Clear
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={submit-button ${isSubmitting ? 'submitting' : ''}}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="send-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </>
                    )}
                    <div className="button-glow"></div>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="contact-info-wrapper">
                <div className="contact-info-header">
                  <h3>Get In Touch</h3>
                  <p>Multiple ways to reach our caring team</p>
                </div>

                <div className="contact-info-cards">
                  <div className="info-card location">
                    <div className="info-icon">📍</div>
                    <div className="info-content">
                      <h4>Visit Our Clinic</h4>
                      <p>Nairobi, Kenya</p>
                      <span className="info-note">Modern facility with ample parking</span>
                    </div>
                  </div>

                  <div className="info-card email">
                    <div className="info-icon">📧</div>
                    <div className="info-content">
                      <h4>Email Us</h4>
                      <p>support@vettyapp.com</p>
                      <span className="info-note">We respond within 24 hours</span>
                    </div>
                  </div>

                  <div className="info-card phone">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <h4>Call Us</h4>
                      <p>+254 700 123 456</p>
                      <span className="info-note">Available during business hours</span>
                    </div>
                  </div>

                  <div className="info-card emergency">
                    <div className="info-icon">🚨</div>
                    <div className="info-content">
                      <h4>Emergency Line</h4>
                      <p>+254 700 EMERGENCY</p>
                      <span className="info-note">24/7 for urgent pet care</span>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="business-hours">
                  <h4>🕒 Business Hours</h4>
                  <div className="hours-grid">
                    <div className="hour-row">
                      <span className="day">Monday - Saturday</span>
                      <span className="time">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="hour-row">
                      <span className="day">Sunday</span>
                      <span className="time closed">Closed</span>
                    </div>
                    <div className="hour-row emergency-note">
                      <span className="day">Emergency Services</span>
                      <span className="time">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Quick answers to common questions about our services
              </p>
            </div>
            <div className="faq-grid">
              <div className="faq-card">
                <div className="faq-icon">⏰</div>
                <h3>How quickly do you respond?</h3>
                <p>We typically respond to all inquiries within 24 hours during business days, and emergency calls are handled immediately.</p>
              </div>
              <div className="faq-card">
                <div className="faq-icon">📅</div>
                <h3>How do I schedule an appointment?</h3>
                <p>You can schedule through our online booking system, call us directly, or send us a message through this contact form.</p>
              </div>
              <div className="faq-card">
                <div className="faq-icon">💰</div>
                <h3>Do you accept insurance?</h3>
                <p>Yes, we work with most pet insurance providers. Contact us to verify your specific coverage and benefits.</p>
              </div>
              <div className="faq-card">
                <div className="faq-icon">🏥</div>
                <h3>Do you offer emergency services?</h3>
                <p>Absolutely! We provide 24/7 emergency care for urgent situations. Call our emergency line for immediate assistance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta-section">
          <div className="contact-cta-content">
            <h2 className="contact-cta-title">
              Ready to Give Your Pet 
              <span className="gradient-text">The Best Care?</span>
            </h2>
            <p className="contact-cta-subtitle">
              Join thousands of satisfied pet owners who trust Vetty with their beloved companions.
            </p>
            <div className="contact-cta-buttons">
              <a href="/register" className="primary-button large">
                <span>Book Appointment</span>
                <div className="button-glow"></div>
              </a>
              <a href="/about" className="secondary-button">
                <span>Learn More About Us</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}