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