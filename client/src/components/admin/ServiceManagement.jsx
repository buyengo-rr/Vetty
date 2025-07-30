import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './servicetable';
import ServiceFormModal from './Serviceform';
import "./service.css";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const token = localStorage.getItem('token');

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data);
    } catch (err) {
      console.error("Fetch services error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSaveService = async (form) => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('type', form.type);
    if (form.image) formData.append('image', form.image);

    try {
      if (editService) {
        const res = await axios.put(
          `http://localhost:5000/admin/services/${editService.id}`, 
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setServices((prev) =>
          prev.map((s) => (s.id === res.data.service.id ? res.data.service : s))
        );
      } else {
        const res = await axios.post(
          'http://localhost:5000/admin/services', 
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setServices((prev) => [...prev, res.data.service]);
      }

      setShowModal(false);
      setEditService(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save service");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/services/${id}`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete service");
    }
  };

  return (
    <div className="service-container">
      <h2>Service Management</h2>
      <button onClick={() => setShowModal(true)}>+ Add Service</button>

      <div className="service-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={() => {
              setEditService(service);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showModal && (
        <ServiceFormModal
          initialData={editService}
          onClose={() => {
            setShowModal(false);
            setEditService(null);
          }}
          onSubmit={handleSaveService}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
