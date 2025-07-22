import React from 'react';

const ServiceDetail = ({ service }) => {
  if (!service) {
    return <div>Select a service to see details</div>;
  }

  const handleBooking = () => {
    alert(`You booked: ${service.name}`);
  };

  return (
    <div className="service-detail">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p className="service-price">${service.price.toFixed(2)}</p>
      <button className="book-btn" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default ServiceDetail;
