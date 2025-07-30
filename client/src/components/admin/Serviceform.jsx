import React, { useState, useEffect } from 'react';

const ServiceFormModal = ({ onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    image: null
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        type: initialData.type || '',
        image: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h3>{initialData ? 'Edit Service' : 'Add Service'}</h3>

        <input type="text" name="name" placeholder="Service Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="text" name="type" placeholder="Type (e.g., Grooming)" value={form.type} onChange={handleChange} />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ServiceFormModal;
