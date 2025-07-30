// src/components/user/BookingModal.js
import React from "react";
import ReactDOM from "react-dom";
import "../../styles/pages.css";

const BookingModal = ({ isOpen, onClose, onSubmit, onChange, form, service }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Book Appointment</h2>

        <form onSubmit={onSubmit}>
          <p className="modal-service-name">
            Booking for: <strong>{service.name}</strong>
          </p>

          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="scheduled_time"
            value={form.scheduled_time}
            onChange={onChange}
            required
          />

          <label>Vet Name</label>
          <input
            type="text"
            name="vet_name"
            value={form.vet_name}
            onChange={onChange}
            placeholder="Vet name"
          />

          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            placeholder="Any notes..."
          ></textarea>

          <button type="submit" className="confirm-btn">Confirm Booking</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default BookingModal;
