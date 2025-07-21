import React from 'react';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div className="service-card" onClick={() => onClick && onClick(service)}>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-description">{service.description}</p>
      <p className="service-price">${service.price.toFixed(2)}</p>
    </div>
  );
};

export default ServiceCard;
