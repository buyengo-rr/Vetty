// src/components/user/ServiceCard.js
import React, { useState } from "react";
import BookingModal from "../components/user/Booking";

const ServiceCard = ({ service }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    scheduled_time: "",
    vet_name: "",
    notes: ""
  });

  const handleBookClick = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setForm({ scheduled_time: "", vet_name: "", notes: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:5000/appointments/user/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          service_id: service.id
        })
      });

      if (response.ok) {
        alert("Appointment booked!");
        handleModalClose();
      } else {
        const errorData = await response.json();
        alert("Booking failed: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      alert("An error occurred while booking.");
    }
  };

  return (
    <>
      <div className="service-card">
        <img src={`http://127.0.0.1:5000${service.image_url}`} alt={service.name} />
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <p>KES {service.price.toFixed(2)}</p>
        <button onClick={handleBookClick} className="book-btn">Book Now</button>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAppointmentSubmit}
        onChange={handleChange}
        form={form}
        service={service}
      />
    </>
  );
};

export default ServiceCard;
