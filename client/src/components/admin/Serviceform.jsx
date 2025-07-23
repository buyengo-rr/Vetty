import React, { useState, useEffect } from 'react';


const ServiceFormModal = ({ onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    preview: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        image: initialData.image || null,
        preview: initialData.preview || initialData.image || null,
      });
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {form.preview && <img src={form.preview} alt="preview" className="preview-img" />}
          <div className="modal-actions">
            <button type="submit">{initialData ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormModal;
