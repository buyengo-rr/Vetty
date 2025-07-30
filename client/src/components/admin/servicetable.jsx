import React from 'react';
import "./service.css"

const ServiceCard = ({ service, onEdit, onDelete }) => {
  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(service.price);

  return (
    <div className="service-card">
      {service?.image_url && (
        <div className="service-image-wrapper">
          <img
            src={`http://localhost:5000${service.image_url}`}
            alt={service.name || "Service image"}
            className="service-image"
          />
        </div>
      )}

      <div className="service-content">
        <h4 className="service-name">{service.name}</h4>
        <p className="service-description">{service.description}</p>
        <p className="service-price"><strong>{formattedPrice}</strong></p>
        <p className="service-type">{service.type}</p>

        <div className="card-buttons">
          <button
            className="edit-btn"
            onClick={() => onEdit(service)}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete(service.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
