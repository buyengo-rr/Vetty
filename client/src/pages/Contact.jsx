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