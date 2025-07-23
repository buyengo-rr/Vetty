import React, { useState } from 'react';
import Footer from '../components/common/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isMessageEditable, setIsMessageEditable] = useState(true);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <>
      <div className="contact-page">
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{ padding: '0.5rem', fontSize: '1rem' }}
            disabled={!isMessageEditable}
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsMessageEditable(!isMessageEditable)}
              className="edit-button"
            >
              {isMessageEditable ? 'Save' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, message: ''})}
              className="delete-button"
            >
              Delete
            </button>
          </div>
          <button type="submit" className="send-message-button">
            Send Message
          </button>
        </form>

        <p>
          Have questions? Need help with an order or a service request? We're here for you and your pets!
        </p>

        <div className="contact-info">
          <p>📍 <strong>Office Location:</strong> Nairobi, Kenya</p>
          <p>📧 <strong>Email:</strong> support@vettyapp.com</p>
          <p>📞 <strong>Phone:</strong> +254 700 123 456</p>
          <p>🕒 <strong>Working Hours:</strong></p>
          <p><strong>Monday</strong> – Saturday: 8:00 AM – 6:00 PM</p>
          <p><strong>Sunday</strong>: Closed</p>
        </div>

        <p style={{ marginTop: '1rem' }}>
          Your pet’s wellness is just a message away! 🐾
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
