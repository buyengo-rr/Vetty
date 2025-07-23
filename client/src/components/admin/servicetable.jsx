import React from 'react';


const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="service-card">
      {service.preview && (
        <img src={service.preview} alt={service.name} className="card-img" />
      )}
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default ServiceCard;
