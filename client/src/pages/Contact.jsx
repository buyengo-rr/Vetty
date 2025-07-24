import React, { useState } from "react";

export default function Contact() {
  return (
    <div className="contact-container">
      <main>
        {/* Basic structure */}
      </main>
    </div>
  );
}
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
  
  alert('Thank you for contacting us!');
  setFormData({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  setIsSubmitting(false);
};
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
<div className="contact-form-wrapper">
  <div className="form-header">
    <h2>Send Us a Message</h2>
    <p>Fill out the form below and we'll get back to you within 24 hours</p>
  </div>
  
  <div className="contact-form">
    {/* Form fields */}
    <button 
      type="submit" 
      className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
      disabled={isSubmitting}
      onClick={handleSubmit}
    >
      {/* Button content */}
    </button>
  </div>
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
  {/* Other info cards */}
</div>
<div className="business-hours">
  <h4>🕒 Business Hours</h4>
  <div className="hours-grid">
    <div className="hour-row">
      <span className="day">Monday - Saturday</span>
      <span className="time">8:00 AM - 6:00 PM</span>
    </div>
    {/* Other hour rows */}
  </div>
</div>