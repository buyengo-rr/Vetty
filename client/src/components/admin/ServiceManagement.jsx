import React, { useState } from 'react';
import ServiceFormModal from './Serviceform';
import ServiceCard from './servicetable';
import '../../styles/pages.css'

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleAddService = (service) => {
    if (editingService) {
      setServices(prev =>
        prev.map(s => (s.id === editingService.id ? { ...service, id: editingService.id } : s))
      );
    } else {
      setServices(prev => [...prev, { ...service, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingService(null);
  };

  const handleDelete = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  return (
    <div className="admin-container">
      <button className="add-btn" onClick={() => { setEditingService(null); setShowModal(true); }}>
        + Add Service
      </button>

      <div className="card-grid">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={() => handleEdit(service)}
            onDelete={() => handleDelete(service.id)}
          />
        ))}
      </div>

      {showModal && (
        <ServiceFormModal
          onClose={() => { setShowModal(false); setEditingService(null); }}
          onSubmit={handleAddService}
          initialData={editingService}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
