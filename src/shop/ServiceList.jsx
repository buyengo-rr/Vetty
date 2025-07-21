import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services, onServiceClick }) => {
  return (
    <div className="service-list">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onClick={onServiceClick}
        />
      ))}
    </div>
  );
};

export default ServiceList;
