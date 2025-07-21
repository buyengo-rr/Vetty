import React from 'react';

const ServiceDetail = ({ service }) => {
  if (!service) {
    return <div>Select a service to see details</div>;
  }

  return (
    <div className="service-detail">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p className="service-price">${service.price.toFixed(2)}</p>
      {/* Additional service details can be added here */}
    </div>
  );
};

export default ServiceDetail;
