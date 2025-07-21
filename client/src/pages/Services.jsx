import React from 'react';
import ServiceList from '../../../src/shop/ServiceList';

const sampleServices = [
  { id: 1, name: 'Pet Grooming', description: 'Full grooming service', price: 50 },
  { id: 2, name: 'Vet Checkup', description: 'Comprehensive health check', price: 100 },
  { id: 3, name: 'Training', description: 'Obedience training sessions', price: 75 },
];

const Services = () => {
  const handleServiceClick = (service) => {
    console.log('Service clicked:', service);
  };

  return (
    <div>
      <h1>Book a Service</h1>
      <ServiceList services={sampleServices} onServiceClick={handleServiceClick} />
    </div>
  );
};

export default Services;
